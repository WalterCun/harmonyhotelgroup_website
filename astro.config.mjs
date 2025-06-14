import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
// Para desarrollo local, usa node
import node from "@astrojs/node";

const isDevEnvironment = false;

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
  // Usa el adaptador adecuado según el entorno
  adapter: isDevEnvironment
    ? node({
        mode: "standalone",
      })
    : vercel({
        webAnalytics: { enabled: true },
      }),
  output: "server",
});
