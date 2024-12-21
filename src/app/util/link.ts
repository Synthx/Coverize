export const linkRegex = new RegExp(
	/^(spotify:album:|https:\/\/open\.spotify\.com(\/.+)?\/album\/)([a-zA-Z0-9]+)$/,
);

export const getIdFromLink = (link: string): string => {
	const matches = link.match(linkRegex);
	if (!matches) {
		throw new Error('Invalid link');
	}

	return matches[3];
};
