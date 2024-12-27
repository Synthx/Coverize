import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DialogService } from '../../../service/dialog.service';
import { environment } from '../../../../environment/environment';
import { IconComponent } from '../../../component/icon/icon.component';

@Component({
	selector: 'app-home-menu',
	templateUrl: './home-menu.component.html',
	styleUrl: './home-menu.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, TranslatePipe, IconComponent],
})
export class HomeMenuComponent {
	#dialogService = inject(DialogService);

	environment = environment;

	close() {
		this.#dialogService.close(HomeMenuComponent);
	}
}
