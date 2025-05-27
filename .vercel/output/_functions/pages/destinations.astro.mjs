/* empty css                                */
import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_OcGr0KEC.mjs';
import { $ as $$Layout, l as lang_es } from '../chunks/Layout_DV1peyq8.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const destinations = [
    {
      id: 1,
      name: "Paris",
      country: "France",
      description: "Experience the romance and history of the City of Light with iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
      hotels: 12,
      image: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Tokyo",
      country: "Japan",
      description: "Discover where ancient traditions meet cutting-edge technology in this dynamic metropolis, featuring historic temples, vibrant districts, and renowned cuisine.",
      hotels: 8,
      image: "https://images.pexels.com/photos/2187662/pexels-photo-2187662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Santorini",
      country: "Greece",
      description: "Explore this stunning island with its iconic white buildings and blue domes perched on cliffs overlooking the crystal-clear Aegean Sea.",
      hotels: 10,
      image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      name: "New York",
      country: "USA",
      description: "Immerse yourself in the energy of the city that never sleeps, with world-class museums, Broadway shows, diverse neighborhoods, and iconic skyscrapers.",
      hotels: 15,
      image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 5,
      name: "Bali",
      country: "Indonesia",
      description: "Find paradise on this tropical island known for its lush landscapes, pristine beaches, ancient temples, and vibrant cultural experiences.",
      hotels: 14,
      image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 6,
      name: "Dubai",
      country: "UAE",
      description: "Marvel at this ultra-modern city rising from the desert, featuring futuristic architecture, luxury shopping, and thrilling desert adventures.",
      hotels: 11,
      image: "https://images.pexels.com/photos/1539116/pexels-photo-1539116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 7,
      name: "Rome",
      country: "Italy",
      description: "Step back in time in the Eternal City, where ancient ruins like the Colosseum stand alongside Renaissance masterpieces and bustling piazzas.",
      hotels: 13,
      image: "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 8,
      name: "Maldives",
      country: "Maldives",
      description: "Escape to this idyllic archipelago of pristine islands, where overwater bungalows, coral reefs, and turquoise lagoons create the ultimate luxury retreat.",
      hotels: 9,
      image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang_es, "title": "Destinations" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-primary-500/10 dark:bg-neutral-800 py-16"> <div class="container"> <h1 class="text-center mb-6">Tourist Destinations</h1> <p class="text-center text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto">
Explore the world's most captivating destinations where our luxury hotels await to welcome you.
</p> </div> </div> <section class="section"> <div class="container"> <!-- Filter by region/continent --> <div class="mb-12 flex flex-wrap justify-center gap-4"> <button class="btn bg-primary-500 text-white hover:bg-primary-600">All Regions</button> <button class="btn bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500">
Europe
</button> <button class="btn bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500">
Asia
</button> <button class="btn bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500">
Americas
</button> <button class="btn bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500">
Middle East
</button> <button class="btn bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500">
Oceania
</button> </div> <!-- Destination grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> ${destinations.map((destination) => renderTemplate`<a${addAttribute(`/destinations/${destination.id}`, "href")} class="card group hover:shadow-xl transition-all duration-300"> <div class="relative h-64 overflow-hidden"> <img${addAttribute(destination.image, "src")}${addAttribute(destination.name, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"> <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div> <div class="absolute bottom-0 left-0 p-6 text-white"> <h3 class="text-xl font-semibold mb-1">${destination.name}</h3> <p class="text-sm">${destination.country}</p> </div> </div> <div class="p-5"> <p class="text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3"> ${destination.description} </p> <p class="text-primary-500 font-medium flex items-center"> <span>${destination.hotels} Hotels Available</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 ml-1"> <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"></path> </svg> </p> </div> </a>`)} </div> </div> </section> ` })}`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/destinations/index.astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/destinations/index.astro";
const $$url = "/destinations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
