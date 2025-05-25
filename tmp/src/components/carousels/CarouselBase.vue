<!--<template>-->
<!--  <ThemeSwitcher/>-->
<!--  <div class="card">-->
<!--    <Carousel :value="props.objs" :numVisible="2" :numScroll="0.5" :responsiveOptions="responsiveOptions" circular-->
<!--              :autoplayInterval="5000" :showNavigators="false" orientation="vertical" verticalViewPortHeight="500px"-->
<!--              containerClass="flex items-center">-->
<!--      <template #item="slotProps">-->
<!--        <div class="w-full h-auto bg-white rounded-lg class=bg-white dark:bg-gray-800 shadow-lg p-6 m-2">-->
<!--          <h3 class="text-xl font-serif mb-4 dark:text-white">{{ slotProps.data.city }}</h3>-->
<!--          <div class="space-y-4">-->
<!--            <div class="flex items-start gap-3">-->
<!--              <MapPin class="w-5 h-5 text-gold-600 mt-1"/>-->
<!--              <div>-->
<!--                <p class="text-gray-600 dark:text-gray-400">{{ slotProps.data.address }}</p>-->
<!--                <p class="text-gray-600 dark:text-gray-400">{{ slotProps.data.postal }}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="flex items-center gap-3">-->
<!--              <Phone class="w-5 h-5 text-gold-600"/>-->
<!--              <p class="text-gray-600 dark:text-gray-400">{{ slotProps.data.phone }}</p>-->
<!--            </div>-->
<!--            <div class="flex items-center gap-3">-->
<!--              <Mail class="w-5 h-5 text-gold-600"/>-->
<!--              <a :href="`mailto:${slotProps.data.email}`" class="text-gray-600 dark:text-gray-400 hover:text-gold-600">-->
<!--                {{ slotProps.data.email }}-->
<!--              </a>-->
<!--            </div>-->
<!--            <div class="flex items-center gap-3">-->
<!--              <Clock class="w-5 h-5 text-gold-600"/>-->
<!--              <p class="text-gray-600 dark:text-gray-400">{{ slotProps.data.hours }}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </Carousel>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import {defineProps, ref} from "vue";-->
<!--import Carousel from 'primevue/carousel';-->
<!--import Tag from 'primevue/tag';-->
<!--import Button from 'primevue/button';-->

<!--import {MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube} from 'lucide-vue-next'-->

<!--const props = defineProps({-->
<!--  objs: Array < String > ([]),-->
<!--})-->

<!--const products = ref([-->
<!--  {-->
<!--    id: '1000',-->
<!--    code: 'f230fh0g3',-->
<!--    name: 'Bamboo Watch',-->
<!--    description: 'Product Description',-->
<!--    image: 'bamboo-watch.jpg',-->
<!--    price: 65,-->
<!--    category: 'Accessories',-->
<!--    quantity: 24,-->
<!--    inventoryStatus: 'INSTOCK',-->
<!--    rating: 5-->
<!--  },-->
<!--  {-->
<!--    id: '1001',-->
<!--    code: 'nvklal433',-->
<!--    name: 'Black Watch',-->
<!--    description: 'Product Description',-->
<!--    image: 'black-watch.jpg',-->
<!--    price: 72,-->
<!--    category: 'Accessories',-->
<!--    quantity: 61,-->
<!--    inventoryStatus: 'INSTOCK',-->
<!--    rating: 4-->
<!--  },-->
<!--  {-->
<!--    id: '1002',-->
<!--    code: 'zz21cz3c1',-->
<!--    name: 'Blue Band',-->
<!--    description: 'Product Description',-->
<!--    image: 'blue-band.jpg',-->
<!--    price: 79,-->
<!--    category: 'Fitness',-->
<!--    quantity: 2,-->
<!--    inventoryStatus: 'LOWSTOCK',-->
<!--    rating: 3-->
<!--  }]);-->

<!--const getSeverity = (status) => {-->
<!--  switch (status) {-->
<!--    case 'INSTOCK':-->
<!--      return 'success';-->

<!--    case 'LOWSTOCK':-->
<!--      return 'warn';-->

<!--    case 'OUTOFSTOCK':-->
<!--      return 'danger';-->

<!--    default:-->
<!--      return null;-->
<!--  }-->
<!--};-->

<!--</script>-->
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
        <div class="w-full h-auto bg-white rounded-lg dark:bg-gray-800 shadow-lg p-6 m-2">
          <h3 class="text-xl font-serif mb-4 dark:text-white">{{ data.city }}</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-gold-600 mt-1"/>
              <div>
                <p class="text-gray-600 dark:text-gray-400">{{ data.address }}</p>
                <p class="text-gray-600 dark:text-gray-400">{{ data.postal }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="w-5 h-5 text-gold-600"/>
              <p class="text-gray-600 dark:text-gray-400">{{ data.phone }}</p>
            </div>
            <div class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-gold-600"/>
              <a :href="`mailto:${data.email}`"
                 class="text-gray-600 dark:text-gray-400 hover:text-gold-600 block overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] sm:max-w-[250px]">
                {{ data.email }}
              </a>
            </div>
            <div class="flex items-center gap-3">
              <Clock class="w-5 h-5 text-gold-600"/>
              <p class="text-gray-600 dark:text-gray-400">{{ data.hours }}</p>
            </div>
          </div>
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
