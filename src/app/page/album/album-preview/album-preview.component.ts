import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	type OnInit,
} from '@angular/core';
import { AlbumPreviewStore } from './album-preview.store';
import { TranslatePipe } from '@ngx-translate/core';
import { PosterPreviewComponent } from '../../../component/poster-preview/poster-preview.component';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../component/spinner/spinner.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { type Theme, themeColors, themes } from '../../../model/theme';
import { FormFieldComponent } from '../../../component/form-field/form-field.component';
import { FormFieldInputDirective } from '../../../directive/form-field-input.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { CheckboxComponent } from '../../../component/checkbox/checkbox.component';

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
		FormFieldComponent,
		FormFieldInputDirective,
		CheckboxComponent,
	],
})
export default class AlbumPreviewComponent implements OnInit {
	#formBuilder = inject(FormBuilder);
	#store = inject(AlbumPreviewStore);

	id = input.required<string>();

	loading = this.#store.loading;
	poster = this.#store.poster;

	themes = themes;
	configurationForm = this.#formBuilder.nonNullable.group({
		theme: ['light' as Theme, [Validators.required]],
		removeExtra: [false],
	});

	theme = toSignal(this.configurationForm.controls.theme.valueChanges, {
		initialValue: 'light',
	});
	removeExtra = toSignal(
		this.configurationForm.controls.removeExtra.valueChanges,
		{
			initialValue: false,
		},
	);

	colors = computed(() => {
		const theme = this.theme();

		return themeColors[theme];
	});

	ngOnInit() {
		this.#store.init(this.id());
	}

	print() {
		this.#store.print();
	}
}
