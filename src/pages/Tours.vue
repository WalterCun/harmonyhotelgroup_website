<template>
  <div class="pt-20 min-h-screen bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative h-[40vh] bg-cover bg-center"
             :style="{
               backgroundImage: 'url(https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)'
             }">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-4xl md:text-5xl font-serif mb-4">Tours y Experiencias</h1>
          <p class="text-xl max-w-2xl mx-auto">
            Descubre las maravillas de México con nuestras excursiones guiadas
          </p>
        </div>
      </div>
    </section>

    <!-- Tour Categories -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-4">
          <button
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="[
              'px-6 py-2 rounded-full transition-colors',
              selectedCategory === category.id
                ? 'bg-gold-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gold-600 hover:text-white'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Tours Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="tour in filteredTours" :key="tour.id"
               class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
            <div class="relative">
              <img :src="tour.image" :alt="tour.name"
                   class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"/>
              <div class="absolute top-4 right-4 bg-white dark:bg-gray-900 px-4 py-2 rounded-full">
                <span class="font-semibold text-gold-600">${{ tour.price }}</span>
                <span class="text-sm text-gray-600 dark:text-gray-400">/persona</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-4">
                <Clock class="w-4 h-4 text-gold-600"/>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ tour.duration }}</span>
                <MapPin class="w-4 h-4 text-gold-600 ml-4"/>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ tour.location }}</span>
              </div>
              <h3 class="text-xl font-serif mb-2 dark:text-white">{{ tour.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ tour.description }}</p>
              <div class="space-y-4">
                <div class="flex flex-wrap gap-2">
                  <span v-for="feature in tour.features" :key="feature"
                        class="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                    {{ feature }}
                  </span>
                </div>
                <button class="w-full bg-gold-600 text-white py-2 rounded-md hover:bg-gold-700 transition-colors">
                  Reservar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Our Tours -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-serif text-center mb-12 dark:text-white">¿Por qué elegir nuestros tours?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="benefit in benefits" :key="benefit.title"
               class="text-center">
            <component :is="benefit.icon" class="w-12 h-12 mx-auto mb-4 text-gold-600"/>
            <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ benefit.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-serif text-center mb-12 dark:text-white">Preguntas Frecuentes</h2>
        <div class="space-y-4">
          <div v-for="faq in faqs" :key="faq.question"
               class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <button
                @click="faq.isOpen = !faq.isOpen"
                class="w-full px-6 py-4 text-left flex justify-between items-center"
            >
              <span class="font-semibold dark:text-white">{{ faq.question }}</span>
              <ChevronDown
                  :class="[
                  'w-5 h-5 transition-transform',
                  faq.isOpen ? 'rotate-180' : ''
                ]"
              />
            </button>
            <div v-show="faq.isOpen" class="px-6 pb-4">
              <p class="text-gray-600 dark:text-gray-400">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {Clock, MapPin, ChevronDown, Users, Shield, Award} from 'lucide-vue-next'

const selectedCategory = ref('all')

const categories = [
  {id: 'all', name: 'Todos'},
  {id: 'cultural', name: 'Cultural'},
  {id: 'adventure', name: 'Aventura'},
  {id: 'nature', name: 'Naturaleza'},
  {id: 'gastronomy', name: 'Gastronomía'}
]

const tours = [
  {
    id: 1,
    name: 'Tour a Chichén Itzá Deluxe',
    description: 'Explora una de las Nuevas Maravillas del Mundo con guías expertos en arqueología maya.',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 129,
    duration: '12 horas',
    location: 'Yucatán',
    category: 'cultural',
    features: ['Guía certificado', 'Almuerzo buffet', 'Transporte de lujo', 'Acceso prioritario']
  },
  {
    id: 2,
    name: 'Aventura en Xcaret',
    description: 'Disfruta de un día lleno de cultura, naturaleza y aventura en el parque más famoso de la Riviera Maya.',
    image: 'https://images.unsplash.com/photo-1585540083814-ea6ee1f33936?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 149,
    duration: 'Todo el día',
    location: 'Riviera Maya',
    category: 'adventure',
    features: ['Acceso total', 'Show nocturno', 'Snorkel', 'Buffet internacional']
  },
  {
    id: 3,
    name: 'Ruinas de Tulum y Cenotes',
    description: 'Combina historia y naturaleza visitando las ruinas mayas frente al mar y refrescantes cenotes.',
    image: 'https://images.unsplash.com/photo-1504730030853-eff311f57d3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 89,
    duration: '8 horas',
    location: 'Tulum',
    category: 'cultural',
    features: ['Guía bilingüe', 'Equipo de snorkel', 'Almuerzo', 'Fotos profesionales']
  },
  {
    id: 4,
    name: 'Tour Gastronómico CDMX',
    description: 'Descubre los sabores auténticos de la Ciudad de México en un recorrido por los mejores lugares.',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 79,
    duration: '5 horas',
    location: 'Ciudad de México',
    category: 'gastronomy',
    features: ['6 paradas', 'Degustaciones', 'Guía experto', 'Bebidas incluidas']
  },
  {
    id: 5,
    name: 'Avistamiento de Ballenas',
    description: 'Observa ballenas jorobadas en su hábitat natural durante la temporada de migración.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 99,
    duration: '4 horas',
    location: 'Los Cabos',
    category: 'nature',
    features: ['Biólogo marino', 'Snacks y bebidas', 'Equipo de seguridad', 'Fotos incluidas']
  },
  {
    id: 6,
    name: 'Aventura en la Selva',
    description: 'Tirolesas, rappel y navegación en ríos subterráneos en la selva maya.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    price: 119,
    duration: '7 horas',
    location: 'Riviera Maya',
    category: 'adventure',
    features: ['Equipo completo', 'Instructores', 'Almuerzo', 'Transporte']
  }
]

const filteredTours = computed(() => {
  if (selectedCategory.value === 'all') return tours
  return tours.filter(tour => tour.category === selectedCategory.value)
})

const benefits = [
  {
    icon: Users,
    title: 'Guías Expertos',
    description: 'Nuestros guías son profesionales certificados con amplia experiencia y conocimiento local.'
  },
  {
    icon: Shield,
    title: 'Seguridad Garantizada',
    description: 'Todos nuestros tours cumplen con los más altos estándares de seguridad y calidad.'
  },
  {
    icon: Award,
    title: 'Experiencias Únicas',
    description: 'Diseñamos cada tour para ofrecer momentos memorables y auténticos.'
  }
]

const faqs = ref([
  {
    question: '¿Qué incluye el precio del tour?',
    answer: 'Nuestros precios incluyen transporte, guía, entradas a los sitios, equipo necesario y, en la mayoría de los casos, alimentos y bebidas según lo especificado en cada tour.',
    isOpen: false
  },
  {
    question: '¿Cuál es la política de cancelación?',
    answer: 'Puedes cancelar hasta 24 horas antes del inicio del tour para un reembolso completo. Las cancelaciones posteriores no son reembolsables.',
    isOpen: false
  },
  {
    question: '¿Los tours son aptos para niños?',
    answer: 'La mayoría de nuestros tours son familiares. Cada descripción especifica la edad mínima recomendada y las restricciones aplicables.',
    isOpen: false
  },
  {
    question: '¿Qué debo llevar al tour?',
    answer: 'Recomendamos llevar ropa y calzado cómodo, protector solar, agua y cámara. Cada tour tiene requisitos específicos que se informan al momento de la reserva.',
    isOpen: false
  }
])
</script>