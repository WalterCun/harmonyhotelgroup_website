<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-2xl font-serif text-white mb-4">
            <span class="text-gold-600">Harmony</span>Hotel Group
          </h3>
          <p class="text-sm leading-relaxed mb-4">
            {{ $t('footer.about') }}
          </p>
          <div class="flex space-x-4">
            <a v-for="social in socials"
               :key="social.name"
               :href="social.url"
               :aria-label="social.name"
               class="hover:text-gold-600 transition-colors"
               target="_blank"
               rel="noopener noreferrer">
              <component :is="social.icon" class="w-5 h-5"/>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">{{ $t('footer.quickLinks') }}</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.key">
              <router-link :to="link.to" class="hover:text-gold-600 transition-colors">
                {{ $t(`footer.links.${link.key}`) }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- FAQ -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">{{ $t('footer.faq.title') }}</h4>
          <ul class="space-y-2">
            <li v-for="faq in faqs" :key="faq" class="text-sm">
              <router-link to="/faq" class="hover:text-gold-600 transition-colors">
                {{ $t(`footer.faq.${faq}`) }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">{{ $t('footer.contact.title') }}</h4>
          <ul class="space-y-3">
            <li class="flex items-center gap-2">
              <Phone class="w-4 h-4 text-gold-600"/>
              <span>+1 (555) 123-4567</span>
            </li>
            <li class="flex items-center gap-2">
              <Mail class="w-4 h-4 text-gold-600"/>
              <a href="mailto:info@harmonyhotelgroup.com" class="hover:text-gold-600 transition-colors">
                info@harmonyhotelgroup.com
              </a>
            </li>
            <li class="flex items-center gap-2">
              <MapPin class="w-4 h-4 text-gold-600"/>
              <span>{{ $t('footer.contact.address') }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-500">
          © {{ new Date().getFullYear() }} Harmony Hotel Group. {{ $t('footer.rights') }}
        </p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <a v-for="legal in legalLinks"
             :key="legal"
             href="#"
             class="text-sm text-gray-500 hover:text-gold-600 transition-colors">
            {{ $t(`footer.legal.${legal}`) }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin} from 'lucide-vue-next'

const socials = [
  {name: 'Facebook', icon: Facebook, url: 'https://facebook.com'},
  {name: 'Instagram', icon: Instagram, url: 'https://instagram.com'},
  {name: 'Twitter', icon: Twitter, url: 'https://twitter.com'},
  {name: 'YouTube', icon: Youtube, url: 'https://youtube.com'}
]

const quickLinks = [
  {key: 'home', to: '/'},
  {key: 'hotels', to: '/hoteles'},
  {key: 'tours', to: '/tours'},
  {key: 'offers', to: '/ofertas'},
  {key: 'contact', to: '/contacto'}
]

const faqs = [
  'booking',
  'cancellation',
  'payment',
  'checkin',
  'services'
]

const legalLinks = [
  'privacy',
  'terms',
  'cookies'
]
</script>