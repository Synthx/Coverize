import type { Poster, PosterTrack } from '../model/poster';
import type { Track } from '../model/track';
import { decomposeTitle } from './title';
import type { Album } from '../model/album';

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

export const getPosterTrack = (track: Track): PosterTrack => {
	const [title, comment] = decomposeTitle(track.name);

	return {
		id: track.id,
		duration: track.duration_ms,
		title,
		comment,
	};
};
