import { createApp } from 'vue';
import App from './App.vue';

import router from './router'; // Import your router configuration

import './main.css'

createApp(App)
  .use(router) // Use the router
  .mount('#app');
