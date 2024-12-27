import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TOAST_DATA } from '../../model/toast';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [IconComponent],
})
export class ToastComponent {
	data = inject(TOAST_DATA);
}
