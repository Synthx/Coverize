import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	contentChildren,
} from '@angular/core';
import { FormFieldInputDirective } from '../../directive/form-field-input.directive';
import { FormFieldErrorComponent } from './form-field-error/form-field-error.component';
import { NgTemplateOutlet } from '@angular/common';
import { FormFieldHintDirective } from './form-field-hint.directive';

@Component({
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class FormFieldComponent {
	input = contentChild.required(FormFieldInputDirective);
	hint = contentChild(FormFieldHintDirective);
	errors = contentChildren(FormFieldErrorComponent, { descendants: true });

	displayedMessage = computed(() => {
		return this.errors().length > 0 && this.input().invalid()
			? 'error'
			: 'hint';
	});
	shouldDisplayMessage = computed(() => {
		if (this.hint()) {
			return true;
		}

		const keys = Object.keys(this.input().errors() ?? {});
		if (keys.length === 0) {
			return false;
		}

		return this.errors().some((e) => e.type() === keys[0]) ?? false;
	});
	errorMessage = computed(() => {
		const keys = Object.keys(this.input().errors() ?? {});
		if (keys.length === 0) {
			return null;
		}

		const error = this.errors().find((e) => e.type() === keys[0]);
		return error?.templateRef() ?? null;
	});
}
