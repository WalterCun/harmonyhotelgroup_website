<!--<template>-->
<!--  <div class="relative">-->
<!--    <button-->
<!--        @click="toggleDropdown"-->
<!--        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"-->
<!--    >-->
<!--      <Coins class="w-5 h-5 text-gray-600 dark:text-gray-300" />-->
<!--      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">-->
<!--        {{ currencies[currentCurrency].symbol }}-->
<!--      </span>-->
<!--      <ChevronDown-->
<!--          class="w-4 h-4 text-gray-500 transition-transform"-->
<!--          :class="{ 'rotate-180': isCurrencyOpen }"-->
<!--      />-->
<!--    </button>-->
<!--    &lt;!&ndash; Currency Dropdown &ndash;&gt;-->
<!--    <div-->
<!--        v-show="isCurrencyOpen"-->
<!--        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"-->
<!--    >-->
<!--      <button-->
<!--          v-for="(currency, code) in currencies"-->
<!--          :key="code"-->
<!--          @click="handleSelectCurrency(code)"-->
<!--          class="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"-->
<!--          :class="{ 'bg-gray-50 dark:bg-gray-700': currentCurrency === code }"-->
<!--      >-->
<!--        <span class="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">-->
<!--          {{ currency.symbol }}-->
<!--        </span>-->
<!--        <span class="text-sm text-gray-700 dark:text-gray-300">-->
<!--          {{ currency.name }}-->
<!--        </span>-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, defineProps, defineEmits } from 'vue'-->
<!--import { Coins, ChevronDown } from 'lucide-vue-next'-->

<!--// Definimos la interfaz para cada moneda-->
<!--interface Currency {-->
<!--  name: string;-->
<!--  symbol: string;-->
<!--}-->

<!--// Y para el objeto que contiene todas las monedas-->
<!--interface Currencies {-->
<!--  [key: string]: Currency;-->
<!--}-->

<!--// Props: recibimos el listado de monedas y la moneda seleccionada actualmente-->
<!--const props = defineProps<{-->
<!--  currencies: Currencies;-->
<!--  currentCurrency: string;-->
<!--}>()-->

<!--// Emite el evento para actualizar la moneda seleccionada en el componente padre-->
<!--const emit = defineEmits<{-->
<!--  (e: 'update:currentCurrency', newCurrency: string): void;-->
<!--}>()-->

<!--// Estado para controlar la visibilidad del dropdown-->
<!--const isCurrencyOpen = ref(false)-->

<!--const toggleDropdown = () => {-->
<!--  isCurrencyOpen.value = !isCurrencyOpen.value-->
<!--}-->

<!--const handleSelectCurrency = (code: string) => {-->
<!--  emit('update:currentCurrency', code)-->
<!--  isCurrencyOpen.value = false-->
<!--}-->
<!--</script>-->
<!--<template>-->
<!--  <div class="relative" ref="dropdownRef">-->
<!--    &lt;!&ndash; Botón: se pasa el estado isOpen al slot &ndash;&gt;-->
<!--    <div @click="toggleDropdown">-->
<!--      <slot name="button" :isOpen="isOpen"></slot>-->
<!--    </div>-->
<!--    &lt;!&ndash; Contenido del dropdown con animación &ndash;&gt;-->
<!--    <transition name="fade">-->
<!--      <div v-show="isOpen" class="absolute right-0 mt-2 w-full" ref="dropdownContentRef">-->
<!--        <slot name="dropdown"></slot>-->
<!--      </div>-->
<!--    </transition>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, onMounted, onUnmounted } from 'vue'-->

<!--const isOpen = ref(false)-->
<!--const dropdownRef = ref<HTMLElement | null>(null)-->
<!--const dropdownContentRef = ref<HTMLElement | null>(null)-->

<!--const toggleDropdown = () => {-->
<!--  isOpen.value = !isOpen.value-->
<!--}-->

<!--const closeDropdown = () => {-->
<!--  isOpen.value = false-->
<!--}-->

<!--const handleClickOutside = (event: MouseEvent) => {-->
<!--  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {-->
<!--    closeDropdown()-->
<!--  }-->
<!--}-->

<!--onMounted(() => {-->
<!--  document.addEventListener('click', handleClickOutside)-->
<!--})-->

<!--onUnmounted(() => {-->
<!--  document.removeEventListener('click', handleClickOutside)-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--.fade-enter-active,-->
<!--.fade-leave-active {-->
<!--  transition: opacity 0.2s;-->
<!--}-->
<!--.fade-enter-from,-->
<!--.fade-leave-to {-->
<!--  opacity: 0;-->
<!--}-->
<!--</style>-->
<!-- src/components/dropdown/BaseDropdown.vue -->
<template>
  <div class="relative" ref="dropdownRef">
    <!-- Botón: se pasa el estado isOpen al slot -->
    <div @click="toggleDropdown">
      <slot name="button" :isOpen="isOpen"></slot>
    </div>
    <!-- Contenido del dropdown con transición -->
    <transition name="fade">
      <div v-show="isOpen" class="absolute right-0 mt-2" ref="dropdownContentRef">
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownContentRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
