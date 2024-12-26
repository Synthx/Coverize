import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { GithubIconComponent } from '../../component/icon/github-icon/github-icon.component';
import { SpotifyIconComponent } from '../../component/icon/spotify-icon/spotify-icon.component';
import { DiscIconComponent } from '../../component/icon/disc-icon/disc-icon.component';
import { DecimalPipe } from '@angular/common';

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
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class HomeComponent {
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
}
