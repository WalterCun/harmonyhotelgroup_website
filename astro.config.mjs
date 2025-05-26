import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.harmonyhotelgroup.com',
    build: {
        partialBuild: true
    },
    i18n: {
        locales: ['es', 'en'],
        defaultLocale: 'es',
        routing: {
            prefixDefaultLocale: false,
            redirectToDefaultLocale: true,
        }
    },
    integrations: [
        tailwind(),
        icon(
            {
                iconSets: [
                    {
                        name: 'lucide',
                        svg: {
                            dir: 'node_modules/lucide-static/icons',
                        },
                    },
                    {
                        name: 'astro',
                        svg: {
                            dir: 'src/icons',
                        },
                    },
                ],
            }
        ),
    ],
    adapter: vercel(),
    output: "server",
});