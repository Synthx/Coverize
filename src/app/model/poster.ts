export type Poster = {
	image: string;
	title: string;
	comment?: string;
	artist: string;
	label: string;
	date: Date;
	uri: string;
	tracks: PosterTrack[];
};

export type PosterTrack = {
	id: string;
	title: string;
	extra?: string;
	duration: number;
};
