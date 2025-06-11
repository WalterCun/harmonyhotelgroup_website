import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";

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
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  output: "server",
});
