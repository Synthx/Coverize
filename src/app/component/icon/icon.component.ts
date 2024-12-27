import {
	ChangeDetectionStrategy,
	Component,
	effect,
	ElementRef,
	inject,
	input,
	Renderer2,
	viewChild,
} from '@angular/core';
import { Icon, iconData } from './icon.data';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	#document = inject(DOCUMENT);
	#renderer = inject(Renderer2);

	name = input.required<Icon>();
	svgElement = viewChild.required<ElementRef<SVGElement>>('svg');

	constructor() {
		effect(() => {
			const name = this.name();

			const data = iconData[name];
			const path = this.#document.createElementNS(
				'http://www.w3.org/2000/svg',
				'path',
			);
			path.setAttribute('d', data);

			const element = this.svgElement().nativeElement;
			this.#renderer.appendChild(element, path);
		});
	}
}
