import { Dialog, type DialogConfig, type DialogRef } from '@angular/cdk/dialog';
import type { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable, reflectComponentType } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	#dialog = inject(Dialog);
	#breakpointObserver = inject(BreakpointObserver);

	private _createRef<R = unknown, D = unknown, C = unknown>(
		component: ComponentType<C>,
		config?: DialogConfig<D, DialogRef<R, C>>,
	): DialogRef<R, C> {
		const mirror = reflectComponentType(component);

		return this.#dialog.open(component, {
			id: mirror?.selector,
			...config,
		});
	}

	open<R = unknown, D = unknown, C = unknown>(
		component: ComponentType<C>,
		config?: DialogConfig<D, DialogRef<R, C>>,
	): DialogRef<R, C> {
		const defaultConfig: DialogConfig<D, DialogRef<R, C>> = {
			maxHeight: '85%',
			width: '90%',
			maxWidth: '90%',
		};

		const isWeb = this.#breakpointObserver.isMatched(Breakpoints.Web);
		if (isWeb) {
			defaultConfig.width = '500px';
			defaultConfig.maxWidth = '500px';
		}

		return this._createRef<R, D, C>(component, {
			...defaultConfig,
			...config,
		});
	}

	openFullscreen<R = unknown, D = unknown, C = unknown>(
		component: ComponentType<C>,
		config?: DialogConfig<D, DialogRef<R, C>>,
	): DialogRef<R, C> {
		const defaultConfig: DialogConfig<D, DialogRef<R, C>> = {
			height: '100%',
			maxHeight: '100%',
			width: '100%',
			maxWidth: '100%',
		};

		return this._createRef<R, D, C>(component, {
			...defaultConfig,
			...config,
		});
	}

	close<R = unknown, C = unknown>(
		component: ComponentType<C>,
		result?: R,
	): void {
		const mirror = reflectComponentType(component);
		if (!mirror) {
			return;
		}

		const dialogRef = this.#dialog.getDialogById(mirror.selector);
		dialogRef?.close(result);
	}
}
