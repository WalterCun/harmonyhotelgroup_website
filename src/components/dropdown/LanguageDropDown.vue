<!-- src/components/dropdown/DropDownLanguage.vue -->
<template>
  <DropDownBase>
    <template #button="{ isOpen }">
      <button
          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <Globe2 class="w-5 h-5 text-gray-600 dark:text-gray-300"/>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ languages[currentLocale].name }}
        </span>
        <ChevronDown class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': isOpen }"/>
      </button>
    </template>
    <template #dropdown>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
        <button
            v-for="(lang, code) in props.languages"
            :key="code"
            @click="handleSelectLanguage(code)"
            class="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{ 'bg-gray-50 dark:bg-gray-700': currentLocale === code }"
        >
          <img :src="lang.flag" :alt="lang.name" class="w-5 h-5 rounded-sm object-cover"/>
          <span class="text-sm text-gray-700 dark:text-gray-300">
            {{ lang.name }}
          </span>
        </button>
      </div>
    </template>
  </DropDownBase>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue'
import DropDownBase from '../base/DropDownBase.vue'
import {Globe2, ChevronDown} from 'lucide-vue-next'
import {Languages} from '../interfaces/LanguagesInterface.ts'

const props = defineProps<{
  languages: Languages;
  currentLocale: string;
}>()

const emit = defineEmits<{
  (e: 'update:currentLocale', newLocale: string): void;
}>()

const handleSelectLanguage = (code: string) => {
  emit('update:currentLocale', code)
}
</script>
