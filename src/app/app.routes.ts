import type { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./page/home/home.component'),
	},
	{
		path: '',
		canActivate: [authGuard],
		children: [
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
	{
		path: '**',
		loadComponent: () => import('./page/not-found/not-found.component'),
	},
];
