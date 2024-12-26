import { inject, Injectable, signal } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';
import { Router } from '@angular/router';
import { getIdFromLink } from '../../util/link';

@Injectable()
export class AlbumStore {
	#spotifyService = inject(SpotifyService);
	#router = inject(Router);

	#loading = signal(false);

	loading = this.#loading.asReadonly();

	async search(link: string) {
		this.#loading.set(true);

		try {
			const id = getIdFromLink(link);
			const album = await this.#spotifyService.findAlbum(id);
			await this.#router.navigate([`/albums/${album.id}`], {
				state: {
					album,
				},
			});
		} catch (error) {
			console.error(error);
		} finally {
			this.#loading.set(false);
		}
	}
}
