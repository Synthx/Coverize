import { computed, inject, Injectable, signal } from '@angular/core';
import { SpotifyService } from '../../../service/spotify.service';
import type { Album } from '../../../model/album';
import { finalize } from 'rxjs';
import type { Poster } from '../../../model/poster';
import { getPoster } from '../../../util/poster';

@Injectable()
export class AlbumPreviewStore {
	#spotifyService = inject(SpotifyService);

	#loading = signal(false);
	#album = signal<Album | undefined>(undefined);

	loading = this.#loading.asReadonly();
	poster = computed<Poster | undefined>(() => {
		const album = this.#album();
		if (!album) return undefined;

		return getPoster(album);
	});

	init(id: string) {
		this.#loading.set(true);

		this.#spotifyService
			.findAlbum(id)
			.pipe(finalize(() => this.#loading.set(false)))
			.subscribe({
				next: (album) => {
					this.#album.set(album);
				},
			});
	}

	print() {
		window.print();
	}
}
