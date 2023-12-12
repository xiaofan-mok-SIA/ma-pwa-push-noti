/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Proxima Nova', 'sans-serif'],
		},
		fontSize: {
			sm: ['12px', '16px'], // caption
			base: ['14px', '21px'], // body
			lg: ['16px', '24px'], // h3
			xl: ['18px', '24px'], // h2
			'2xl': ['22px', '32px'], // h1
			'3xl': ['26px', '36px'], // Display 3
			'4xl': ['40px', '60px'], // Display 2
			'5xl': ['50px', '60px'], // Display 1
		},
		screens: {
			xs: '475px',
			...defaultTheme.screens,
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '2rem',
				sm: '2rem',
				md: '2rem',
				lg: '2rem',
				xl: '6rem',
				'2xl': '9rem',
			},
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
