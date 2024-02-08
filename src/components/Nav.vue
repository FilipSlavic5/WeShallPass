<template>
  <nav>
    <div>
      <h1><strong>WeShallPass</strong></h1>
      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>
      <div v-else>
        <!-- Register button -->
        <router-link to="/register">
          <button class="bg-green-500 hover:bg-green-600" style="margin: 5px;">
            Register
          </button>
        </router-link>

        <!-- Sign In button -->
        <button class="bg-green-500 hover:bg-green-600" @click="toggleSignInModal">
          Sign In
        </button>
        
        <!-- Conditionally render the SignInModal component -->
        <SignInModal v-if="showSignInModal" />
      </div>
    </div>
  </nav>
</template>

<script>
import Avatar from './Avatar.vue';
import { useAuth } from '@/firebase';
import SignInModal from './SignInModal.vue'; // Import the SignInModal component
import { ref } from 'vue';

export default {
  components: {
    Avatar,
    SignInModal, // Include the SignInModal component
  },
  setup() {
    const { user, isLogin, signOut } = useAuth();

    // Add a reactive variable to control modal visibility
    const showSignInModal = ref(false);

    const toggleSignInModal = () => {
      showSignInModal.value = !showSignInModal.value;
    };

    return { user, isLogin, signOut, showSignInModal, toggleSignInModal };
  },
};
</script>
