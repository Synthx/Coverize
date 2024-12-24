import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { extractColors } from 'extract-colors';
import {
	ThemeColors,
	defaultTheme,
	predefinedThemeColors,
	predefinedThemes,
} from '../../../../../model/theme';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../../../component/form-field/form-field.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormFieldInputDirective } from '../../../../../directive/form-field-input.directive';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

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

	image = input<string>();

	colorsChanged = output<ThemeColors>();

	backgroundColors = signal<string[]>(defaultBackgroundColors);

	predefinedThemes = predefinedThemes;
	customizationForm = this.#formBuilder.nonNullable.group({
		backgroundColor: [undefined as string | undefined, [Validators.required]],
		textColorTheme: [defaultTheme, [Validators.required]],
	});

	selectedBackgroundColor = toSignal(
		this.customizationForm.controls.backgroundColor.valueChanges,
	);

	constructor() {
		effect(() => {
			const image = this.image();
			if (!image) return;

			extractColors(image).then((colors) => {
				const backgroundColors = colors.map((c) => c.hex);

				this.backgroundColors.set([
					...defaultBackgroundColors,
					...backgroundColors,
				]);
			});
		});

		this.customizationForm.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(({ backgroundColor, textColorTheme }) => {
				const theme = textColorTheme ?? 'light';

				this.colorsChanged.emit({
					background:
						backgroundColor ?? predefinedThemeColors[theme].background,
					title: predefinedThemeColors[theme].title,
					text: predefinedThemeColors[theme].text,
				});
			});
	}

	selectColor(color: string) {
		this.customizationForm.controls.backgroundColor.setValue(color);
	}
}
