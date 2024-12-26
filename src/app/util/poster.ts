import type { Poster, PosterTrack } from '../model/poster';
import { decomposeTitle } from './title';
import { Album, SimplifiedTrack } from '@spotify/web-api-ts-sdk';

export const getPoster = (album: Album): Poster => {
	return {
		title: album.name,
		label: album.label,
		artist: album.artists[0].name,
		image: album.images[0].url,
		date: new Date(album.release_date),
		uri: album.uri,
		tracks: album.tracks.items.map((i) => getPosterTrack(i)),
	};
};

export const getPosterTrack = (track: SimplifiedTrack): PosterTrack => {
	const [title, extra] = decomposeTitle(track.name);

	return {
		id: track.id,
		duration: track.duration_ms,
		title,
		extra,
	};
};
