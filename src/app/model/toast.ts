import { InjectionToken } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

export type ToastType = 'primary' | 'success' | 'error';

export type ToastData = {
	content: string;
	type: ToastType;
};

export const TOAST_DATA = new InjectionToken<ToastData>('toast-data');

export class ToastRef {
	#durationTimeout?: number;

	constructor(private readonly overlayRef: OverlayRef) {}

	dismiss() {
		clearTimeout(this.#durationTimeout);
		this.overlayRef.dispose();
	}

	dismissAfter(timeout: number) {
		this.#durationTimeout = window.setTimeout(() => {
			this.dismiss();
		}, timeout);
	}
}
