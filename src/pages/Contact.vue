<template>
  <div class="pt-20 min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative h-[40vh] bg-cover bg-center"
             :style="{
               backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)'
             }">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-4xl md:text-5xl font-serif mb-4">Contáctanos</h1>
          <p class="text-xl max-w-2xl mx-auto">
            Estamos aquí para ayudarte a planear tu próxima experiencia inolvidable desde tours, eventos, reservas, sala
            de reuniones, citas, etc.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-serif mb-6 dark:text-white">Envíanos un mensaje</h2>
            <form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre
                  </label>
                  <input
                      type="text"
                      v-model="form.name"
                      class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Apellido
                  </label>
                  <input
                      type="text"
                      v-model="form.lastName"
                      class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correo Electrónico
                </label>
                <input
                    type="email"
                    v-model="form.email"
                    class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                    type="tel"
                    v-model="form.phone"
                    class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asunto
                </label>
                <select
                    v-model="form.subject"
                    class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                >
                  <option value="">Selecciona un asunto</option>
                  <option v-for="subject in subjects" :key="subject" :value="subject">
                    {{ subject }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                    v-model="form.message"
                    rows="4"
                    class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                ></textarea>
              </div>

              <button
                  type="submit"
                  class="w-full bg-gold-600 text-white py-3 rounded-md hover:bg-gold-700 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <CardsHotelCarousel :objs="locations"></CardsHotelCarousel>

            <!-- Social Media -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 class="text-xl font-serif mb-4 dark:text-white">Síguenos en redes sociales</h3>
              <div class="flex gap-4">
                <a v-for="social in hhg_socials"
                   :key="social.name"
                   :href="social.url"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">
                  <component :is="social.icon" class="w-6 h-6"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import CarouselBase from "../components/carousels/CarouselBase.vue";
import {hhg_socials} from "../constans/social_network.ts";
import CardsHotelCarousel from "../components/carousels/CardsHotelCarousel.vue";

const form = ref({
  name: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const subjects = [
  'Información general',
  'Reservaciones',
  'Eventos especiales',
  'Comentarios y sugerencias',
  'Atención al cliente',
  'Otros'
]

const locations = [
  {
    hotel: "Hotel Majestic 2 by HHG",
    city: 'Cuenca, Ecuador',
    address: 'Av. Gran Colombia 207, Cuenca',
    postal: 'Cuenca, 010101',
    phone: '(+593) 980 098 757',
    email: 'hotelmajestic2@harmonyhotelgroup.com',
    hours: 'Lun - Dom: 24 horas'
  },
  {
    hotel: "Hotel Enuseños by HHG",
    city: 'Cuenca, Ecuador',
    address: 'Av. Gran Colombia 182, Cuenca',
    postal: 'Cuenca, 010101',
    phone: '(+593) 978 888 020',
    email: 'hotelmajestic2@harmonyhotelgroup.com',
    hours: 'Lun - Dom: 24 horas'
  }

]

</script>