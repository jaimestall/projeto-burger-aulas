<template>
  <div id="nav">
    <router-link id="nav-logo" to="/"
      ><img :src="logo" :alt="alt" id="logo"
    /></router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/pedidos">Pedidos</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["logo", "alt"],
};
</script>

<style scoped>
/* Estilização do component de navbar de maneira geral */
#nav {
  background-color: #222;
  border-bottom: 4px solid #111;
  padding: 15px 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
/* Organização do logo do projeto e disposição no canto da tela */
#nav #nav-logo {
  margin: auto;
  margin-left: 0;
}
/* Ajuste do tamanho do logo */
#logo {
  width: 40px;
  height: 40px;
}
/* Estilização dos links na barra de navegação */
#nav a {
  color: #fcba03;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
}
#nav a:hover {
  color: #fff;
}
</style>
