import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CywUhNrQ.mjs';
import { manifest } from './manifest_BkUbj35p.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/500.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/contact.astro.mjs');
const _page5 = () => import('./pages/destinations/_id_.astro.mjs');
const _page6 = () => import('./pages/destinations.astro.mjs');
const _page7 = () => import('./pages/en/404.astro.mjs');
const _page8 = () => import('./pages/en/500.astro.mjs');
const _page9 = () => import('./pages/en/blog.astro.mjs');
const _page10 = () => import('./pages/en/contact.astro.mjs');
const _page11 = () => import('./pages/en/destinations.astro.mjs');
const _page12 = () => import('./pages/en/hotels/_id_.astro.mjs');
const _page13 = () => import('./pages/en/hotels.astro.mjs');
const _page14 = () => import('./pages/en/login.astro.mjs');
const _page15 = () => import('./pages/en/offers.astro.mjs');
const _page16 = () => import('./pages/en.astro.mjs');
const _page17 = () => import('./pages/hotels/_id_.astro.mjs');
const _page18 = () => import('./pages/hotels.astro.mjs');
const _page19 = () => import('./pages/login.astro.mjs');
const _page20 = () => import('./pages/offers.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.8.0_@types+node@22.15.21_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/500.astro", _page2],
    ["src/pages/blog.astro", _page3],
    ["src/pages/contact.astro", _page4],
    ["src/pages/destinations/[id].astro", _page5],
    ["src/pages/destinations/index.astro", _page6],
    ["src/pages/en/404.astro", _page7],
    ["src/pages/en/500.astro", _page8],
    ["src/pages/en/blog.astro", _page9],
    ["src/pages/en/contact.astro", _page10],
    ["src/pages/en/destinations.astro", _page11],
    ["src/pages/en/hotels/[id].astro", _page12],
    ["src/pages/en/hotels.astro", _page13],
    ["src/pages/en/login.astro", _page14],
    ["src/pages/en/offers.astro", _page15],
    ["src/pages/en/index.astro", _page16],
    ["src/pages/hotels/[id].astro", _page17],
    ["src/pages/hotels/index.astro", _page18],
    ["src/pages/login.astro", _page19],
    ["src/pages/offers.astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "795cbea7-8ba8-4a89-ae3a-4bcfa46c376c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
