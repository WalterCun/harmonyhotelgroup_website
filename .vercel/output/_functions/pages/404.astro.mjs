/* empty css                                */
import { a as createAstro, c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_OcGr0KEC.mjs';
import { l as lang_es, t as trans, $ as $$Layout } from '../chunks/Layout_DV1peyq8.mjs';
import { i as imageUrl } from '../chunks/tina_YnfrB-oI.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.harmonyhotelgroup.com");
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const { lang = lang_es } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang, "title": trans(lang, "404.title-page") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex flex-col items-center pt-16 pb-28 bg-neutral-50"> <div class="w-full max-w-2xl text-center"> <h1 class="text-7xl font-serif font-bold text-primary-500 mb-4 animate-fade-in">${trans(lang, "404.title")}</h1> <h2 class="text-3xl font-serif text-secondary-500 mb-6 animate-fade-in">${trans(lang, "404.subtitle")}</h2> <div class="flex justify-center items-center my-8"> <img${addAttribute(imageUrl({ url: "gifs/search.gif", back: 1 }), "src")} alt="Gif Busqueda" class="w-[300px] h-[300px] object-cover mx-auto"> </div> <p class="text-neutral-600 mb-8 max-w-lg mx-auto animate-slide-up"> ${trans(lang, "404.description")} </p> <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"> <a href="/" class="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"> ${trans(lang, "404.btn-home")} </a> <a href="/contact" class="px-6 py-3 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors"> ${trans(lang, "btn-contact")} </a> </div> </div> </div> ` })}`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/404.astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
