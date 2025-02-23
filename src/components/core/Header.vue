<template>
  <header class="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo y nombre (texto oculto en móviles) -->
      <router-link to="/" class="text-2xl font-serif text-gray-800 dark:text-white flex items-center gap-2">
        <LogoHarmony class="block md:hidden w-30 h-30"/>
        <span class="hidden md:block">
          <span class="text-gold-600">Harmony</span>Hotel Group
        </span>
      </router-link>

      <!-- Navegación y opciones del header para pantallas grandes -->
      <div class="hidden md:flex items-center gap-8">
        <nav class="flex items-center gap-8">
          <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {{ $t(`nav.${item.key}`) }}
          </router-link>
        </nav>
        <div class="flex items-center gap-4">
          <!-- Language Selector -->
          <LanguageDropDown
              :languages="languages"
              :currentLocale="currentLocale"
              @update:currentLocale="currentLocale = $event"
          />
          <!-- Currency Selector -->
          <CurrencyDropDown
              :currencies="currencies"
              :currentCurrency="currentCurrency"
              @update:currentCurrency="currentCurrency = $event"
          />
          <!-- Dark Mode Toggle -->
          <button @click="toggleDark" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Sun v-if="isDark" class="w-5 h-5 text-gray-600 dark:text-gray-300"/>
            <Moon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300"/>
          </button>
          <!-- Booking Button -->
          <button class="bg-gold-600 text-white px-6 py-2 rounded-full hover:bg-gold-700 transition-colors">
            {{ $t('nav.book') }}
          </button>
        </div>
      </div>

      <!-- Botón Menú Hamburguesa: Visible en móviles -->
      <button @click="isMenuOpen = !isMenuOpen"
              class="block md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <Menu class="w-6 h-6 text-gray-600 dark:text-gray-300"/>
      </button>
    </div>

    <!-- Menú móvil: se muestra cuando isMenuOpen es true -->
    <div v-if="isMenuOpen" data-mobile-menu class="md:hidden">
      <div class="bg-white dark:bg-gray-900 p-4 shadow-md">
        <div class="flex justify-end">
          <button @click="isMenuOpen = false"
                  class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X class="w-6 h-6 text-gray-600 dark:text-gray-300"/>
          </button>
        </div>
        <!-- Navegación móvil -->
        <nav class="mt-4 space-y-4">
          <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              @click="isMenuOpen = false"
              class="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {{ $t(`nav.${item.key}`) }}
          </router-link>
        </nav>
        <!-- Opciones adicionales en el menú móvil -->
        <div class="mt-4 space-y-4">
          <!-- Language Selector Móvil -->
          <div>
            <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Language</p>
            <LanguageDropDown
                :languages="languages"
                :currentLocale="currentLocale"
                @update:currentLocale="(code:string) => { currentLocale = code; isMenuOpen = false }"
            />
          </div>
          <!-- Currency Selector Móvil -->
          <div>
            <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Currency</p>
            <CurrencyDropDown
                :currencies="currencies"
                :currentCurrency="currentCurrency"
                @update:currentCurrency="(code:string) => { currentCurrency = code; isMenuOpen = false }"
            />
          </div>
          <!-- Dark Mode Toggle Móvil -->
          <div>
            <button @click="toggleDark; isMenuOpen = false"
                    class="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <span class="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
              <span v-if="isDark">
                <Sun class="w-5 h-5 text-gray-600 dark:text-gray-300"/>
              </span>
              <span v-else>
                <Moon class="w-5 h-5 text-gray-600 dark:text-gray-300"/>
              </span>
            </button>
          </div>
          <!-- Booking Button Móvil -->
          <div>
            <router-link to="/booking" @click="isMenuOpen = false"
                         class="block bg-gold-600 text-white text-center px-6 py-2 rounded-full hover:bg-gold-700 transition-colors">
              {{ $t('nav.book') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {ref, watch, onMounted, onUnmounted} from 'vue'
import {useI18n} from 'vue-i18n'
import {Sun, Moon, Menu, X} from 'lucide-vue-next'
import {useDarkMode} from '../../utils/useDarkMode'
import LogoHarmony from '../../assets/LogoHarmony.vue'
import CurrencyDropDown from '../dropdown/CurrencyDropDown.vue'
import LanguageDropDown from '../dropdown/LanguageDropDown.vue'

// Estados para dropdowns y menú móvil
const isMenuOpen = ref(false)

const {locale} = useI18n()
const currentLocale = ref(locale.value)
const currentCurrency = ref('USD')
const {isDark, toggleDark} = useDarkMode()

const navItems: any = [
  // {path: '/hoteles', key: 'hotels'},
  // {path: '/tours', key: 'tours'},
  // {path: '/ofertas', key: 'offers'},
  // {path: '/contacto', key: 'contact'}
]

const languages = {
  es: {name: 'Español', flag: 'https://flagcdn.com/w40/es.png'},
  en: {name: 'English', flag: 'https://flagcdn.com/w40/gb.png'}
}

const currencies = {
  USD: {name: 'US Dollar', symbol: 'USD'},
  EUR: {name: 'Euro', symbol: 'EUR'},
  MXN: {name: 'Peso Mexicano', symbol: 'MXN'}
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative') && !target.closest('[data-mobile-menu]')) {
    // Aquí podrías cerrar dropdowns globalmente si es necesario
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(currentLocale, (newLocale) => {
  locale.value = newLocale
})
</script>
