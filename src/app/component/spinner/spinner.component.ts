import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrl: './spinner.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
