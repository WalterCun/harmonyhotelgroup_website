/* empty css                                */
import { a as createAstro, c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_OcGr0KEC.mjs';
import { l as lang_es, t as trans, $ as $$Layout } from '../chunks/Layout_DV1peyq8.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.harmonyhotelgroup.com");
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  const { error, lang = lang_es } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang, "title": trans(lang, "500.title-page") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex flex-col items-center pt-16 pb-28 bg-neutral-50"> <div class="w-full max-w-2xl text-center"> <h1 class="text-7xl font-serif font-bold text-error-500 mb-2 animate-fade-in -mt-8">${trans(lang, "500.title")}</h1> <h2 class="text-3xl font-serif text-secondary-500 mb-4 animate-fade-in">${trans(lang, "500.subtitle")}</h2> <div class="flex justify-center items-center my-6"> <!-- Animación representando servidores con problemas --> <div class="w-[300px] h-[300px] relative flex items-center justify-center"> <div class="absolute w-40 h-60 bg-neutral-200 rounded-md border-2 border-neutral-300 shadow-md animate-pulse"> <div class="w-full h-6 bg-neutral-300 flex items-center justify-start px-2"> <div class="w-2 h-2 rounded-full bg-error-500 mr-1"></div> <div class="w-2 h-2 rounded-full bg-warning-500 mr-1"></div> <div class="w-2 h-2 rounded-full bg-success-500"></div> </div> <div class="p-3"> <div class="w-full h-4 bg-neutral-300 mb-2 rounded"></div> <div class="w-3/4 h-4 bg-neutral-300 mb-2 rounded"></div> <div class="w-5/6 h-4 bg-neutral-300 mb-6 rounded"></div> <div class="flex flex-col items-center justify-center"> <div class="w-16 h-16 rounded-full bg-error-500 flex items-center justify-center animate-bounce"> <span class="text-white text-3xl font-bold">!</span> </div> <div class="mt-4 w-full h-3 bg-neutral-300 rounded"></div> <div class="mt-2 w-5/6 h-3 bg-neutral-300 rounded"></div> </div> </div> </div> <!-- Destellos/chispas simulando problemas eléctricos --> <div class="absolute top-5 right-12 w-2 h-2 bg-warning-500 rounded-full animate-ping" style="animation-duration: 1.5s;"></div> <div class="absolute top-12 right-14 w-3 h-3 bg-warning-500 rounded-full animate-ping" style="animation-duration: 1.2s;"></div> <div class="absolute bottom-14 right-20 w-2 h-2 bg-warning-500 rounded-full animate-ping" style="animation-duration: 1.8s;"></div> </div> </div> <p class="text-neutral-600 mb-6 max-w-lg mx-auto animate-slide-up"> ${trans(lang, "500.description")} </p> <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up p-6">${error instanceof Error ? error.message : "Error desconocido"}</div> <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"> <a href="/" class="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"> ${trans(lang, "500.btn-home")} </a> <a href="/contact" class="px-6 py-3 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors"> ${trans(lang, "500.btn-contact")} </a> </div> </div> </div> ` })}`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/500.astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$500,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
