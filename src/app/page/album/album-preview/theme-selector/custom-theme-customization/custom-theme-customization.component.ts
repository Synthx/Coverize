import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import {
	Color,
	defaultTheme,
	predefinedThemeColors,
	predefinedThemes,
} from '../../../../../model/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../../../component/form-field/form-field.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormFieldInputDirective } from '../../../../../directive/form-field-input.directive';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AlbumPreviewStore } from '../../album-preview.store';

const defaultBackgroundColors = Object.values(predefinedThemeColors).map(
	(c) => c.background,
);

@Component({
	selector: 'app-custom-theme-customization',
	templateUrl: './custom-theme-customization.component.html',
	styleUrl: './custom-theme-customization.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ReactiveFormsModule,
		FormFieldComponent,
		FormFieldInputDirective,
		TranslatePipe,
	],
})
export class CustomThemeCustomizationComponent {
	#formBuilder = inject(FormBuilder);
	#store = inject(AlbumPreviewStore);

	backgroundColors = computed<Color[]>(() => {
		const poster = this.#store.poster();
		const colors = poster?.colors ?? [];

		return [...defaultBackgroundColors, ...colors];
	});

	predefinedThemes = predefinedThemes;
	customizationForm = this.#formBuilder.nonNullable.group({
		backgroundColor: [undefined as string | undefined, [Validators.required]],
		textColorTheme: [defaultTheme, [Validators.required]],
	});

	selectedBackgroundColor = toSignal(
		this.customizationForm.controls.backgroundColor.valueChanges,
	);

	constructor() {
		this.customizationForm.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(({ backgroundColor, textColorTheme }) => {
				const theme = textColorTheme ?? 'light';

				this.#store.setThemeColors({
					...predefinedThemeColors[theme],
					background:
						backgroundColor ?? predefinedThemeColors[theme].background,
				});
			});
	}

	selectColor(color: string) {
		this.customizationForm.controls.backgroundColor.setValue(color);
	}
}
