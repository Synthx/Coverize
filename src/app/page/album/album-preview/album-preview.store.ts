import { computed, inject, Injectable, signal } from '@angular/core';
import { SpotifyService } from '../../../service/spotify.service';
import { Poster } from '../../../model/poster';
import { PrintService } from '../../../service/print.service';
import {
	defaultTheme,
	predefinedThemeColors,
	ThemeColors,
} from '../../../model/theme';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class AlbumPreviewStore {
	#domSanitizer = inject(DomSanitizer);
	#spotifyService = inject(SpotifyService);
	#printService = inject(PrintService);

	#loading = signal(false);
	#poster = signal<Poster | undefined>(undefined);
	#themeColors = signal<ThemeColors>(predefinedThemeColors[defaultTheme]);

	loading = this.#loading.asReadonly();
	poster = this.#poster.asReadonly();
	pdf = computed(() => {
		const themeColors = this.#themeColors();
		const poster = this.#poster();
		if (!poster) {
			return undefined;
		}

		return this.#printService.generate(poster, themeColors);
	});
	preview = computed(() => {
		const pdf = this.pdf();
		if (!pdf) {
			return undefined;
		}

		const data = pdf.output('datauristring');

		return this.#domSanitizer.bypassSecurityTrustResourceUrl(data);
	});

	async init(id: string) {
		this.#loading.set(true);

		const album = await this.#spotifyService.findAlbum(id);
		const poster = await Poster.fromAlbum(album);
		this.#poster.set(poster);

		this.#loading.set(false);
	}

	print() {
		const poster = this.#poster();
		if (!poster) {
			throw new Error('Poster is not available');
		}

		const pdf = this.pdf();
		if (!pdf) {
			throw new Error('PDF is not available');
		}

		pdf.save(`${poster?.title}.pdf`);
	}

	setThemeColors(themeColors: ThemeColors) {
		this.#themeColors.set(themeColors);
	}
}
