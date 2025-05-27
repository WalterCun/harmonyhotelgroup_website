/* empty css                                */
import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_OcGr0KEC.mjs';
import { $ as $$Layout, l as lang_es } from '../chunks/Layout_DV1peyq8.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang_es, "title": "Login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"> <div class="sm:mx-auto sm:w-full sm:max-w-md"> <div class="text-center"> <h2 class="text-3xl font-semibold">Welcome Back</h2> <p class="mt-2 text-neutral-600 dark:text-neutral-400">
Sign in to your Harmony Hotel Group account
</p> </div> <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"> <div class="bg-white dark:bg-neutral-800 py-8 px-4 shadow sm:rounded-lg sm:px-10"> <!-- Login Form --> <form class="space-y-6"> <div> <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
Email Address
</label> <div class="mt-1"> <input id="email" name="email" type="email" autocomplete="email" required class="input"> </div> </div> <div> <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
Password
</label> <div class="mt-1"> <input id="password" name="password" type="password" autocomplete="current-password" required class="input"> </div> </div> <div class="flex items-center justify-between"> <div class="flex items-center"> <input id="remember-me" name="remember-me" type="checkbox" class="checkbox"> <label for="remember-me" class="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
Remember me
</label> </div> <div class="text-sm"> <a href="#" class="font-medium text-primary-500 hover:text-primary-600 transition-colors">
Forgot your password?
</a> </div> </div> <div> <button type="submit" class="btn btn-primary w-full">
Sign In
</button> </div> </form> <div class="mt-6"> <div class="relative"> <div class="absolute inset-0 flex items-center"> <div class="w-full border-t border-neutral-300 dark:border-neutral-700"></div> </div> <div class="relative flex justify-center text-sm"> <span class="px-2 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
Or continue with
</span> </div> </div> <div class="mt-6 grid grid-cols-2 gap-3"> <div> <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm bg-white dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"> <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path> </svg> </a> </div> <div> <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm bg-white dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"> <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path> </svg> </a> </div> </div> </div> <div class="mt-6 text-center"> <p class="text-sm text-neutral-600 dark:text-neutral-400">
Don't have an account?
<a href="/register" class="font-medium text-primary-500 hover:text-primary-600 transition-colors">
Sign up
</a> </p> </div> </div> </div> </div> </section> ` })}`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/login.astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
