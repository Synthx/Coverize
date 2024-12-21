import {
	ChangeDetectionStrategy,
	Component,
	input,
	TemplateRef,
	viewChild,
} from '@angular/core';

@Component({
	selector: 'app-form-field-error',
	templateUrl: './form-field-error.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErrorComponent {
	templateRef = viewChild('templateRef', { read: TemplateRef });

	type = input.required<string>();
}
