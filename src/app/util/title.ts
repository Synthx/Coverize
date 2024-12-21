export const decomposeTitle = (title: string): [string, string | undefined] => {
	const matches = title.match(new RegExp(/ \((.+)\)/));
	if (matches && matches.length > 0) {
		return [title.substring(0, matches.index), matches[1]];
	}

	return [title, undefined];
};
