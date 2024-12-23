import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	input,
	signal,
} from '@angular/core';
import type { Poster } from '../../model/poster';
import { extractColors } from 'extract-colors';
import { DatePipe, DOCUMENT } from '@angular/common';
import type { Colors } from '../../model/theme';

@Component({
	selector: 'app-poster-preview',
	templateUrl: './poster-preview.component.html',
	styleUrl: './poster-preview.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DatePipe],
})
export class PosterPreviewComponent {
	#document = inject(DOCUMENT);

	poster = input.required<Poster>();
	colors = input.required<Colors>();
	removeExtra = input(false, { transform: booleanAttribute });

	dominantColors = signal<string[]>([]);
	tracks = computed(() => this.poster().tracks);
	tracksLength = computed(() => this.tracks().length);
	code = computed(() => {
		const uri = this.poster().uri;
		const colors = this.colors();

		return `https://scannables.scdn.co/uri/plain/png/${colors.background.replace('#', '')}/${colors.title}/660/${uri}`;
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
			const image = this.poster().image;

			extractColors(image).then((colos) => {
				this.dominantColors.set(colos.map((c) => c.hex));
			});
		});

		effect(() => {
			const colors = this.colors();

			for (const [key, value] of Object.entries(colors)) {
				this.#document.documentElement.style.setProperty(
					`--yaku-poster-${key}-color`,
					value,
				);
			}
		});
	}
}
