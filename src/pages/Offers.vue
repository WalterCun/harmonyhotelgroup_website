<template>
  <div class="pt-20 min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative h-[40vh] bg-cover bg-center"
             :style="{
               backgroundImage: 'url(https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)'
             }">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-4xl md:text-5xl font-serif mb-4">Ofertas Especiales</h1>
          <p class="text-xl max-w-2xl mx-auto">
            Descubre nuestras promociones exclusivas y vive experiencias inolvidables
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Offers -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="offer in featuredOffers" :key="offer.id"
               class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div class="relative">
              <img :src="offer.image" :alt="offer.title"
                   class="w-full h-64 object-cover"/>
              <div class="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full">
                <span class="font-bold">{{ offer.discount }}% OFF</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-serif mb-2 dark:text-white">{{ offer.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ offer.description }}</p>
              <div class="space-y-4">
                <div class="flex flex-wrap gap-2">
                  <span v-for="inclusion in offer.includes" :key="inclusion"
                        class="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                    {{ inclusion }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-sm text-gray-500 line-through">${{ offer.originalPrice }}</span>
                    <span class="text-2xl font-bold text-gold-600 ml-2">${{ offer.discountedPrice }}</span>
                  </div>
                  <button class="bg-gold-600 text-white px-6 py-2 rounded-md hover:bg-gold-700 transition-colors">
                    Reservar Ahora
                  </button>
                </div>
                <p class="text-sm text-gray-500">
                  Válido hasta: {{ offer.validUntil }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Deals -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-serif text-center mb-12 dark:text-white">Paquetes Especiales</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="deal in specialDeals" :key="deal.id"
               class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <component :is="deal.icon" class="w-12 h-12 text-gold-600 mb-4"/>
            <h3 class="text-xl font-serif mb-2 dark:text-white">{{ deal.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ deal.description }}</p>
            <ul class="space-y-2 mb-6">
              <li v-for="benefit in deal.benefits" :key="benefit"
                  class="flex items-center gap-2">
                <Check class="w-4 h-4 text-gold-600"/>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ benefit }}</span>
              </li>
            </ul>
            <button class="w-full bg-gold-600 text-white py-2 rounded-md hover:bg-gold-700 transition-colors">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 class="text-2xl font-serif mb-4 dark:text-white">¿No encontraste lo que buscabas?</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Suscríbete a nuestro newsletter y recibe ofertas exclusivas directamente en tu correo
          </p>
          <form class="flex gap-4 max-w-md mx-auto">
            <input
                type="email"
                placeholder="Tu correo electrónico"
                class="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            />
            <button class="bg-gold-600 text-white px-6 py-2 rounded-md hover:bg-gold-700 transition-colors">
              Suscribirse
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {Heart, Users, Sparkles, Check} from 'lucide-vue-next'

const featuredOffers = [
  {
    id: 1,
    title: 'Escapada Romántica en Los Cabos',
    description: 'Celebra el amor con una experiencia única frente al mar en nuestro resort de lujo.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    discount: 30,
    originalPrice: 850,
    discountedPrice: 595,
    includes: ['Cena romántica', 'Spa para parejas', 'Champagne', 'Late check-out'],
    validUntil: '31 de Diciembre, 2024'
  },
  {
    id: 2,
    title: 'Vacaciones Familiares en Cancún',
    description: 'La aventura perfecta para toda la familia con actividades para todas las edades.',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    discount: 25,
    originalPrice: 1200,
    discountedPrice: 900,
    includes: ['Niños gratis', 'Actividades infantiles', 'Tour a Xcaret', 'Desayuno buffet'],
    validUntil: '30 de Septiembre, 2024'
  }
]

const specialDeals = [
  {
    id: 1,
    icon: Heart,
    title: 'Luna de Miel',
    description: 'Comienza tu vida en pareja con una experiencia inolvidable.',
    benefits: [
      'Suite de lujo',
      'Cena romántica',
      'Spa para parejas',
      'Tour privado'
    ]
  },
  {
    id: 2,
    icon: Users,
    title: 'Familiar Premium',
    description: 'Diversión y comodidad para grandes y pequeños.',
    benefits: [
      'Habitación conectada',
      'Actividades infantiles',
      'Parques temáticos',
      'Pensión completa'
    ]
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'Experiencia VIP',
    description: 'El máximo lujo y exclusividad para tu estancia.',
    benefits: [
      'Suite presidencial',
      'Mayordomo personal',
      'Transfers privados',
      'Experiencias exclusivas'
    ]
  }
]
</script>