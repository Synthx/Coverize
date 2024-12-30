import { Album } from '@spotify/web-api-ts-sdk';
import { extractColors } from 'extract-colors';
import { Color, ThemeColors } from './theme';
import { PosterTrack } from './poster-track';

export class Poster {
	image: string;
	title: string;
	artist: string;
	label: string;
	date: Date;
	uri: string;
	tracks: PosterTrack[];
	colors: Color[] = [];

	constructor(album: Album) {
		const image = album.images[0].url;

		this.title = album.name;
		this.label = album.label;
		this.artist = album.artists[0].name;
		this.date = new Date(album.release_date);
		this.uri = album.uri;
		this.image = image;
		this.tracks = album.tracks.items.map((i) => new PosterTrack(i));
	}

	get durationInMinutes(): number {
		const duration = this.tracks.reduce((acc, curr) => acc + curr.duration, 0);

		return Math.trunc(duration / 1000 / 60);
	}

	get trackList(): string {
		return this.tracks.map((t) => t.title.toUpperCase()).join(' • ');
	}

	getCodeImage(colors?: ThemeColors): string {
		return `https://scannables.scdn.co/uri/plain/png/${colors?.background.replace('#', '')}/${colors?.title}/660/${this.uri}`;
	}

	static async fromAlbum(album: Album): Promise<Poster> {
		const poster = new Poster(album);

		const colors = await extractColors(poster.image);
		poster.colors = colors.map((c) => c.hex);

		return poster;
	}
}
