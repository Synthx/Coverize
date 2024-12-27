import { computed, inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScreenSize } from '../model/screen-size';
import { filter } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LayoutService {
	#breakpointObserver = inject(BreakpointObserver);
	#sizes: Record<string, ScreenSize> = {
		[Breakpoints.Handset]: 'handset',
		[Breakpoints.Tablet]: 'tablet',
		[Breakpoints.Web]: 'web',
	};

	#size = signal<ScreenSize>('unknown');

	size = this.#size.asReadonly();
	isHandset = computed(() => this.#size() === 'handset');

	constructor() {
		for (const [query, name] of Object.entries(this.#sizes)) {
			this.#breakpointObserver
				.observe(query)
				.pipe(
					filter((result) => result.matches),
					takeUntilDestroyed(),
				)
				.subscribe(() => {
					this.#size.set(name);
				});
		}
	}
}
