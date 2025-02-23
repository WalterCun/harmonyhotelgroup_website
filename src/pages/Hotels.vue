<template>
  <div class="pt-20 min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative h-[40vh] bg-cover bg-center"
             :style="{
               backgroundImage: 'url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)'
             }">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-4xl md:text-5xl font-serif mb-4">Nuestros Hoteles</h1>
          <p class="text-xl max-w-2xl mx-auto">
            Descubre el lujo y el confort en nuestras exclusivas propiedades
          </p>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap gap-4 justify-center">
          <select v-model="selectedDestination"
                  class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <option value="all">Todos los destinos</option>
            <option v-for="destination in destinations" :key="destination" :value="destination">
              {{ destination }}
            </option>
          </select>
          <select v-model="selectedType"
                  class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <option value="all">Todos los tipos</option>
            <option v-for="type in hotelTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Hotels Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="hotel in filteredHotels" :key="hotel.id"
               class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
            <div class="relative">
              <img :src="hotel.image" :alt="hotel.name"
                   class="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"/>
              <div class="absolute top-4 right-4 bg-white dark:bg-gray-900 px-4 py-2 rounded-full">
                <div class="flex items-center gap-1">
                  <Star class="w-4 h-4 text-gold-600" fill="currentColor"/>
                  <span class="font-semibold">{{ hotel.rating }}/5</span>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-serif mb-2 dark:text-white">{{ hotel.name }}</h3>
              <div class="flex items-center gap-2 mb-4">
                <MapPin class="w-4 h-4 text-gold-600"/>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ hotel.location }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ hotel.description }}</p>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="amenity in hotel.amenities.slice(0, 4)" :key="amenity"
                       class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-gold-600"/>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ amenity }}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold text-gold-600">${{ hotel.price }}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">/noche</span>
                  </div>
                  <button class="bg-gold-600 text-white px-6 py-2 rounded-md hover:bg-gold-700 transition-colors">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {MapPin, Star, Check} from 'lucide-vue-next'

const selectedDestination = ref('all')
const selectedType = ref('all')

const destinations = ['Cancún', 'Los Cabos', 'Ciudad de México', 'Riviera Maya']
const hotelTypes = ['Resort', 'Urbano', 'Boutique']

const hotels = [
  {
    id: 1,
    name: 'Harmony Resort & Spa Cancún',
    location: 'Cancún',
    type: 'Resort',
    description: 'Un paraíso frente al mar Caribe con servicios de clase mundial y vistas espectaculares.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 450,
    rating: 4.8,
    amenities: ['Spa de lujo', 'Piscina infinita', 'Restaurantes gourmet', 'Playa privada', 'Club infantil', 'Gimnasio 24/7']
  },
  {
    id: 2,
    name: 'Harmony Urban Hotel CDMX',
    location: 'Ciudad de México',
    type: 'Urbano',
    description: 'Elegancia contemporánea en el corazón de la ciudad, perfecto para viajes de negocios y placer.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 280,
    rating: 4.7,
    amenities: ['Business center', 'Restaurante fusion', 'Bar en la azotea', 'Gimnasio', 'Spa urbano', 'Servicio 24h']
  },
  {
    id: 3,
    name: 'Harmony Beach Club Los Cabos',
    location: 'Los Cabos',
    type: 'Resort',
    description: 'Un oasis de lujo donde el desierto se encuentra con el mar, con impresionantes atardeceres.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 520,
    rating: 4.9,
    amenities: ['Playa privada', 'Campo de golf', 'Spa', 'Deportes acuáticos', 'Restaurantes', 'Piscinas']
  },
  {
    id: 4,
    name: 'Harmony Boutique Tulum',
    location: 'Riviera Maya',
    type: 'Boutique',
    description: 'Una joya íntima y eco-friendly en medio de la selva maya, cerca de las ruinas.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 380,
    rating: 4.8,
    amenities: ['Yoga', 'Spa holístico', 'Restaurante orgánico', 'Bicicletas', 'Tours ecológicos', 'Playa']
  },
  {
    id: 5,
    name: 'Harmony Marina Los Cabos',
    location: 'Los Cabos',
    type: 'Boutique',
    description: 'Elegante hotel boutique con vistas panorámicas a la marina y servicio personalizado.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 340,
    rating: 4.7,
    amenities: ['Vista al mar', 'Bar gourmet', 'Piscina', 'Concierge', 'Spa', 'Restaurante']
  },
  {
    id: 6,
    name: 'Harmony Palace Cancún',
    location: 'Cancún',
    type: 'Resort',
    description: 'Resort todo incluido de lujo con la mejor ubicación en la zona hotelera.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 480,
    rating: 4.9,
    amenities: ['Todo incluido', 'Spa', 'Deportes acuáticos', 'Shows nocturnos', 'Kids Club', 'Gimnasio']
  }
]

const filteredHotels = computed(() => {
  return hotels.filter(hotel => {
    const matchesDestination = selectedDestination.value === 'all' || hotel.location === selectedDestination.value
    const matchesType = selectedType.value === 'all' || hotel.type === selectedType.value
    return matchesDestination && matchesType
  })
})
</script>