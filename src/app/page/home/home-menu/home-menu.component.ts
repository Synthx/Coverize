import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DiscIconComponent } from '../../../component/icon/disc-icon/disc-icon.component';
import { RouterLink } from '@angular/router';
import { SpotifyIconComponent } from '../../../component/icon/spotify-icon/spotify-icon.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CloseIconComponent } from '../../../component/icon/close-icon/close-icon.component';
import { ExternalLinkIconComponent } from '../../../component/icon/external-link-icon/external-link-icon.component';
import { DialogService } from '../../../service/dialog.service';
import { GithubIconComponent } from '../../../component/icon/github-icon/github-icon.component';
import { environment } from '../../../../environment/environment';

@Component({
	selector: 'app-home-menu',
	templateUrl: './home-menu.component.html',
	styleUrl: './home-menu.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		DiscIconComponent,
		RouterLink,
		SpotifyIconComponent,
		TranslatePipe,
		CloseIconComponent,
		ExternalLinkIconComponent,
		GithubIconComponent,
	],
})
export class HomeMenuComponent {
	#dialogService = inject(DialogService);

	environment = environment;

	close() {
		this.#dialogService.close(HomeMenuComponent);
	}
}
