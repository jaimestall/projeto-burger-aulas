<!-- 
  Componente root, principal da aplicação. 
    <template>
    No template dele é passado o component de Navbar e Footer, além das rotas com <router-view />. 
    Na chamada do componente Navbar são passados os dados "logo" e "alt" pelo v-bind, que serão usados na tag <img> do template filho.
    <script>
    No script, por primeiro é feita a importação dos Components filhos do Root (Navbar e Footer). Em seguida, no "export default" tem o chamado dos components importados e a declaração dos dados que serão utilizados no template (nesse caso serão passados aos filhos pelo v-bind).
    <style>
    No style tem-se a estilização geral do projeto, uma vez que o componente root será base para todos os outros componentes. Quaisquer estilizações específicas exclusivamente para componentes filhos devem ser passadas, nos seus respectivos componentes, com o atributo 'scoped'.
-->
<template>
  <Navbar :logo="logo" :alt="alt" />
  <!-- Mais informações sobre o Vue-router e <router-view> nos próximos components -->
  <router-view />
  <Footer />
</template>

<script>
// Importa os components (Navbar.vue e Footer.vue) da pasta components, que está na mesma pasta deste arquivo (App.vue)
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  // Components, além de importados dentro do script devem ser exportados para serem utilizados no <template>.
  components: {
    Navbar,
    Footer,
  },
  // data() {return{}} é onde serão inseridos os dados, dinamica ou manualmente, para serem utilizados no template (e também nos components filhos).
  data() {
    return {
      logo: "/img/logo.png",
      alt: "Project Logo",
    };
  },
};
</script>

<style>
/* Estilização geral do projeto */

/* Remoção dos estilos pre-estabelecidos pelo navegador e declaração da fonte do projeto */
* {
  font-family: Helvetica;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* Margem e altura mínima do conteúdo principal */
.main-container {
  margin: 50px;
  min-height: 250px;
}
/* Estilização geral de títulos do projeto */
h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}
</style>
