<template>
  <div class="w-full">
    <Carousel
        :value="maps"
        :numVisible="1"
        :numScroll="1"
        :circular="true"
        :autoplayInterval="5000"
        :showNavigators="true"
        :showIndicators="true"
        class="shadow-lg rounded-lg overflow-hidden"
    >
      <template #item="{ data }">
        <div class="w-full flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <!-- Mapa -->
          <div class="w-full h-96">
            <iframe
                :src="data.url"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen="false"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="rounded-lg shadow-md"
            ></iframe>
          </div>

          <!-- Información del hotel -->
          <div class="text-center mt-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {{ data.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              {{ data.address }}
            </p>
            <router-link to="/contacto"
                         class="inline-block bg-gold-600 text-white px-8 py-3 rounded-md hover:bg-gold-700 transition-colors">
              Enviar Mensaje
            </router-link>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Carousel from "primevue/carousel";

const maps = ref([
  {
    name: "Hotel Majestic 2 by HHG",
    address: "Av. Paseo de la Reforma 483, Cuauhtémoc, Ciudad de México, CDMX 06500",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.717311147254!2d-79.00061638857947!3d-2.8975797970667134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd19b08bbe4bff%3A0xe7258e2651680854!2sHotel%20Majestic%202%20by%20HHG!5e0!3m2!1ses!2sec!4v1740290687750!5m2!1ses!2sec",
  },
  {
    name: "Hotel Ensueños",
    address: "Av. de los Conquistadores 456, Cuenca, Ecuador",
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.0896084489382!2d-78.9973188!3d-2.8977057999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd181610c7ece9%3A0x71b69c38ce5e52e8!2sHotel%20Ensue%C3%B1os!5e0!3m2!1ses!2sec!4v1740290718850!5m2!1ses!2sec",
  },
]);
</script>
