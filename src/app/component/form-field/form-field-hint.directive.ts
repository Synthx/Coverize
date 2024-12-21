import { Directive } from '@angular/core';

@Directive({
	selector: 'app-form-field-hint',
	host: {
		class: 'form-field-message-hint',
	},
})
export class FormFieldHintDirective {}
