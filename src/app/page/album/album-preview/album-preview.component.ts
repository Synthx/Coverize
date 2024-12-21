import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	type OnInit,
} from '@angular/core';
import { AlbumPreviewStore } from './album-preview.store';
import { TranslatePipe } from '@ngx-translate/core';
import { PosterPreviewComponent } from '../../../component/poster-preview/poster-preview.component';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../component/spinner/spinner.component';

@Component({
	selector: 'app-album-preview',
	templateUrl: './album-preview.component.html',
	styleUrl: './album-preview.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AlbumPreviewStore],
	imports: [
		TranslatePipe,
		PosterPreviewComponent,
		RouterLink,
		SpinnerComponent,
	],
})
export default class AlbumPreviewComponent implements OnInit {
	#store = inject(AlbumPreviewStore);

	id = input.required<string>();

	loading = this.#store.loading;
	poster = this.#store.poster;

	ngOnInit() {
		this.#store.init(this.id());
	}

	print() {
		this.#store.print();
	}
}
