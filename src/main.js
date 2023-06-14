import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'video.js/dist/video-js.css'

axios.defaults.baseURL = 'https://justwatch-production.up.railway.app/'
const app = createApp(App)
app.use(router)
app.mount('#app')
