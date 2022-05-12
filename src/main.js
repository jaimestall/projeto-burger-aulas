import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Cria o app usando o Vue-Router, montado na div #app do arquivo HTML principal
createApp(App).use(router).mount('#app')
