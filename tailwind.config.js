module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [require("tailwindcss-animate"), require("daisyui")],
	daisyui: {
		themes: [
			{
				harmony_theme: {
					primary: "oklch(0.7665 0.1387 91.06)",
					"primary-content": "oklch(98% 0.01 240)",
					secondary: "oklch(1 0 none)",
					"secondary-content": "oklch(98% 0.01 200)",
					accent: "oklch(65% 0.25 160)",
					"accent-content": "oklch(98% 0.01 160)",
					neutral: "oklch(50% 0.05 240)",
					"neutral-content": "oklch(98% 0.01 240)",
					"base-100": "oklch(0.98 0.01 240)",
					"base-200": "oklch(1 0 none)",
					"base-300": "oklch(1 0 none)",
					"base-content": "oklch(20% 0.05 240)",
					info: "oklch(70% 0.2 220)",
					"info-content": "oklch(98% 0.01 220)",
					success: "oklch(65% 0.25 140)",
					"success-content": "oklch(98% 0.01 140)",
					warning: "oklch(80% 0.25 80)",
					"warning-content": "oklch(20% 0.05 80)",
					error: "oklch(65% 0.3 30)",
					"error-content": "oklch(98% 0.01 30)",
				},
			},
		],
		defaultTheme: "harmony_theme",
	},
};
