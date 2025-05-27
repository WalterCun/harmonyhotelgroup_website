/* empty css                                   */
import { c as createComponent, b as renderComponent, r as renderTemplate } from '../../chunks/astro/server_OcGr0KEC.mjs';
import { $ as $$Layout, a as lang_en } from '../../chunks/Layout_DV1peyq8.mjs';
export { renderers } from '../../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang_en, "title": "Error 404" }, { "default": ($$result2) => renderTemplate`
Error 404
` })}`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/en/404.astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/en/404.astro";
const $$url = "/en/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
