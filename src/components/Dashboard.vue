<template>
  <!-- Div contendo a tabela de pedidos feitos -->
  <div class="burger-table">
    <!-- Mensagem temporária de status do pedido, gerenciada por uma função setTimeOut(). Além disso, o conteúdo da mensagem é passado ao component filho por uma props, que será usado lá -->
    <Message :msg="msg" v-show="msg" />
    <!-- Cabeçalho da lista de pedidos -->
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#</div>
        <div>Cliente</div>
        <div>Pão</div>
        <div>Carne</div>
        <div>Opcionais</div>
        <div>Ações</div>
      </div>
    </div>
    <!-- Itens da lista de pedidos -->
    <div id="burger-table-rows">
      <!-- Primeiro uso da diretiva v-for. 
      Percorre o array "burgers" declarado no data() {return{}} e populado pela função getPedidos que utiliza a requisição fetch() da url criada como um backend artificial.
      A diretiva v-for lê item por item do array burgers[], cada objeto chamado de burger e tendo os atributos especificados no arquivo db/db.json. Como índice o v-for percorre o que estiver sendo chamado em v-bind:key, ou apenas :key.
      -->
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <!-- Exibe na div correspondente a cada ingrediente, o nome trazido do backend. A notação {{ data }} informa que o dado está sendo lido no template a partir de um dado declarado em data() {return{}} -->
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <!-- Aqui, a diretiva v-for percorre o array "opcionais" que é a lista de opcionais escolhidos pelo cliente, lá no formulário.
          A notação (item, index) ocorre para o caso de o objeto não possuir uma propriedade "id", "indice", "index" ou semelhante. Neste caso é escolhido um a um dos opcionais e atribuido a eles um 'index' oculto.
          -->
          <ul>
            <li v-for="(opcional, index) in burger.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>
        <div>
          <!-- Botão para alterar status de um pedido.
          Select contendo uma lista de status possíveis, vindos do backend ('Solicitado', 'Finalizado', 'Em produção').
          No evento @change é passada a função updateBurger() e passado $event e burger.id como parâmetros. Essa função é mais explicada na seção methods, no script deste component.
          -->
          <select
            name="status"
            class="status"
            @change="updateBurger(burger.id, $event)"
          >
            <!-- Diretiva v-for para popular opções dentro do <select> -->
            <option
              v-for="s in status"
              :key="s.id"
              :value="s.tipo"
              :selected="burger.status == s.tipo"
            >
              {{ s.tipo }}
            </option>
          </select>
          <!-- Botão para deletar o pedido da lista e atualizar com a nova lista de pedidos. -->
          <button class="delete-btn" @click="deleteBurger(burger.id)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// A importação do component Message, para utilizá-lo no <template>
import Message from "../components/Message.vue";

export default {
  // A propriedade name: é facultativa porém ajuda na organização do código e é uma boa prática para eventuais futuros programadores.
  name: "Dashboard",

  // Declaração do component que será chamado no <template>
  components: {
    Message,
  },
  data() {
    return {
      // Declaração das variáveis utilizadas no template. É uma boa prática criá-las como uma propriedade, array ou objeto nulos pois eventualmente serão substituidos pelo novo conteúdo.
      burgers: null,
      burgerId: null,
      status: [],
      msg: null,
    };
  },

  // Métodos utilizados no component
  methods: {
    // Função que cria a requisição para trazer os pedidos do backend para popular o Dashboard
    async getPedidos() {
      // Traz dados da url passada, como um objeto
      const req = await fetch("http://localhost:3000/burgers");

      // Transforma os dados recebidos pela requisição em JSON
      const data = await req.json();

      // Atribui ao dado 'burgers' exportado pelo data() {return{}} o objeto JSON
      this.burgers = data;

      // Chamado para função para popular o select de status dos pedidos. Foi feito em funções diferentes para facilitar no entendimento e elucidar melhor a função.
      this.getStatus();
    },

    // Função que insere opções no campo de alterar status do pedido
    async getStatus() {
      // Traz dados da url passada, como um objeto
      const req = await fetch("http://localhost:3000/status");

      // Transforma os dados recebidos pela requisição em JSON
      const data = await req.json();

      // Atribui à variável status o objeto JSON
      this.status = data;
    },

    async deleteBurger(id) {
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "DELETE",
      });
      const res = await req.json();
      // Insere na variável 'msg' o conteúdo da mensagem e envia por props, o valor ao component filho <Message /> 
      this.msg = `Pedido removido com sucesso!`;
      // Função de temporização para remover a mensagem de status (em milisegundos)
      setTimeout(() => {
        this.msg = "";
      }, 5000);
      this.getPedidos();
    },
    // No chamado deste método foram enviados os parâmetros $event e burger.id. O parâmetro $event
    async updateBurger(id, event) {
      const option = event.target.value;
      console.log(event);
      const dataJson = JSON.stringify({ status: option });
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
      const res = await req.json();
      // Atualiza mensagem do sistema de acordo com a resposta da requisição
      this.msg = `Pedido nº ${res.id} foi atualizado para ${res.status}!`;
      // Função de temporização para remover a mensagem de status (em milisegundos)
      setTimeout(() => {
        this.msg = "";
      }, 3000);
    },
  },

  mounted() {
    // Chamado da função getPedidos() no momento em que a página for montada.
    this.getPedidos();
  },
};
</script>

<style scoped>
/* Largura maxima do painel de pedidos */
#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}
/* Disposição das linhas e cabeçalho do painel */
#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}
/* Organização do texto do cabeçalho do painel */
#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}
/* Estabelece largura para as colunas do painel */
#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}
/* Estilização da linha que separa um pedido do outro */
.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}
/* Estilização da primeira coluna da tabela, que não tem necessidade de ser maior que 5% */
#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}
/* Estilização do select de situações para cada pedido */
select {
  padding: 12px 6px;
  margin-right: 12px;
}
/* Estilização do botão de apagar pedido */
.delete-btn {
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
/* Funcionalidade de alterar estilo do botão ao passar o mouse sobre ele */
.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
/* Remove a indicação de item em listas não-ordenadas (opcionais) */
ul {
  list-style: none;
}
</style>
