export type PredefinedTheme = 'light' | 'dark';
export const predefinedThemes: PredefinedTheme[] = ['light', 'dark'];
export const defaultTheme: PredefinedTheme = 'light';

export type Theme = PredefinedTheme | 'custom';
export const themes: Theme[] = [...predefinedThemes, 'custom'];

export type Color = string;
export type ThemeAttribute = 'background' | 'title' | 'text';
export type ThemeColors = Record<ThemeAttribute, Color>;

export const predefinedThemeColors: Record<PredefinedTheme, ThemeColors> = {
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
