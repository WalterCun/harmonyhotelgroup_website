/** @type {import('tailwindcss').Config} */
export default {
	content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
        "./src/**/*.{js,ts,jsx,tsx,mdx,astro}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// Tus colores actuales
				primary: {
					50: "#FBF8E6",
					100: "#F7F1CE",
					200: "#EFE39D",
					300: "#E8D56C",
					400: "#E0C83A",
					500: "#D4AF37", // Primary gold
					600: "#AA8C2C",
					700: "#7F6921",
					800: "#554616",
					900: "#2A230B",
					// Nuevos colores basados en HSL
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					50: "#E6F9F9",
					100: "#CCF3F3",
					200: "#99E7E7",
					300: "#66DBDB",
					400: "#33CFCF",
					500: "#008080", // Secondary teal
					600: "#006666",
					700: "#004D4D",
					800: "#003333",
					900: "#001A1A",
					// Nuevos colores basados en HSL
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				neutral: {
					50: "#F8F9FA",
					100: "#E9ECEF",
					200: "#DEE2E6",
					300: "#CED4DA",
					400: "#ADB5BD",
					500: "#6C757D",
					600: "#495057",
					700: "#343A40",
					800: "#212529",
					900: "#121416",
				},
				success: {
					500: "#28A745",
				},
				warning: {
					500: "#FFC107",
				},
				error: {
					500: "#DC3545",
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},

				// Nuevos colores basados en HSL
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				serif: ["Playfair Display", "Georgia", "serif"],
				sans: ["Inter", "system-ui", "sans-serif"],
			},
			spacing: {
				128: "32rem",
				144: "36rem",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				"fade-in": "fadeIn 0.5s ease-in-out",
				"slide-up": "slideUp 0.5s ease-out",
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

// import { Config } from "tailwindcss";
// import tailwindcssAnimate from "tailwindcss-animate";
//
// const config: Config = {
//     darkMode: ["class"],
//     content: [
//         "./src/**/*.{js,ts,jsx,tsx,mdx,astro}",
//         "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//         "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//         "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     ],
//     theme: {
//         extend: {
//             colors: {
//                 background: 'hsl(var(--background))',
//                 foreground: 'hsl(var(--foreground))',
//                 card: {
//                     DEFAULT: 'hsl(var(--card))',
//                     foreground: 'hsl(var(--card-foreground))'
//                 },
//                 popover: {
//                     DEFAULT: 'hsl(var(--popover))',
//                     foreground: 'hsl(var(--popover-foreground))'
//                 },
//                 primary: {
//                     DEFAULT: 'hsl(var(--primary))',
//                     foreground: 'hsl(var(--primary-foreground))'
//                 },
//                 secondary: {
//                     DEFAULT: 'hsl(var(--secondary))',
//                     foreground: 'hsl(var(--secondary-foreground))'
//                 },
//                 muted: {
//                     DEFAULT: 'hsl(var(--muted))',
//                     foreground: 'hsl(var(--muted-foreground))'
//                 },
//                 accent: {
//                     DEFAULT: 'hsl(var(--accent))',
//                     foreground: 'hsl(var(--accent-foreground))'
//                 },
//                 destructive: {
//                     DEFAULT: 'hsl(var(--destructive))',
//                     foreground: 'hsl(var(--destructive-foreground))'
//                 },
//                 border: 'hsl(var(--border))',
//                 input: 'hsl(var(--input))',
//                 ring: 'hsl(var(--ring))',
//                 chart: {
//                     '1': 'hsl(var(--chart-1))',
//                     '2': 'hsl(var(--chart-2))',
//                     '3': 'hsl(var(--chart-3))',
//                     '4': 'hsl(var(--chart-4))',
//                     '5': 'hsl(var(--chart-5))'
//                 },
//                 sidebar: {
//                     DEFAULT: 'hsl(var(--sidebar-background))',
//                     foreground: 'hsl(var(--sidebar-foreground))',
//                     primary: 'hsl(var(--sidebar-primary))',
//                     'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
//                     accent: 'hsl(var(--sidebar-accent))',
//                     'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
//                     border: 'hsl(var(--sidebar-border))',
//                     ring: 'hsl(var(--sidebar-ring))'
//                 }
//             },
//             borderRadius: {
//                 lg: 'var(--radius)',
//                 md: 'calc(var(--radius) - 2px)',
//                 sm: 'calc(var(--radius) - 4px)'
//             },
//             keyframes: {
//                 'accordion-down': {
//                     from: {
//                         height: '0'
//                     },
//                     to: {
//                         height: 'var(--radix-accordion-content-height)'
//                     }
//                 },
//                 'accordion-up': {
//                     from: {
//                         height: 'var(--radix-accordion-content-height)'
//                     },
//                     to: {
//                         height: '0'
//                     }
//                 }
//             },
//             animation: {
//                 'accordion-down': {
//                     from: {
//                         height: '0'
//                     },
//                     to: {
//                         height: 'var(--radix-accordion-content-height)'
//                     }
//                 },
//                 'accordion-up': 'accordion-up 0.2s ease-out'
//             }
//         }
//     },
//     plugins: [tailwindcssAnimate],
// };
//
// export default config;

