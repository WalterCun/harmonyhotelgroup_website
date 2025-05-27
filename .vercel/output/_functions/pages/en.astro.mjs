/* empty css                                */
import { c as createComponent, b as renderComponent, r as renderTemplate } from '../chunks/astro/server_OcGr0KEC.mjs';
import { $ as $$Layout, a as lang_en } from '../chunks/Layout_DV1peyq8.mjs';
import { $ as $$Hero } from '../chunks/Hero_BmoVoRps.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang_en }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "lang": lang_en })}      ` })}`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/en/index.astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
