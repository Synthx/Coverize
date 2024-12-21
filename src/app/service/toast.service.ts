import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
	Overlay,
	type OverlayConfig,
	type OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { KIA_TOAST_DATA } from './toast-data';
import { KiaToastRef } from './toast-ref';
import type { KiaToastType } from './toast.component.data';
import { ToastComponent } from '../component/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
	#rootInjector = inject(Injector);
	#overlay = inject(Overlay);
	#breakpointObserver = inject(BreakpointObserver);

	#lastRef?: KiaToastRef;

	open(content: string, type: KiaToastType = 'primary'): KiaToastRef {
		this.#lastRef?.dismiss();

		const overlayRef = this.createOverlayRef();
		const toastRef = new KiaToastRef(overlayRef);
		this.#lastRef = toastRef;

		const injector = Injector.create({
			parent: this.#rootInjector,
			providers: [
				{ provide: KiaToastRef, useValue: toastRef },
				{ provide: KIA_TOAST_DATA, useValue: { content, type } },
			],
		});

		const componentPortal = new ComponentPortal(ToastComponent, null, injector);
		overlayRef.attach(componentPortal);

		toastRef.dismissAfter(6000);

		return toastRef;
	}

	dismiss(): void {
		this.#lastRef?.dismiss();
	}

	private createOverlayRef(): OverlayRef {
		const isWeb = this.#breakpointObserver.isMatched(Breakpoints.Web);
		const overlayConfig: OverlayConfig = {
			maxWidth: isWeb ? '450px' : '85%',
		};

		overlayConfig.positionStrategy = this.#overlay
			.position()
			.global()
			.right('15px')
			.top('15px');

		return this.#overlay.create(overlayConfig);
	}
}
