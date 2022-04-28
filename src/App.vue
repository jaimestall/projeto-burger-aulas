<template>
  <Navbar :logo="logo" :alt="alt" />
  <router-view />
  <Footer />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      logo: "/img/logo.png",
      alt: "Project Logo",
    };
  },
};
</script>

<style>
* {
  font-family: Helvetica;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.main-container {
  margin: 50px;
  min-height: 250px;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}
</style>
