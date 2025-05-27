/* empty css                                   */
import { a as createAstro, c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_OcGr0KEC.mjs';
import { $ as $$Layout, a as lang_en } from '../../chunks/Layout_DV1peyq8.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.harmonyhotelgroup.com");
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  const { error } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang_en, "title": "Error 500" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div>${error instanceof Error ? error.message : "Error desconocido"}</div> ` })}`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/en/500.astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/en/500.astro";
const $$url = "/en/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$500,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
