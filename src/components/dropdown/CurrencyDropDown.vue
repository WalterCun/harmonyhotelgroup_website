<!--<template>-->
<!--  <DropDownBase>-->
<!--    <template #button="{ isOpen }">-->
<!--      <button-->
<!--          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"-->
<!--      >-->
<!--        <Coins class="w-5 h-5 text-gray-600 dark:text-gray-300" />-->
<!--        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">-->
<!--          {{ currencies[currentCurrency].symbol }}-->
<!--        </span>-->
<!--        <ChevronDown-->
<!--            class="w-4 h-4 text-gray-500 transition-transform"-->
<!--            :class="{ 'rotate-180': isOpen }"-->
<!--        />-->
<!--      </button>-->
<!--    </template>-->
<!--    <template #dropdown>-->
<!--      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">-->
<!--        <button-->
<!--            v-for="(currency, code) in currencies"-->
<!--            :key="code"-->
<!--            @click="handleSelectCurrency(String(code))"-->
<!--            class="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"-->
<!--            :class="{ 'bg-gray-50 dark:bg-gray-700': currentCurrency === code }"-->
<!--        >-->
<!--          <span class="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">-->
<!--            {{ currency.symbol }}-->
<!--          </span>-->
<!--          <span class="text-sm text-gray-700 dark:text-gray-300">-->
<!--            {{ currency.name }}-->
<!--          </span>-->
<!--        </button>-->
<!--      </div>-->
<!--    </template>-->
<!--  </DropDownBase>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { defineProps, defineEmits } from 'vue'-->
<!--import DropDownBase from '../base/DropDownBase.vue'-->
<!--import { Coins, ChevronDown } from 'lucide-vue-next'-->

<!--interface Currency {-->
<!--  name: string;-->
<!--  symbol: string;-->
<!--}-->

<!--interface Currencies {-->
<!--  [key: string]: Currency;-->
<!--}-->

<!--defineProps<{-->
<!--  currencies: Array<Currencies>;-->
<!--  currentCurrency: string;-->
<!--}>()-->

<!--const emit = defineEmits<{-->
<!--  (e: 'update:currentCurrency', newCurrency: string): void;-->
<!--}>()-->

<!--const handleSelectCurrency = (code: string) => {-->
<!--  emit('update:currentCurrency', code)-->
<!--}-->
<!--</script>-->
<!-- src/components/dropdown/CurrencyDropDown.vue -->
<template>
  <DropDownBase>
    <template #button="{ isOpen }">
      <button
          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <Coins class="w-5 h-5 text-gray-600 dark:text-gray-300"/>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ currencies[currentCurrency].symbol }}
        </span>
        <ChevronDown class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': isOpen }"/>
      </button>
    </template>
    <template #dropdown>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
        <button
            v-for="(currency, code) in props.currencies"
            :key="code"
            @click="handleSelectCurrency(String(code))"
            class="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{ 'bg-gray-50 dark:bg-gray-700': currentCurrency === code }"
        >
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">
            {{ currency.symbol }}
          </span>
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {{ currency.name }}
          </span>
        </button>
      </div>
    </template>
  </DropDownBase>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue'
import DropDownBase from '../base/DropDownBase.vue'
import {Coins, ChevronDown} from 'lucide-vue-next'
import type {Currencies} from '../../interfaces/CurrencyInterface.ts'

const props = defineProps<{
  currencies: Currencies;
  currentCurrency: string;
}>()

const emit = defineEmits<{
  (e: 'update:currentCurrency', newCurrency: string): void;
}>()

const handleSelectCurrency = (code: string) => {
  emit('update:currentCurrency', code)
}
</script>
