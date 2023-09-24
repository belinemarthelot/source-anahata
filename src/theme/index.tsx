import { createTheme } from '@mui/material';

const baseTheme = {
	breakpoints: {
		values: {
			xs: 0,
			sm: 700,
			md: 960,
			lg: 1280,
			xl: 1920
		}
	},
	typography: {
		fontFamily: 'Lumanosimo, cursive',
		h1: {
			fontWeight: 'bold'
		},
		h2: {
			fontWeight: 'bold'
		},
		h3: {
			fontWeight: 'bold'
		},
		body1: {
			fontFamily: 'Roboto mono, sans-serif',
			fontWeight: 'regular'
		},
		body2: {
			fontFamily: 'Roboto mono, sans-serif',
			fontWeight: 'regular'
		},
		subtitle1: {
			fontFamily: 'Roboto mono, sans-serif',
			fontSize: '.9em'
		},
		subtitle2: {
			fontFamily: 'Roboto mono, sans-serif',
			fontWeight: 'bold'
		},
		button: {
			fontFamily: 'Roboto mono, sans-serif',
			fontWeight: 'semibold'
		}
	}
};

export const applicationTheme = createTheme({
	palette: {
		primary: {
			main: '#6BDDB0',
			light: '#DDF7EC',
			dark: '#00C27B',
			contrastText: '#000'
		},
		secondary: {
			main: '#AD6C3F',
			light: '#FEC59F',
			dark: '#8A4B1D',
			contrastText: '#000'
		},
		// error: {
		// 	main: malwareRed
		// },
		// warning: {
		// 	main: nuggetYellow
		// },
		// info: {
		// 	main: azure
		// },
		// success: {
		// 	main: aquamarine
		// },
		background: {
			paper: '#f3f4f6',
			default: '#FFF'
		}
		// text: {
		// 	primary: htbGrey_light,
		// 	secondary: nodeBlack
		// }
	},
	...baseTheme
});
