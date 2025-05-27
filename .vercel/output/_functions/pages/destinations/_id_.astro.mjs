/* empty css                                   */
import { a as createAstro, c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_OcGr0KEC.mjs';
import { $ as $$Layout, l as lang_es } from '../../chunks/Layout_DV1peyq8.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.harmonyhotelgroup.com");
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const { lang } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang_es, "title": `Destino ${id}` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h3>Información del destino ${id}</h3> ` })}`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/destinations/[id].astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/destinations/[id].astro";
const $$url = "/destinations/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
