import type { Routes } from '@angular/router';
import { configGuard } from './guard/config.guard';

export const appRoutes: Routes = [
	{
		path: '',
		canActivate: [configGuard],
		children: [
			{
				path: '',
				redirectTo: '/albums',
				pathMatch: 'full',
			},
			{
				path: 'albums',
				loadComponent: () => import('./page/album/album.component'),
			},
			{
				path: 'albums/:id',
				loadComponent: () =>
					import('./page/album/album-preview/album-preview.component'),
			},
		],
	},
];
