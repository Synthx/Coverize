import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, TranslatePipe],
})
export default class NotFoundComponent {}
