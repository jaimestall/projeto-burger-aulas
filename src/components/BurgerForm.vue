<!-- Components são basicamente todos os arquivos .vue. O arquivo Root da aplicação App.vue, as views Home.vue e Pedidos.vue TAMBÉM são components. Components são tudo que, como diz no nome, copõem a parte visual do sistema. Components podem ser utilizados e reutilizados em quaisquer <template> dentro da aplicação, desde que sejam importados no <script> e devidamente exportados pelo export default -->
<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burger-form" @submit="createBurger">
        <div class="input-container">
          <label for="nome"> Nome do cliente </label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            placeholder="Digite o seu nome"
          />
        </div>
        <div class="input-container">
          <label for="pao"> Selecione o pão </label>
          <select name="pao" id="pao" v-model="pao">
            <option value="">Selecione o seu pão</option>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
              {{ pao.tipo }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="carne"> Selecione a carne </label>
          <select name="carne" id="carne" v-model="carne">
            <option value="">Selecione a carne</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
              {{ carne.tipo }}
            </option>
          </select>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="opcionais">
            Selecione os opcionais
          </label>
          <div
            class="checkbox-container"
            v-for="opcional in opcionaisData"
            :key="opcional.id"
            :value="opcional.tipo"
          >
            <input
              type="checkbox"
              name="opcionais"
              v-model="opcionais"
              :value="opcional.tipo"
            />
            <span>
              {{ opcional.tipo }}
            </span>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Criar meu Burger!" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// Importação do arquivo Message.vue, enviado no export default e utilizado no <template> deste component
import Message from "./Message.vue";

export default {
  // Nomeação do component
  name: "BurgerForm",

  // Declaração dos components que serão utilizados no <template>
  components: {
    Message,
  },

  // Iniciação dos dados que serão utilizados para popular os campos em algum momento da aplicação
  data() {
    return {
      nome: "",
      paes: null,
      carnes: null,
      opcionaisData: null,
      nome: null,
      pao: null,
      carne: null,
      opcionais: [],
      msg: null,
    };
  },
  // Métodos (funções) que serão utilizados dentro da aplicação. ps: métodos declarados neste component só poderão ser utilizados neste component. Caso contrário devem  ser enviados ao component pai através do método $emit

  methods: {
    // Função para trazer ingredientes do banco de dados artificial (http://localhost:3000/ingredientes)
    async getIngredients() {
      // Cria requisição para trazer dados da url passada como parametro da função fetch('url')
      const req = await fetch("http://localhost:3000/ingredientes");

      // Transforma o resultado da requisição req em um dado no formato JSON
      const data = await req.json();

      // Atribui ao dado paes (do data-return do component) o valor que veio da requisição e foi transformado em JSON
      this.paes = data.paes;

      // Atribui ao dado carnes (do data-return do component) o valor que veio da requisição e foi transformado em JSON
      this.carnes = data.carnes;

      // Atribui ao dado opcionaisData (do data-return do component) o valor que veio da requisição e foi transformado em JSON
      this.opcionaisData = data.opcionais;
    },
    // Função para enviar o formulário preenchido e criar no banco de dados o hamburger solicitado
    async createBurger(e) {
      // O método preventDefault() impede que um botão do tipo ="submit" realize sua função final, que é enviar os dados para um servidor. Isso é feito para que você possa tratar os dados antes deste envio, como faremos dentro da função.
      e.preventDefault();

      // Objeto no formato JSON que informa quais foram as opções escolhidas pelo usuário no formulário
      const dadosEnviados = {
        nome: this.nome,
        carne: this.carne,
        pao: this.pao,
        opcionais: Array.from(this.opcionais),
        status: "Solicitado",
      };

      // Transforma o objeto dadosEnviados em uma string
      const dadosEnviadosJson = JSON.stringify(dadosEnviados);

      // Cria requisição para enviar (method: POST) dados para a url passada como parametro da função fetch('url')
      const req = await fetch("http://localhost:3000/burgers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosEnviadosJson,
      });

      // Transforma a requisição em JSON
      const res = await req.json();

      // Mensagem do sistema para informar status do envio do pedido
      this.msg = `Pedido nº ${res.id} realizado com sucesso!`;

      // Cria um temporizador para remover a mensagem de status do envio do pedido
      setTimeout(() => {
        this.msg = "";
      }, 5000);
      // Limpa os campos do formulário depois de feito o envio
      this.nome = "";
      this.carnes = "";
      this.pao = "";
      this.opcionais = "";
    },
  },
  // Parte do life cycle hook. É a ordem em que a aplicação é gerada. As funções dentro de mounted() são executadas no momento em que o component é montado completamente.
  mounted() {
    this.getIngredients();
  },
};
</script>

<style scoped>
/* Estilização pontual do componente. Dentro de uma tag <style scoped> só será feita a estilização deste componente */

/* Tratamento do formulário da aplicação. Centraliza o formulario com margin: 0 auto e estabelece 400px no máximo para a largura */
#burger-form {
  margin: 0 auto;
  max-width: 400px;
}

/* Estabelece display: flex para os itens da classe input-container e os ordena em coluna, ficando em ordem de cima para baixo. Além disso acrescenta uma margin abaixo para separação */
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

/* Trata o texto, a margem e o padding das labels do formulário e cria a decoração com a borda da esquerda como um detalhe em amarelo */
label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

/* Tratamento para colocar padding e largura nos inputs e selects do formulário */
input,
select {
  padding: 5px 10px;
  width: 300px;
}

/* Atribui direção de linha para os itens opcionais e faz com que eles quebrem ao atingirem a largura máxima pré estabelecida (400px) */
#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

/* Dá ao título a largura de 100% para que ele não apareça como um item da lista de opcionais */
#opcionais-title {
  width: 100%;
}

/* Coloca todos os checkbox como display flex, alinha-os para que comecem à esquerda, coloca largura máxima 50% para que fiquem 2 por linha e acrescenta uma margem abaixo de 20px para separação estética */
.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

/* Coloca nas tags span e input de dentro do checkbox-container a largura automatica */
.checkbox-container span,
.checkbox-container input {
  width: auto;
}

/* Estabelece para o span dos checkbox-container uma margin à esquerda (para se afastar do checkbox propriamente dito) e coloca os textos em negrito */
.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

/* Estiliza o botão de submit, colocando cor de fundo, modificando a cor, tamanho e tipo do texto, acrescenta borda, padding, margin, altera o cursor para pointer no momento em que o usuário posicione o mouse sobre ele e acrescenta o :hover para que, ao mover o mouse sobre o botão, alterar a cor do fundo e a cor das letras */
.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
