import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TOAST_DATA } from '../../model/toast';
import { ErrorWarningIconComponent } from '../icon/error-warning-icon/error-warning-icon.component';
import { InformationIconComponent } from '../icon/information-icon/information-icon.component';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ErrorWarningIconComponent, InformationIconComponent],
})
export class ToastComponent {
	data = inject(TOAST_DATA);
}
