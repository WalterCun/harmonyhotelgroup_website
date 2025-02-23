<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section
        class="relative h-screen bg-cover bg-center"
        :style="{
        backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)'
      }"
    >
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white space-y-6 px-4">
          <h1 class="text-5xl md:text-6xl font-serif font-light">
            {{ $t('hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            {{ $t('hero.subtitle') }}
          </p>
        </div>
      </div>

      <!-- Booking Search Bar -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl">
        <div class="mx-4 bg-white rounded-lg shadow-xl p-6">
          <div class="grid md:grid-cols-4 gap-4">
            <div class="space-y-2">
              <label class="text-sm text-gray-600 flex items-center gap-2">
                <Calendar class="w-4 h-4"/>
                {{ $t('search.checkIn') }}
              </label>
              <input
                  type="date"
                  v-model="checkIn"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-600 flex items-center gap-2">
                <Calendar class="w-4 h-4"/>
                {{ $t('search.checkOut') }}
              </label>
              <input
                  type="date"
                  v-model="checkOut"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-600 flex items-center gap-2">
                <Users class="w-4 h-4"/>
                {{ $t('search.adults') }}
              </label>
              <select
                  v-model="adults"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option v-for="n in 6" :key="n" :value="n">
                  {{ n }} {{ n === 1 ? $t('search.adult') : $t('search.adults_plural') }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-600 flex items-center gap-2">
                <Baby class="w-4 h-4"/>
                {{ $t('search.children') }}
              </label>
              <select
                  v-model="childrenCount"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="0">{{ $t('search.noChildren') }}</option>
                <option v-for="n in 4" :key="n" :value="n">
                  {{ n }} {{ n === 1 ? $t('search.child') : $t('search.children_plural') }}
                </option>
              </select>
            </div>
          </div>

          <!-- Children Ages -->
          <div v-if="childrenCount > 0" class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(_, index) in childrenAges" :key="index" class="space-y-2">
              <label class="text-sm text-gray-600">
                {{ $t('search.childAge') }} {{ index + 1 }}
              </label>
              <select
                  v-model="childrenAges[index]"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option v-for="age in 17" :key="age" :value="age">
                  {{ age }} {{ $t('search.years') }}
                </option>
              </select>
            </div>
          </div>

          <div class="mt-6">
            <button
                class="w-full bg-gold-600 text-white h-12 rounded-md flex items-center justify-center gap-2 hover:bg-gold-700 transition-colors">
              <Search class="w-5 h-5"/>
              {{ $t('search.search') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-serif text-center mb-12 dark:text-white">{{ $t('benefits.title') }}</h2>
        <div class="grid md:grid-cols-4 gap-8">
          <div v-for="benefit in benefits" :key="benefit.key"
               class="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <component :is="benefit.icon" class="w-12 h-12 mx-auto mb-4 text-gold-600"/>
            <h3 class="text-xl font-semibold mb-2 dark:text-white">
              {{ $t(`benefits.${benefit.key}.title`) }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t(`benefits.${benefit.key}.desc`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Hotels Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif mb-4 dark:text-white">Nuestros Hoteles Destacados</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubre nuestras propiedades más exclusivas en destinos de ensueño
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="hotel in featuredHotels" :key="hotel.id"
               class="group relative overflow-hidden rounded-lg shadow-lg">
            <img :src="hotel.image" :alt="hotel.name"
                 class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-xl font-serif text-white mb-2">{{ hotel.name }}</h3>
              <p class="text-gray-200 text-sm mb-4">{{ hotel.location }}</p>
              <router-link :to="'/hoteles/' + hotel.id"
                           class="inline-block bg-gold-600 text-white px-4 py-2 rounded-md hover:bg-gold-700 transition-colors">
                Ver Detalles
              </router-link>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <router-link to="/hoteles"
                       class="inline-block border-2 border-gold-600 text-gold-600 px-6 py-2 rounded-md hover:bg-gold-600 hover:text-white transition-colors">
            Ver Todos los Hoteles
          </router-link>
        </div>
      </div>
    </section>

    <!-- Nearby Destinations -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif mb-4 dark:text-white">Destinos Cercanos</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explora lugares increíbles cerca de nuestros hoteles
          </p>
        </div>
        <div class="grid md:grid-cols-4 gap-6">
          <div v-for="destination in nearbyDestinations" :key="destination.id"
               class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-lg mb-4">
              <img :src="destination.image" :alt="destination.name"
                   class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"/>
            </div>
            <h3 class="text-lg font-semibold mb-2 dark:text-white">{{ destination.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ destination.description }}</p>
          </div>
        </div>
        <div class="text-center mt-8">
          <router-link to="/tours"
                       class="inline-block bg-gold-600 text-white px-6 py-2 rounded-md hover:bg-gold-700 transition-colors">
            Explorar Tours Disponibles
          </router-link>
        </div>
      </div>
    </section>

    <!-- Special Offers -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-serif mb-4 dark:text-white">Ofertas Especiales</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Aprovecha nuestras promociones exclusivas
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="offer in specialOffers" :key="offer.id"
               class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div class="flex flex-col md:flex-row">
              <img :src="offer.image" :alt="offer.title"
                   class="w-full md:w-48 h-48 object-cover"/>
              <div class="p-6 flex flex-col justify-between">
                <div>
                  <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ offer.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 mb-4">{{ offer.description }}</p>
                </div>
                <router-link to="/ofertas"
                             class="inline-block bg-gold-600 text-white px-4 py-2 rounded-md hover:bg-gold-700 transition-colors text-center">
                  Ver Oferta
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-8">
          <router-link to="/ofertas"
                       class="inline-block border-2 border-gold-600 text-gold-600 px-6 py-2 rounded-md hover:bg-gold-600 hover:text-white transition-colors">
            Ver Todas las Ofertas
          </router-link>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-serif mb-4 dark:text-white">Ubicación</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Visítanos en nuestras oficinas centrales
            </p>
          </div>

          <!-- Map -->
          <div class="mb-8 rounded-lg overflow-hidden shadow-lg">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661075404825!2d-99.16869732526424!3d19.427023041858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sAv.%20Paseo%20de%20la%20Reforma%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1709902149262!5m2!1ses!2smx"
                width="100%"
                height="400"
                style="border:0;"
                allowfullscreen="false"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

          <!-- Address and Contact Button -->
          <div class="text-center">
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Av. Paseo de la Reforma 483, Cuauhtémoc<br>
              Ciudad de México, CDMX 06500
            </p>
            <router-link to="/contacto"
                         class="inline-block bg-gold-600 text-white px-8 py-3 rounded-md hover:bg-gold-700 transition-colors">
              Enviar Mensaje
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {Calendar, Users, Search, Wifi, Utensils, MapPin, Space as Spa, Baby} from 'lucide-vue-next'

// Form data
const checkIn = ref('')
const checkOut = ref('')
const adults = ref(2)
const childrenCount = ref(0)
const childrenAges = ref<number[]>([])

// Featured hotels data
const featuredHotels = [
  {
    id: 1,
    name: 'Harmony Resort & Spa Cancún',
    location: 'Cancún, México',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 2,
    name: 'Harmony Urban Hotel CDMX',
    location: 'Ciudad de México, México',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 3,
    name: 'Harmony Beach Club Los Cabos',
    location: 'Los Cabos, México',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  }
]

// Nearby destinations
const nearbyDestinations = [
  {
    id: 1,
    name: 'Chichen Itzá',
    description: 'Maravilla del mundo maya a 2 horas de nuestro resort',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 2,
    name: 'Xcaret',
    description: 'Parque eco-arqueológico con shows y actividades',
    image: 'https://images.unsplash.com/photo-1585540083814-ea6ee1f33936?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 3,
    name: 'Tulum',
    description: 'Ruinas mayas frente al mar Caribe',
    image: 'https://images.unsplash.com/photo-1504730030853-eff311f57d3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 4,
    name: 'Isla Mujeres',
    description: 'Paradisíaca isla con playas cristalinas',
    image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  }
]

// Special offers
const specialOffers = [
  {
    id: 1,
    title: 'Escapada Romántica',
    description: 'Incluye cena romántica, spa para parejas y late check-out',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  },
  {
    id: 2,
    title: 'Paquete Familiar',
    description: 'Niños gratis y actividades incluidas para toda la familia',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  }
]

// Watch for children ages
watch(childrenCount, (newCount) => {
  const count = Number(newCount)
  if (count > childrenAges.value.length) {
    childrenAges.value = [
      ...childrenAges.value,
      ...Array(count - childrenAges.value.length).fill(0)
    ]
  } else {
    childrenAges.value = childrenAges.value.slice(0, count)
  }
})

const benefits = [
  {icon: Wifi, key: 'wifi'},
  {icon: Utensils, key: 'dining'},
  {icon: MapPin, key: 'location'},
  {icon: Spa, key: 'spa'}
]
</script>