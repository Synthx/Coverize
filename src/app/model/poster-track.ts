import { SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { decomposeTitle } from '../util/title';

export class PosterTrack {
	id: string;
	title: string;
	extra?: string;
	duration: number;

	constructor(track: SimplifiedTrack) {
		const [title, extra] = decomposeTitle(track.name);

		this.id = track.id;
		this.title = title;
		this.extra = extra;
		this.duration = track.duration_ms;
	}
}
