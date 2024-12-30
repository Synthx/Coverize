import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
	defaultTheme,
	predefinedThemeColors,
	Theme,
	themes,
} from '../../../../model/theme';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormFieldComponent } from '../../../../component/form-field/form-field.component';
import { FormFieldInputDirective } from '../../../../directive/form-field-input.directive';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomThemeCustomizationComponent } from './custom-theme-customization/custom-theme-customization.component';
import { AlbumPreviewStore } from '../album-preview.store';

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
	#store = inject(AlbumPreviewStore);

	themes = themes;
	themeControl = this.#formBuilder.nonNullable.control<Theme>(defaultTheme);

	theme = toSignal(this.themeControl.valueChanges, {
		initialValue: defaultTheme,
	});

	constructor() {
		effect(() => {
			const theme = this.theme();
			if (theme === 'custom') {
				return;
			}

			const themeColors = predefinedThemeColors[theme];
			this.#store.setThemeColors(themeColors);
		});
	}
}
