import { Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment';
import {
	Album,
	Scopes,
	SpotifyApi,
	UserProfile,
} from '@spotify/web-api-ts-sdk';

@Injectable({
	providedIn: 'root',
})
export class SpotifyService {
	#sdk = SpotifyApi.withUserAuthorization(
		environment.clientId,
		window.location.origin,
		Scopes.userDetails,
	);
	#profile = signal<UserProfile | undefined>(undefined);

	profile = this.#profile.asReadonly();

	async findAlbum(id: string): Promise<Album> {
		return this.#sdk.albums.get(id);
	}

	async authenticated(): Promise<boolean> {
		const response = await this.#sdk.authenticate();
		if (response.authenticated) {
			if (!this.#profile()) {
				const profile = await this.#sdk.currentUser.profile();

				this.#profile.set(profile);
			}

			return true;
		}

		return false;
	}
}
