<template>
  <div id="app">
    <Nav /> <!-- Your navigation component -->
    <Chat />
    <div v-if="isLogin">
      <FileUpload /> <ExamInfo /> </div>
    <router-view></router-view> <!-- Routed components will be displayed here -->
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Chat from '@/components/Chat.vue'

export default {
  name: 'App',
  components: { Nav, Chat }
}
</script>
