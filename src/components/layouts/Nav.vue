<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Product Gallery</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="!isLoggedIn" color="primary">
          <router-link tag="span" to="/login">
            <v-icon>mdi-lock-open</v-icon>
          </router-link>
      </v-btn>

      <v-btn v-if="isLoggedIn" @click="logout" color="primary"><v-icon>mdi-exit-to-app</v-icon>
      </v-btn>

      

    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name:"Nav",
    computed:mapGetters(["isLoggedIn"]),
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

  methods:{
    logout(){
      this.$store.dispatch("logout")
        .then((success)=>{
          // this.$swal('Successfully logout', success.message , 'success')
          console.log(success);
          this.$store.dispatch("clearProductState");
          this.$router.push('/').catch(err => (console.log(err)));
        }).catch((error)=>{
          // console.log(error);
          this.$swal('Logout unsuccessful.Please try again.', error.message , 'error')
        });
    }
  }
}
</script>

<style scoped>
.v-app-bar{
  padding: 0px 20px 0px 20px;
}
</style>