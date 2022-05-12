<!--
  Views:
  Views são as páginas da aplicação, neste caso são as páginas de criação do pedidos e a lista de pedidos. Para manter a Navbar e o Footer fixos, alterando apenas o conteúdo principal é colocada a tag <router-link to="/"></router-link> onde se deseja navegar pela aplicação. Esta tag, neste exemplo, encontra-se no arquivo Navbar.vue e sua descrição é mais detalhada lá.
-->
<template>
  <!-- Chamados no template: o banner, seguido da div que contém o título e o conteúdo do formulário de envio dos pedidos para o servidor -->
  <Banner />
  <div class="main-container">
    <h1>Monte o seu burger</h1>
    <BurgerForm />
  </div>
</template>

<script>
/* 
Aqui é importado o componente utilizado.
OBS: a notação ../ para acessar o diretório do arquivo Dashboard.vue é entendida como "voltar um diretório" visto que o diretório onde se encontra o arquivo desejado (Dashboard.vue) está uma pasta antes da pasta em que se encontra este arquivo (/views)
*/
import Banner from "../components/Banner.vue";
import BurgerForm from "../components/BurgerForm.vue";

export default {
  /* A nomeação dos componentes é facultativa, mas, para organização do código e como boas práticas para maior entendimento do código, é recomendada a utilização */
  name: "Home",
  /* Component importado dentro do <script> e chamado no <template> */
  components: {
    Banner,
    BurgerForm,
  },
};
</script>

<style scoped>
/* Tag <style> com atributo scoped para estilização pontual DO COMPONENTE */
</style>
