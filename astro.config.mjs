import tailwindcss from '@tailwindcss/vite'
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://www.harmonyhotelgroup.com",
    build: {
        partialBuild: true,
    },
    i18n: {
        locales: ["es", "en"],
        defaultLocale: "es",
        routing: {
            prefixDefaultLocale: false,
            redirectToDefaultLocale: true,
        },
    },
    vite: {
		plugins: [tailwindcss()],
	},
        integrations: [
        icon({
            iconSets: [
                {
                    name: "astro",
                    svg: {
                        dir: "src/icons",
                    },
                },
            ],
        }),
    ],
    adapter: vercel(),
    output: "server",
});
