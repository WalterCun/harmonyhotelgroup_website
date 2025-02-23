import {createApp} from 'vue'

import router from './router'
import i18n from './i18n'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import './index.css'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(PrimeVue);
app.mount('#app')