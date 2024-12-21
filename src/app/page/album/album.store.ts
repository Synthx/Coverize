import { inject, Injectable, signal } from '@angular/core';
import { SpotifyService } from '../../service/spotify.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { getIdFromLink } from '../../util/link';

@Injectable()
export class AlbumStore {
	#spotifyService = inject(SpotifyService);
	#router = inject(Router);

	#loading = signal(false);

	loading = this.#loading.asReadonly();

	search(link: string) {
		this.#loading.set(true);

		const id = getIdFromLink(link);
		this.#spotifyService
			.findAlbum(id)
			.pipe(finalize(() => this.#loading.set(false)))
			.subscribe({
				next: (album) => {
					this.#router.navigate([`/albums/${album.id}`], {
						state: {
							album,
						},
					});
				},
				error: () => {},
			});
	}
}
