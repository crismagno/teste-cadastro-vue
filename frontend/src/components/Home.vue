<template>
  <div class="home">
    <Header title="iPet" :email="user.email" /><!--Cabeçalho-->
    <Nav />
    <Content />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "./template/Header";
import Nav from "./template/Nav";
import Footer from "./template/Footer";
import Content from './template/Content'


import { mapState } from "vuex";
import axios from "axios";
import { showError, userKey, baseApiURL } from "../config/global";

export default {
  components: { Header, Nav, Footer, Content },
  data: function() {
    return {
      
    };
  },
  // computed: mapState(["user"]),
  // methods: {
  //     async validateToken() {
  //       this.validatingToken = true;

  //       const json = localStorage.getItem(userKey);
  //       const userData = JSON.parse(json);
  //       this.$store.commit("setUser", null);

  //       if (!userData) {
  //           this.validatingToken = false;
  //           this.$router.push({ name: "auth" });
  //           return;
  //       }

  //       const res = await axios.post(`${baseApiURL}/validateToken`, userData);

  //       if (res.data) {
  //           this.$store.commit("setUser", userData);
  //       } else {
  //           localStorage.removeItem(userKey);
  //           this.$router.push({ name: "auth" });
  //       }

  //       this.validatingToken = false;
  //   },

  // },

  // created() {
  //   this.validateToken();  
  // }
  
}
</script>

<style>

.home {
  height: 100vh;;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas: 
              'header header'
              'nav content'
              'nav footer'
}

</style>

