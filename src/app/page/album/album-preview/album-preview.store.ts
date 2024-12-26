import { computed, inject, Injectable, signal } from '@angular/core';
import { SpotifyService } from '../../../service/spotify.service';
import type { Poster } from '../../../model/poster';
import { getPoster } from '../../../util/poster';
import { Album } from '@spotify/web-api-ts-sdk';

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

	async init(id: string) {
		this.#loading.set(true);

		const album = await this.#spotifyService.findAlbum(id);
		this.#album.set(album);

		this.#loading.set(false);
	}

	print() {
		window.print();
	}
}
