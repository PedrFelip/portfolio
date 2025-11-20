import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter var', ...fontFamily.sans]
			},
			animation: {
				'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
				magicslide: 'magicslide var(--speed) ease-in-out infinite alternate'
			},
			keyframes: {
				'spin-around': {
					'0%': {
						transform: 'translateZ(0) rotate(0)'
					},
					'15%, 35%': {
						transform: 'translateZ(0) rotate(90deg)'
					},
					'65%, 85%': {
						transform: 'translateZ(0) rotate(270deg)'
					},
					'100%': {
						transform: 'translateZ(0) rotate(360deg)'
					}
				},
				magicslide: {
					to: {
						transform: 'translate(calc(100cqw - 100%), 0)'
					}
				}
			}
		}
	},
	plugins: [typography]
};

export default config;
