import { Directive } from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'app-form-field-hint',
	host: {
		class: 'form-field-message-hint',
	},
})
export class FormFieldHintDirective {}
