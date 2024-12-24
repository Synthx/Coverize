export const themes = ['light', 'dark'] as const;
export type Theme = (typeof themes)[number];

export type Color = 'background' | 'title' | 'text';
export type Colors = Record<Color, string>;

export const themeColors: Record<Theme, Colors> = {
	light: {
		background: '#ffffff',
		title: 'black',
		text: '#171918',
	},
	dark: {
		background: '#171918',
		title: 'white',
		text: '#e8e8e8',
	},
};
