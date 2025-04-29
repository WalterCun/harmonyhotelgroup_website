import {defineConfig} from 'astro/config';
// import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    i18n: {
        locales: ['es', 'en'],
        defaultLocale: 'es',
        routing: {
            prefixDefaultLocale: false,
            // redirectToDefaultLocale: true,
        }
    },
    prefetch: true,
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
});