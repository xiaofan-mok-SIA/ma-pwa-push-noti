/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Proxima Nova', 'sans-serif'],
		},
		screens: {
			xs: '475px',
			...defaultTheme,
		},
		colors: {
			cyan: {
				lightest: '#e7f4fe',
				light: '#a6dbf1',
				DEFAULT: '#24a9df',
				dark: '#2396c8',
			},
			'sia-blue': '#00266b',
			orange: '#f05a30',
			fuchsia: '#eb008b',
			'sky-blue': '#729fd4',
			green: {
				light: '#e2f9f3',
				DEFAULT: '#0ea580',
				dark: '#0d9472',
			},
			red: {
				light: '#fcedec',
				DEFAULT: '#f85359',
				dark: '#df4b50',
			},
			blue: {
				DEFAULT: '#1991eb',
				dark: '#1782d4',
			},
			'sia-yellow': {
				DEFAULT: '#ff9f00',
				dark: '#e68f00',
			},
			'blue-grey': {
				lightest: '#eff1f4',
				lighter: '#dfe3e9',
				light: '#c5d0de',
				DEFAULT: '#7f8fa4',
				dark: '#516173',
				darkest: '#354052',
			},
			grey: {
				lightest: '#fafafa',
				lighter: '#f3f3f3',
				light: '#dddddd',
				DEFAULT: '#b0b0b1',
				dark: '#7e7e7e',
				darkest: '#5e5e5e',
			},
			black: '#000000',
			white: '#ffffff',
		},
		extend: {
			screens: {
				'3xl': '1600px',
			},
		},
	},
	plugins: [],
};
