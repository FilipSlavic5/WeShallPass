<template>
  <div style="z-index:999">
    <form @submit.prevent="registerUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4" style="z-index: 999;">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input v-model="name" type="text" id="name" placeholder="Your Name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label for="familyName" class="block text-gray-700 text-sm font-bold mb-2">Family Name:</label>
        <input v-model="familyName" type="text" id="familyName" placeholder="Your Family Name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input v-model="email" type="email" id="email" placeholder="Your Email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
        <input v-model="username" type="text" id="username" placeholder="Your Username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input v-model="password" type="password" id="password" placeholder="Your Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </div>
    </form>
  </div>
  </template>
  
  <script>
  import { useAuth } from '@/firebase';
  
  export default {
    data() {
      return {
        name: '',
        familyName: '',
        email: '',
        username: '',
        password: '',
      };
    },
    methods: {
      async registerUser() {
        const { name, familyName, email, username, password } = this;
  
        try {
          // Call the register function from useAuth to register the user
          await useAuth().registerUser(name, familyName, email, username, password);
  
          // Registration successful, you can redirect to another page
          // For example, you can use Vue Router to navigate to the login page
          this.$emit('close-registration-form');
          this.$emit('registration-success');
        
          
        } catch (error) {
          console.error('Error registering user:', error);
          // Handle registration error (display error message, etc.)
        }
      },
    },
  };
  </script>
  
 
  