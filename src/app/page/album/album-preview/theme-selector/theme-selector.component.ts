import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
	defaultTheme,
	predefinedThemeColors,
	Theme,
	ThemeColors,
	themes,
} from '../../../../model/theme';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormFieldComponent } from '../../../../component/form-field/form-field.component';
import { FormFieldInputDirective } from '../../../../directive/form-field-input.directive';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomThemeCustomizationComponent } from './custom-theme-customization/custom-theme-customization.component';

@Component({
	selector: 'app-theme-selector',
	templateUrl: './theme-selector.component.html',
	styleUrl: './theme-selector.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		FormFieldComponent,
		FormFieldInputDirective,
		ReactiveFormsModule,
		TranslatePipe,
		CustomThemeCustomizationComponent,
	],
})
export class ThemeSelectorComponent {
	#formBuilder = inject(FormBuilder);

	image = input<string>();

	colorsChanged = output<ThemeColors>();

	themes = themes;
	themeControl = this.#formBuilder.nonNullable.control(defaultTheme as Theme);

	customColors = signal<ThemeColors | undefined>(undefined);

	theme = toSignal(this.themeControl.valueChanges, {
		initialValue: defaultTheme,
	});
	colors = computed(() => {
		const theme = this.theme();
		if (theme === 'custom') {
			return this.customColors();
		}

		return predefinedThemeColors[theme];
	});

	constructor() {
		effect(() => {
			const colors = this.colors();
			if (!colors) return;

			this.colorsChanged.emit(colors);
		});
	}

	handleCustomColorsChanged(colors: ThemeColors) {
		this.customColors.set(colors);
	}
}
