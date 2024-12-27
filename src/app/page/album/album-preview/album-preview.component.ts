import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	type OnInit,
	signal,
} from '@angular/core';
import { AlbumPreviewStore } from './album-preview.store';
import { TranslatePipe } from '@ngx-translate/core';
import { PosterPreviewComponent } from '../../../component/poster-preview/poster-preview.component';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../component/spinner/spinner.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { CheckboxComponent } from '../../../component/checkbox/checkbox.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { ThemeColors } from '../../../model/theme';
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
		PosterPreviewComponent,
		RouterLink,
		SpinnerComponent,
		ReactiveFormsModule,
		CheckboxComponent,
		ThemeSelectorComponent,
		ButtonComponent,
		IconComponent,
	],
})
export default class AlbumPreviewComponent implements OnInit {
	#formBuilder = inject(FormBuilder);
	#store = inject(AlbumPreviewStore);

	id = input.required<string>();

	loading = this.#store.loading;
	poster = this.#store.poster;

	removeExtraControl = this.#formBuilder.nonNullable.control(false);

	colors = signal<ThemeColors | undefined>(undefined);

	removeExtra = toSignal(this.removeExtraControl.valueChanges, {
		initialValue: false,
	});

	async ngOnInit() {
		await this.#store.init(this.id());
	}

	handleColorsChanged(colors: ThemeColors) {
		this.colors.set(colors);
	}

	print() {
		this.#store.print();
	}
}
