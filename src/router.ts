import {createRouter, createWebHistory} from 'vue-router'
import Home from './pages/Home.vue'
import Hotels from './pages/Hotels.vue'
import Tours from './pages/Tours.vue'
import Offers from './pages/Offers.vue'
import Contact from './pages/Contact.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/hoteles', component: Hotels},
        {path: '/tours', component: Tours},
        {path: '/ofertas', component: Offers},
        {path: '/contacto', component: Contact}
    ]
})

export default router