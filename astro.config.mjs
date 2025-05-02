import {defineConfig} from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.harmonyhotelgroup.com',
    i18n: {
        locales: ['es', 'en','fr'],
        defaultLocale: 'es',
        routing: {
            prefixDefaultLocale: false,
            // redirectToDefaultLocale: true,
        }
    },
    integrations: [tailwind(), icon({
            iconSets: [
                {
                    name: 'lucide',
                    svg: {
                        dir: 'node_modules/lucide-static/icons',
                    },
                },
            ],
        }
    )],

    adapter: vercel(),
    output: "server",
});