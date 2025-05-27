/* empty css                                      */
import { a as createAstro, c as createComponent, e as defineStyleVars, b as renderComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_OcGr0KEC.mjs';
import { $ as $$Layout } from '../../../chunks/Layout_DV1peyq8.mjs';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://www.harmonyhotelgroup.com");
async function getStaticPaths() {
  const hotels = {
    1: {
      id: 1,
      name: "Harmony Grand Plaza",
      location: "New York, USA",
      description: "Experience luxury reimagined in the heart of Manhattan. The Harmony Grand Plaza combines timeless elegance with modern sophistication, offering unparalleled views of the city skyline and Central Park.",
      theme: {
        primary: "#D4AF37",
        secondary: "#1B4D89",
        accent: "#A67C00"
      },
      logo: "https://example.com/grand-plaza-logo.png",
      gallery: [
        "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg",
        "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
        "https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg"
      ],
      amenities: [
        { name: "Free WiFi", icon: "wifi" },
        { name: "Pool", icon: "pool" },
        { name: "Spa", icon: "spa" },
        { name: "Restaurant", icon: "restaurant" },
        { name: "Fitness Center", icon: "fitness" },
        { name: "Room Service", icon: "room-service" }
      ],
      rooms: [
        {
          id: "deluxe",
          name: "Deluxe Room",
          description: "Spacious room with city views",
          size: "40m\xB2",
          occupancy: "2 Adults + 1 Child",
          price: 350,
          amenities: ["King Bed", "City View", "Mini Bar", "Work Desk"],
          images: [
            "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
            "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
          ]
        },
        {
          id: "suite",
          name: "Executive Suite",
          description: "Luxury suite with separate living area",
          size: "65m\xB2",
          occupancy: "2 Adults + 2 Children",
          price: 550,
          amenities: ["King Bed", "Living Room", "Kitchenette", "Park View"],
          images: [
            "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg",
            "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg"
          ]
        }
      ]
    }
    // Add more hotels here
  };
  return Object.entries(hotels).map(([id, hotel]) => ({
    params: { id },
    props: { hotel }
  }));
}
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { lang, hotel } = Astro2.props;
  const $$definedVars = defineStyleVars([{
    primaryColor: hotel.theme.primary,
    secondaryColor: hotel.theme.secondary,
    accentColor: hotel.theme.accent
  }]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${hotel.name} | Harmony Hotel Group`, "data-astro-cid-wcv6xy5f": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="relative h-[70vh]" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <img${addAttribute(hotel.gallery[0], "src")}${addAttribute(hotel.name, "alt")} class="w-full h-full object-cover" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}></div> <div class="absolute bottom-0 left-0 right-0 p-8 text-white" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="container" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <h1 class="mb-4" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>${hotel.name}</h1> <p class="text-xl mb-6" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>${hotel.description}</p> <div class="flex items-center text-lg" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <span class="flex items-center" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}></path> </svg> ${hotel.location} </span> </div> </div> </div> </div>  <div class="bg-primary-500/10 dark:bg-primary-500/5 py-8" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="container" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="text-center mb-6" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <h2 class="text-2xl font-semibold" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>Book Your Stay</h2> <p class="text-neutral-600 dark:text-neutral-400" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>
Find your perfect room and make a reservation
</p> </div> </div> </div>  <section class="py-16" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="container" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <h2 class="text-3xl font-semibold mb-8" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>Available Rooms</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> ${hotel.rooms.map((room) => renderTemplate`<div class="card overflow-hidden group" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <!-- Room Image Slider --> <div class="relative h-64" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <img${addAttribute(room.images[0], "src")}${addAttribute(room.name, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="absolute top-4 right-4 bg-white dark:bg-neutral-800 rounded-full py-1 px-3 text-sm font-semibold text-primary-500" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>
From $${room.price}/night
</div> </div> <div class="p-6" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <h3 class="text-xl font-semibold mb-2" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>${room.name}</h3> <p class="text-neutral-600 dark:text-neutral-400 mb-4" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>${room.description}</p> <div class="grid grid-cols-2 gap-4 mb-6" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>Room Size</span> <p class="text-neutral-800 dark:text-neutral-200" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>${room.size}</p> </div> <div data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>Occupancy</span> <p class="text-neutral-800 dark:text-neutral-200" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>${room.occupancy}</p> </div> </div> <div class="flex flex-wrap gap-2 mb-6" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> ${room.amenities.map((amenity) => renderTemplate`<span class="inline-flex items-center text-sm bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-full" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> ${amenity} </span>`)} </div> <div class="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-700" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <span class="text-2xl font-bold" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>$${room.price}</span> <span class="text-neutral-600 dark:text-neutral-400" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> / night</span> </div> <button class="btn btn-primary" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>Book Now</button> </div> </div> </div>`)} </div> </div> </section>  <section class="py-16 bg-neutral-50 dark:bg-neutral-800" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="container" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <h2 class="text-3xl font-semibold mb-8" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>Hotel Amenities</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> ${hotel.amenities.map((amenity) => renderTemplate`<div class="text-center" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <!-- Icon would be here --> </div> <h3 class="font-medium" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>${amenity.name}</h3> </div>`)} </div> </div> </section>  <section class="py-16" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <div class="container" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <h2 class="text-3xl font-semibold mb-8" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}>Photo Gallery</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> ${hotel.gallery.map((image) => renderTemplate`<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> <img${addAttribute(image, "src")} alt="Hotel gallery image" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" data-astro-cid-wcv6xy5f${addAttribute($$definedVars, "style")}> </div>`)} </div> </div> </section> ` })} `;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/en/hotels/[id].astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/en/hotels/[id].astro";
const $$url = "/en/hotels/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
