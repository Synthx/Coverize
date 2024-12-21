import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigDialogStore } from './config-dialog.store';
import { TranslatePipe } from '@ngx-translate/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FormFieldInputDirective } from '../../directive/form-field-input.directive';

@Component({
	selector: 'app-config-dialog',
	templateUrl: './config-dialog.component.html',
	styleUrl: './config-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ConfigDialogStore],
	imports: [
		TranslatePipe,
		ReactiveFormsModule,
		FormFieldComponent,
		FormFieldInputDirective,
	],
})
export class ConfigDialogComponent {
	#formBuilder = inject(FormBuilder);
	#store = inject(ConfigDialogStore);

	configForm = this.#formBuilder.nonNullable.group({
		clientId: ['', [Validators.required]],
		clientSecret: ['', [Validators.required]],
	});

	loading = this.#store.loading;

	save() {
		if (this.configForm.invalid) return;

		const value = this.configForm.getRawValue();
		this.#store.save(value);
	}
}
