import { Album } from './album';
import { Artist } from './artist';

export type Track = {
	id: string;
	uri: string;
	name: string;
	duration_ms: number;
	type: 'track';
};
