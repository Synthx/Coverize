import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SpotifyService } from '../service/spotify.service';

export const authGuard: CanActivateFn = async () => {
	const spotifyService = inject(SpotifyService);
	const router = inject(Router);

	const authenticated = await spotifyService.authenticated();
	if (authenticated) {
		return true;
	}

	return router.createUrlTree(['/auth/login']);
};
