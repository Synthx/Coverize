import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	inject,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DialogService } from '../../service/dialog.service';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { LayoutService } from '../../service/layout.service';
import { environment } from '../../../environment/environment';
import { IconComponent } from '../../component/icon/icon.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe, RouterLink, DecimalPipe, IconComponent],
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
