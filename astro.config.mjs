import tailwindcss from '@tailwindcss/vite'
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import {defineConfig} from "astro/config";

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
        resolve:{
            alias: {
                "~":'/src',
                "lib":'/src/lib',
            }
        }
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
    adapter: vercel({
        webAnalytics: {enabled: true}
    }),
    output: "server",
});
