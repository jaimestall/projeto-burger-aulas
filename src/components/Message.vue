<template>
  <!-- Componente de mensagem. 
Aqui é usado da maneira mais simples possível a exibição de uma mensagem de forma dinâmica. E é a primeira vez que eu uso props no projeto. 
Uma props é passada do componente pai para o componente filho, na hora em que se chama o component filho, dentro do template.
-->
  <div class="message-container">
    <!-- Chamado dinâmico da mensagem pela props declarada no export default -->
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  // Nome do component facultativo, mas recomendado como uma boa prática
  name: "Message",
  // Props são dados enviados do component pai para o component filho. É necessário descrever o tipo do dado (Nesse caso String).
  props: {
    msg: String,
  },
};
</script>

<style scoped>
/* Estilização do visor da mensagem do sistema */
.message-container {
  color: #004085;
  background-color: #cce5ff;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
</style>
