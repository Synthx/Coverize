import {
	ChangeDetectionStrategy,
	Component,
	computed,
	forwardRef,
	input,
	signal,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { OnChange, OnTouched } from '../../model/form';

let nextId = 0;

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrl: './checkbox.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxComponent),
			multi: true,
		},
	],
})
export class CheckboxComponent implements ControlValueAccessor {
	#onChange?: OnChange<boolean>;
	#onTouched?: OnTouched;

	id = input<string>();

	checked = signal(false);
	disabled = signal(false);

	inputId = computed(() => this.id() ?? `checkbox-${nextId++}`);

	toggle() {
		this.checked.update((value) => !value);
		this.#onChange?.(this.checked());
		this.#onTouched?.();
	}

	writeValue(value: unknown) {
		this.checked.set(!!value);
	}

	setDisabledState(value: boolean) {
		this.disabled.set(value);
	}

	registerOnChange(fn: OnChange<boolean>) {
		this.#onChange = fn;
	}

	registerOnTouched(fn: OnTouched) {
		this.#onTouched = fn;
	}
}
