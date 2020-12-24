<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="primary">
          <router-link tag="span" to="/login">
            <v-icon>mdi-lock-open</v-icon>
            Login
          </router-link>
      </v-btn>

      

    </v-app-bar>
  </div>
</template>

<script>
export default {
    name:"Nav",
    data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        // { title: "LandingPage", path: "/", icon: "home" },
        { title: "Register", path: "/register", icon: "face" },
        { title: "Login", path: "/login", icon: "lock_open" },
      ],
    };
  },
}
</script>

<style scoped>

</style>