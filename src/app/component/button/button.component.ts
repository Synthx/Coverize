import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	input,
} from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[app-button]',
	templateUrl: './button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SpinnerComponent],
	host: {
		class: 'button',
		'[disabled]': 'disabled() || loading()',
		'[attr.aria-disabled]': 'disabled()',
		'[attr.role]': '"button"',
		'[class.disabled]': 'disabled()',
		'[class.loading]': 'loading()',
	},
})
export class ButtonComponent {
	disabled = input(false, { transform: booleanAttribute });
	loading = input(false, { transform: booleanAttribute });
}
