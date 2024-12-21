import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
	signal,
} from '@angular/core';
import type { Poster } from '../../model/poster';
import { extractColors } from 'extract-colors';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-poster-preview',
	templateUrl: './poster-preview.component.html',
	styleUrl: './poster-preview.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DatePipe],
})
export class PosterPreviewComponent {
	poster = input.required<Poster>();

	colors = signal<string[]>([]);
	tracks = computed(() => this.poster().tracks);
	tracksLength = computed(() => this.tracks().length);
	code = computed(() => {
		const uri = this.poster().uri;

		return `https://scannables.scdn.co/uri/plain/png/f9f8f6/black/256/${uri}`;
	});
	durationInMinutes = computed(() => {
		const tracks = this.tracks();
		const duration = tracks
			.map((t) => t.duration)
			.reduce((acc, curr) => acc + curr, 0);

		return Math.trunc(duration / 1000 / 60);
	});

	constructor() {
		effect(() => {
			extractColors(this.poster().image).then((colos) => {
				this.colors.set(colos.map((c) => c.hex));
			});
		});
	}
}
