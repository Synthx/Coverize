import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../../../environment/environment';
import { IconComponent } from '../icon/icon.component';
import { SpotifyService } from '../../service/spotify.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet, RouterLink, IconComponent, RouterLinkActive],
})
export class LayoutComponent {
	#spotifyService = inject(SpotifyService);

	environment = environment;

	profile = this.#spotifyService.profile;

	constructor() {
		effect(() => {
			console.log(this.profile());
		});
	}
}
