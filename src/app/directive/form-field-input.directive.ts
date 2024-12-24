import {
	computed,
	DestroyRef,
	Directive,
	effect,
	ElementRef,
	inject,
	input,
	type OnInit,
	signal,
} from '@angular/core';
import {
	type FormControlStatus,
	NgControl,
	PristineChangeEvent,
	StatusChangeEvent,
	TouchedChangeEvent,
	type ValidationErrors,
	Validators,
	ValueChangeEvent,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

let nextId = 0;

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'input[app-form-field-input], select[app-form-field-input]',
	host: {
		class: 'form-field-input',
		'[class.form-field-input--select]': '_isSelect',
		'[class.form-field-input--invalid]': 'invalid()',
		'[id]': 'inputId()',
		'[attr.id]': 'inputId()',
		'[attr.enterkeyhint]': 'hint()',
		'[attr.inputmode]': 'mode()',
		'(blur)': 'focused.set(false)',
		'(focus)': 'focused.set(true)',
	},
})
export class FormFieldInputDirective implements OnInit {
	#elementRef = inject(ElementRef<HTMLInputElement | HTMLSelectElement>);
	#destroyRef = inject(DestroyRef);
	#ngControl = inject(NgControl, { self: true });

	type = input<'password' | 'text' | 'url'>('text');
	mode = input<'text' | 'decimal' | 'numeric'>();
	hint = input<
		'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
	>();
	id = input<string>();

	focused = signal(false);
	status = signal<FormControlStatus>('VALID');
	value = signal<unknown>(undefined);
	touched = signal(false);
	pristine = signal(true);
	errors = signal<ValidationErrors | null>(null);

	inputId = computed(() => this.id() ?? `kia-form-field-input-${nextId++}`);
	disabled = computed(() => this.status() === 'DISABLED');
	invalid = computed(() => {
		return this.status() === 'INVALID' && (this.touched() || !this.pristine());
	});

	_isSelect = this.#elementRef.nativeElement instanceof HTMLSelectElement;

	get required(): boolean {
		return this.#ngControl.control?.hasValidator(Validators.required) ?? false;
	}

	constructor() {
		effect(() => {
			if (!this._isSelect) {
				(this.#elementRef.nativeElement as HTMLInputElement).type = this.type();
			}
		});
	}

	ngOnInit(): void {
		// initial state
		this.status.set(this.#ngControl.control?.status ?? 'VALID');
		this.value.set(this.#ngControl.value);
		this.errors.set(this.#ngControl.errors);

		// listen to changes
		this.#ngControl.control?.events
			?.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe((event) => {
				this.errors.set(this.#ngControl.errors);

				if (event instanceof StatusChangeEvent) {
					this.status.set(event.status);
				} else if (event instanceof ValueChangeEvent) {
					this.value.set(event.value);
				} else if (event instanceof PristineChangeEvent) {
					this.pristine.set(event.pristine);
				} else if (event instanceof TouchedChangeEvent) {
					this.touched.set(event.touched);
				}
			});
	}
}
