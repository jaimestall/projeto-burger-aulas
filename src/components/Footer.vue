<template>
  <!-- Componente do rodapé. Propositalmente bem simples pois tem a finalidade de dar acabamento ao projeto. Podem ser incluidos links, novos components e até mesmo formularios para lista de disparos de emails e cadastros em sites, por exemplo. -->
  <footer id="footer">
    <!-- Utilização do &copy; como símbolo de marca registrada conforme normas do HTML https://www.w3schools.com/html/html_symbols.asp -->
    <p>Make Your Burger &copy; 2022</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* Estilização do rodapé. A altura varia de acordo com a tela onde se exibe, tendo um limite de 200px no máximo. */
#footer {
  height: 200px;
  background-color: #222;
  border-top: 4px solid #111;
  color: #fcba03;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
