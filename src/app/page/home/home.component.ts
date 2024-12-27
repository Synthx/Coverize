import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	inject,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { GithubIconComponent } from '../../component/icon/github-icon/github-icon.component';
import { SpotifyIconComponent } from '../../component/icon/spotify-icon/spotify-icon.component';
import { DiscIconComponent } from '../../component/icon/disc-icon/disc-icon.component';
import { DecimalPipe } from '@angular/common';
import { DialogService } from '../../service/dialog.service';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { LayoutService } from '../../service/layout.service';
import { MenuIconComponent } from '../../component/icon/menu-icon/menu-icon.component';
import { environment } from '../../../environment/environment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		TranslatePipe,
		RouterLink,
		GithubIconComponent,
		SpotifyIconComponent,
		DiscIconComponent,
		DecimalPipe,
		MenuIconComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class HomeComponent {
	#dialogService = inject(DialogService);
	#layoutService = inject(LayoutService);

	isHandset = this.#layoutService.isHandset;

	environment = environment;
	date = new Date();
	posters = [
		'fave',
		'graduation',
		'lover',
		'from-zero',
		'utopia',
		'starboy',
		'flag',
		'love-sux',
		'ciel',
	];
	steps = [
		{
			titleKey: 'home.howItWorks.step.login.title',
			descriptionKey: 'home.howItWorks.step.login.description',
		},
		{
			titleKey: 'home.howItWorks.step.search.title',
			descriptionKey: 'home.howItWorks.step.search.description',
		},
		{
			titleKey: 'home.howItWorks.step.customize.title',
			descriptionKey: 'home.howItWorks.step.customize.description',
		},
		{
			titleKey: 'home.howItWorks.step.download.title',
			descriptionKey: 'home.howItWorks.step.download.description',
		},
	];

	openMenu() {
		this.#dialogService.openFullscreen(HomeMenuComponent);
	}
}
