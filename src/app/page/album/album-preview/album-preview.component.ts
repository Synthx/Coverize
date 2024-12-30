import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	type OnInit,
} from '@angular/core';
import { AlbumPreviewStore } from './album-preview.store';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../component/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { ButtonComponent } from '../../../component/button/button.component';
import { IconComponent } from '../../../component/icon/icon.component';

@Component({
	selector: 'app-album-preview',
	templateUrl: './album-preview.component.html',
	styleUrl: './album-preview.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AlbumPreviewStore],
	imports: [
		TranslatePipe,
		RouterLink,
		SpinnerComponent,
		ReactiveFormsModule,
		ThemeSelectorComponent,
		ButtonComponent,
		IconComponent,
	],
})
export default class AlbumPreviewComponent implements OnInit {
	#store = inject(AlbumPreviewStore);

	id = input.required<string>();

	loading = this.#store.loading;
	poster = this.#store.poster;
	preview = this.#store.preview;

	async ngOnInit() {
		await this.#store.init(this.id());
	}

	print() {
		this.#store.print();
	}
}
