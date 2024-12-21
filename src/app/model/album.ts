import type { Artist } from './artist';
import type { Image } from './image';
import type { Track } from './track';

export type Album = {
	id: string;
	uri: string;
	total_tracks: number;
	images: Image[];
	name: string;
	release_date: string;
	type: 'album';
	artists: Artist[];
	label: string;
	tracks: {
		total: number;
		items: Track[];
	};
};
