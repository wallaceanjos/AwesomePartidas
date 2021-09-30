<script>
import Header from "./components/core/Header.vue";
import Footer from "./components/core/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<template>
  <Header></Header>
    <router-view></router-view>
  <Footer></Footer>
</template>

<style>
</style>
