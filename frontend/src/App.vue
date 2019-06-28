<template>
  <div class="app" :class="{'hide-all' : !visible}" >
    <Header title="iPet" :visivel="visible" /><!--Cabeçalho-->
    <Menu :visivel="visible" />
    <Content />
    <Footer :visivel="visible" />
  </div>
</template>

<script>
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Footer from "./components/template/Footer";
import Content from './components/template/Content'

import { mapState } from "vuex";

export default {
  components: { Header, Menu, Footer, Content },
  computed: mapState(['visible'])
}
</script>

<style>

body{
  background: rgb(121, 121, 121);
}

.app {
  height: 100vh;;
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas: 
              'header header'
              'menu content'
              'menu footer'
}

.hide-all{
   height: 100vh;;
  display: grid;
  grid-template-columns:  1fr;
  grid-template-rows:  1fr ;
  grid-template-areas: 
              'content'
              
              
}

@media screen and (max-width: 650px) {
  .app {
    height: 100vh;;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 40px 1fr 40px;
    grid-template-areas: 
                'header '
                'menu '
                'content'
                'footer'
  }

  .aside {
    flex-direction: row;
  }
}


</style>