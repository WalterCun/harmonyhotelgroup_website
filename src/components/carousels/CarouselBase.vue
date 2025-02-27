<template>
  <div class="card w-full">
    <Carousel
        :value="objs"
        :numVisible="numVisible"
        :numScroll="numScroll"
        :responsiveOptions="responsiveOptions"
        :circular="circular"
        :autoplayInterval="autoplayInterval"
        :showNavigators="showNavigators"
        :showIndicators="showIndicators"
        :orientation="orientation"
        :verticalViewPortHeight="verticalViewPortHeight"
        class="w-full"
        style="width: 100%;"
    >
      <template #item="{ data }">
        <!--        <div class="w-full h-auto bg-white rounded-lg dark:bg-gray-800 shadow-lg p-6 m-2">-->
        <!--          <h3 class="text-xl font-serif mb-4 dark:text-white">{{ data.city }}</h3>-->
        <!--          <div class="space-y-4">-->
        <!--            <div class="flex items-start gap-3">-->
        <!--              <MapPin class="w-5 h-5 text-gold-600 mt-1"/>-->
        <!--              <div>-->
        <!--                <p class="text-gray-600 dark:text-gray-400">{{ data.address }}</p>-->
        <!--                <p class="text-gray-600 dark:text-gray-400">{{ data.postal }}</p>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div class="flex items-center gap-3">-->
        <!--              <Phone class="w-5 h-5 text-gold-600"/>-->
        <!--              <p class="text-gray-600 dark:text-gray-400">{{ data.phone }}</p>-->
        <!--            </div>-->
        <!--            <div class="flex items-center gap-3">-->
        <!--              <Mail class="w-5 h-5 text-gold-600"/>-->
        <!--              <a :href="`mailto:${data.email}`"-->
        <!--                 class="text-gray-600 dark:text-gray-400 hover:text-gold-600 block overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] sm:max-w-[250px]">-->
        <!--                {{ data.email }}-->
        <!--              </a>-->
        <!--            </div>-->
        <!--            <div class="flex items-center gap-3">-->
        <!--              <Clock class="w-5 h-5 text-gold-600"/>-->
        <!--              <p class="text-gray-600 dark:text-gray-400">{{ data.hours }}</p>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="w-full h-auto bg-white rounded-lg dark:bg-gray-800 shadow-lg p-6 m-2">
          <slot :data="data"></slot>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import Carousel from "primevue/carousel";
import {MapPin, Phone, Mail, Clock} from "lucide-vue-next";

defineProps({
  objs: {type: Array, required: true}, // Ahora es obligatorio pasar datos
  numVisible: {type: Number, default: 1},
  numScroll: {type: Number, default: 1},
  circular: {type: Boolean, default: true},
  autoplayInterval: {type: Number, default: 3500},
  showNavigators: {type: Boolean, default: false}, // Opción para mostrar/ocultar flechas
  showIndicators: {type: Boolean, default: true}, // Opción para mostrar/ocultar puntos de navegación
  orientation: {type: String, default: "vertical"}, // Puede ser "horizontal"
  verticalViewPortHeight: {type: String, default: "500px"}
});
</script>
