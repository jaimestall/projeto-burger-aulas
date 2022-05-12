<!--
  Views:
  Views são as páginas da aplicação, neste caso são as páginas de criação do pedidos e a lista de pedidos. Para manter a Navbar e o Footer fixos, alterando apenas o conteúdo principal é colocada a tag <router-link to="/"> onde se deseja navegar pela aplicação. Esta tag, neste exemplo, encontra-se no arquivo Navbar.vue e sua descrição é mais detalhada lá.
-->
<template>
  <!-- No template desta view é criada uma div com class main-container (estilizado no componente Root da aplicação) e nesta div é colocado um título h1 (que também estilizado na root) e o chamado para o componente filho chamado Dashboard, que será importado logo abaixo no script e enviado para o template pelo export default -->
  <div class="main-container">
    <h1>Gerenciar pedidos:</h1>
    <Dashboard />
  </div>
</template>

<script>
/* 
Aqui é importado o componente utilizado.
OBS: a notação ../ para acessar o diretório do arquivo Dashboard.vue é entendida como "voltar um diretório" visto que o diretório onde se encontra o arquivo desejado (Dashboard.vue) está uma pasta antes da pasta em que se encontra este arquivo (/views)
*/
import Dashboard from "../components/Dashboard.vue";

export default {
  /* A nomeação dos componentes é facultativa, mas, para organização do código e como boas práticas para maior entendimento do código, é recomendada a utilização */
  name: "Pedidos",
  /* Component importado dentro do <script> e chamado no <template> */
  components: {
    Dashboard,
  },
};
</script>

<style scoped>
/* Tag <style> com atributo scoped para estilização pontual DO COMPONENTE */
</style>
