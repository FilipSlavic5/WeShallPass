// router.js

import { createRouter, createWebHistory } from 'vue-router';
import Chat from './components/Chat.vue'; // Import your Chat component
import Registration from './components/Registration.vue'; // Import your Registration component (if you have one)

const routes = [
    // Home route (Chat component)
    {
      path: '/',
      name: 'Chat', // You can choose a different name if needed
      component: Chat,
    },
    // Registration route (if you have one)
    {
      path: '/register',
      name: 'Register', // You can choose a different name if needed
      component: Registration,
    },
    // Add more routes if necessary
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
