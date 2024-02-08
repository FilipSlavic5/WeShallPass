<template>
  <div class="avatar" :class="{ 'bg-gray-300': !src }">
    <!-- Display initials if src is not provided -->
    <span v-if="!src" class="text-white text-xs font-semibold">
      {{ getInitials() }}
    </span>
    <!-- Display image if src is provided -->
    <img v-else :src="src" alt="User Avatar" />
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: '' },
    name: { type: String, default: '' },
    familyName: { type: String, default: '' }, // Add a prop for family name
  },
  methods: {
    getInitials() {
      // Generate initials from name and familyName
      const initials = `${this.name.charAt(0)}${this.familyName.charAt(0)}`;
      return initials.toUpperCase();
    },
  },
};
</script>

<style scoped>
.avatar {
  /* Add your avatar styles here */
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #3490dc; /* You can customize the background color */
}

/* Additional styles for the initials */
.avatar span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
