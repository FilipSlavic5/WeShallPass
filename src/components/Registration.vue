<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
    <!-- Conditionally display the RegistrationForm based on showRegistrationForm -->
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
      <button @click="closeRegistrationForm" class="close-button absolute top-0 right-0 m-4">&times;</button>
      <RegistrationForm @registration-success="handleRegistrationSuccess" v-if="showRegistrationForm" />
      <!-- Display a success message when registration is successful -->
      <div v-if="registrationSuccessful">
        <p>Registration successful!</p>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationForm from '@/components/RegistrationForm.vue';

export default {
  components: {
    RegistrationForm,
  },
  data() {
    return {
      registrationSuccessful: false,
      showRegistrationForm: true, // Add this property
    };
  },
  methods: {
    handleRegistrationSuccess() {
      // Handle the event emitted by the RegistrationForm
      // Update the data property to close the form and show success message
      this.registrationSuccessful = true;
      // Close the registration form
      this.showRegistrationForm = false;
      // Use Vue Router to navigate to the chat page
      this.$router.push({ name: 'Chat' });
    },
    closeRegistrationForm() {
      // Method to close the registration form
      this.showRegistrationForm = false;
    },
  },
};
</script>

<style scoped>
.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
