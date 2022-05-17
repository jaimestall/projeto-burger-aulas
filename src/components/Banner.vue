<!-- Components são basicamente todos os arquivos .vue. O arquivo Root da aplicação App.vue, as views Home.vue e Pedidos.vue TAMBÉM são components. Components são tudo que, como diz no nome, copõem a parte visual do sistema. Components podem ser utilizados, reutilizados em quaisquer <template> dentro da aplicação, deste que sejam importados no <script> e devidamente exportados pelo export default -->
<template>
  <!-- Neste template, nada além do título h1 dentro de uma div com a classe main-banner -->
  <div id="main-banner">
    <h1>Make Your Burger</h1>
  </div>
</template>

<script>
// Nota-se que neste component não é importado nenhum component

export default {
  // Nomes de componentes são facultativos. Simplesmente boas práticas e organização de código.
  name: "Banner",
};
</script>

<style scoped>
/* Estilização pontual do componente. Dentro de uma tag <style scoped> só será feita a estilização deste componente */
/* Inserção do banner (imagem localizada na pasta encontrada no endereço da url enviada no 'background-image'). Foi tratada a posição da imagem no espaço do banner, altura, e display do banner em relação ao título h1 dentro da div#main-banner */
#main-banner {
  background-image: url("../../public/img/burger.jpg");
  background-position: 0 -500px;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
/* Estilização do título do banner */
#main-banner h1 {
  color: #fff;
  text-align: center;
  font-size: 60px;
  background-color: #222;
  padding: 20px 40px;
}
</style>
