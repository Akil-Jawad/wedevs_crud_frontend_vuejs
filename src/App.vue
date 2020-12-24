<template>
  <v-app>
    <Navbar/>
    <v-main class="parent_container">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/layouts/Nav';

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
  }),
};
</script>

<style>
.parent_container{
  background: url(https://images.wallpaperscraft.com/image/code_coding_binary_code_abstract_patterns_112140_1920x1080.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow: hidden;
}
</style>
