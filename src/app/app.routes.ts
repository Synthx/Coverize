import type { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { LayoutComponent } from './component/layout/layout.component';

export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./page/home/home.component'),
	},
	{
		path: '',
		canActivate: [authGuard],
		component: LayoutComponent,
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
