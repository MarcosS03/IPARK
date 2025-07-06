<script>
import HeaderGeral from '@/components/HeaderGeral.vue';
import { onBeforeMount, ref } from 'vue';

export default {
  components: {
    HeaderGeral,
  },

  setup() {
    const vagaConfig = ref({
      tipoVaga: '',
      quantidade: null,
      statuVaga: 'desocupada',
      valor: null,
      estacionamentoID: null,
      cadastroVagaID: null
    });

    const listaVagas = ref([]);
    const showNewVagaForm = ref(false); // Controla a visibilidade do formulário de nova vaga
    const showUpDateVaga = ref(false);
    const listaTipos = ref([]);
    const listaAtualizada =  ref ([]);
    const listaTipoVagaAgr = ref([]);

    const formatarValor = (valor) => {
      if (valor === null || valor === undefined) return '';
      // Garante que o valor é um número para formatar
      const num = parseFloat(valor);
      if (isNaN(num)) return '';
      return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const cadastroVaga = async () => {
      // Remove quaisquer caracteres que não sejam números ou ponto/virgula e substitui vírgula por ponto
      let valorLimpo = String(vagaConfig.value.valor).replace(',', '.');
      vagaConfig.value.valor = parseFloat(valorLimpo);

      vagaConfig.value.estacionamentoID = 1; // Ajuste conforme sua lógica de estacionamentoID

      try {
        let dadosVaga = await addvaga(vagaConfig.value);
        console.log(dadosVaga)
        if (dadosVaga) {
          alert('Vaga cadastrada!');
          listaVagas.value.push(dadosVaga);
          // Adiciona múltiplas entradas na lista de vagas se a quantidade for maior que 1
          if (dadosVaga.quantidade >= 1) {
            for (let i = 1; i <= dadosVaga.quantidade; i++) {
                vagaConfig.value.tipoVaga = dadosVaga.tipoVaga
                vagaConfig.value.quantidade = '1'
                vagaConfig.value.statuVaga = 'desocupada'
                vagaConfig.value.valor = dadosVaga.valor
                vagaConfig.value.estacionamentoID = dadosVaga.estacionamento.id;
                vagaConfig.value.cadastroVagaID = dadosVaga.id;
                console.log(vagaConfig.value)
                await addListavaga(vagaConfig.value);
                await limpaDadosVaga();
            }
          }
          await limpaDadosVaga();
          showNewVagaForm.value = false; // Fecha o formulário após cadastrar
          await lista_Vagas(); // Atualiza a lista exibida na tabela
        }

      } catch (error) {
        console.error("Erro ao cadastrar vaga:", error);
        alert("Erro ao cadastrar vaga.");
      }
    };

    const limpaDadosVaga = () => {
      vagaConfig.value.tipoVaga = '';
      vagaConfig.value.quantidade = null;
      vagaConfig.value.valor = null;
    };

    const lista_Vagas = async () => {
      try {
        let vagas = await fetch("http://localhost:8080/vaga/vagas");
        console.log(vagas)
        if (!vagas.ok) {
          throw new Error("Erro ao buscar vagas!");
        }
        listaVagas.value = await vagas.json();
      } catch (error) {
        console.error("Erro ao carregar vagas:", error);
      }
    };

    const removerVaga = async (index, vagaId) => {
      const confirmar = confirm(`Deseja realmente remover a vaga "${listaVagas.value[index].tipoVaga}"?`);
      if (!confirmar) return;

      try {
        // Primeiro, delete as vagas individuais da listaVagas do banco de dados (ListaVagas)
        const listaVagasComIdCadastro = await fetch("http://localhost:8080/ListaVagas/ListaVagas");
        const todasListaVagas = await listaVagasComIdCadastro.json();

        for (const item of todasListaVagas) {
          if (item.cadastroVagaID === vagaId) {
            await deletarListaVaga(item.id);
          }
        }

        // Em seguida, delete a vaga principal do banco de dados (vaga)
        const response = await fetch(`http://localhost:8080/vaga/${vagaId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar vaga no servidor');
        }

        // Remova da lista local após sucesso
        listaVagas.value.splice(index, 1);
        alert('Vaga removida com sucesso!');
      } catch (error) {
        console.error('Erro ao remover vaga:', error);
        alert('Não foi possível remover a vaga. Tente novamente.');
      }
    };

    let vagaId = null;
    function idVagaUpdate (id){
      showUpDateVaga.value = true;
      vagaId = id;
      console.log(vagaId)
    }
    const atualizarVaga = async () =>{
    
      // Remove quaisquer caracteres que não sejam números ou ponto/virgula e substitui vírgula por ponto
      let valorLimpo = String(vagaConfig.value.valor).replace(',', '.');
      vagaConfig.value.valor = parseFloat(valorLimpo);
      vagaConfig.value.statuVaga = 'desocupada';
      vagaConfig.value.estacionamentoID = 1; // Ajuste conforme sua lógica de estacionamentoID

      try {
        console.log(vagaId);
        let dadosVaga = await updateVaga(vagaId, vagaConfig.value);
        console.log(dadosVaga)
        if (dadosVaga) {
          
          listaVagas.value.push(dadosVaga);

          await multiplicarVaga(dadosVaga.id);
          await limpaDadosVaga();

          showUpDateVaga.value = false; // Fecha o formulário após cadastrar
          await lista_Vagas(); // Atualiza a lista exibida na tabela
        }

      } catch (error) {
        console.error("Erro ao atualizar vaga:", error);
        alert("Erro ao atualizar vaga.");
      }
    }

    async function updateVaga (id,vagaAtualizada){
        try {
          const response = await fetch(`http://localhost:8080/vaga/updateVaga/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(vagaAtualizada), // Enviando os dados atualizados
          });

          if (!response.ok) {
          throw new Error('Erro ao atualizar vaga');
          }

          const vaga = await response.json();
          console.log('Vaga atualizada com sucesso:', vaga);
          return await vaga;
      } catch (error) {
          console.error('Erro ao atualizar vaga:', error);
      }
    }
    // Funções de CRUD do backend (mantidas com poucas modificações)
    async function addvaga(novaVaga) {
      try {
        const response = await fetch(`http://localhost:8080/vaga/insert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novaVaga),
        });

        if (!response.ok) {
          throw new Error('Erro ao cadastrar vaga');
        }
        return await response.json();
      } catch (error) {
        console.error('Erro ao cadastrar vaga:', error);
        throw error; // Re-lança o erro para ser tratado por `cadastroVaga`
      }
    }
    async function getVaga(id) {
      try {
          
        const response = await fetch(`http://localhost:8080/vaga/vagas/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        
        });

        if (!response.ok) {
        throw new Error('Erro ao consultar vaga');
        }

        const vaga = await response.json();

        return vaga;
      } catch (error) {
          console.error('Erro ao cadastrar vaga:', error);
      }
    }
    async function addListavaga(novaVaga) {
        try {
            
            const response = await fetch(`http://localhost:8080/ListaVagas/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaVaga), // Enviando os dados para o banco
            });

            if (!response.ok) {
            throw new Error('Erro ao vadastrar vaga');
            }

            const vaga = await response.json();
            console.log('Vaga cadastrada com sucesso:', vaga);

            return vaga;
        } catch (error) {
            console.error('Erro ao cadastrar vaga:', error);
        }
    }
    const multiplicarVaga = async (id)=>{
        let vagas = [await getVaga(id)];

        listaTipos.value = vagas.flatMap((vagas) =>
        Array.from({ length: vagas.quantidade  }, () => vagas));

        listaAtualizada.value = listaTipos.value 
        console.log(listaAtualizada.value )

        //alimenta a lista com todas as vagas disponiveis no banco
        let lista = await fetch("http://localhost:8080/ListaVagas/ListaVagas");
        let listaVagas = await lista.json();
        console.log(listaVagas);
        const vagasComId = listaVagas.filter(vaga => vaga.cadastroVagaID === id);
        console.log(vagasComId)


        if(vagasComId.length > 0){
            for (const v of vagasComId){
                console.log(v.id)
                deletarListaVaga(v.id);
                console.log('deletando dados')
            }
            for (const i of listaAtualizada.value) {
                vagaConfig.value.tipoVaga = i.tipoVaga
                vagaConfig.value.quantidade = '1'
                vagaConfig.value.statuVaga = 'desocupada'
                vagaConfig.value.valor = i.valor
                vagaConfig.value.estacionamentoID = i.estacionamento.id;
                vagaConfig.value.cadastroVagaID = i.id;
                console.log(vagaConfig.value)
                await addListavaga(vagaConfig.value);
                await limpaDadosVaga();
                console.log('atualizando dados')
            }
        }
    }
    async function deletarListaVaga(id) {
      try {
        const response = await fetch(`http://localhost:8080/ListaVagas/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Erro ao deletar vaga da lista no servidor');
        }
      } catch (error) {
        console.error('Erro ao deletar vaga da lista:', error);
        throw error;
      }
    }

    onBeforeMount(async () => {
      await lista_Vagas();
    });

    return {
      vagaConfig,
      listaVagas,
      showNewVagaForm,
      cadastroVaga,
      limpaDadosVaga,
      removerVaga,
      formatarValor,
      atualizarVaga,
      showUpDateVaga, idVagaUpdate
    };
  }
};
</script>

<template>
  <header>
    <HeaderGeral />
  </header>
  <body style="    
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    ">
    
  <section class="body-gerenciar-vagas">
    <div class="gerenciar-vagas-container">
      <div class="header-section">
        <h2>Gerenciar Vagas</h2>
        <button class="nova-vaga-button" @click="showNewVagaForm = true">
          + Nova Vaga
        </button>
      </div>

      <div class="vagas-table-section">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vaga, index) in listaVagas" :key="vaga.id">
              <td>{{ vaga.tipoVaga }}</td>
              <td>R$ {{ formatarValor(vaga.valor) }}</td>
              <td>{{ vaga.quantidade }}</td>
              <td>
                <button class="remove-button" @click="removerVaga(index, vaga.id)"><img src="/src/assets/img/icons8-lixo-30.png" alt="icone excluir" width="30px"></button>
                <button class="atualizar-button" @click="idVagaUpdate(vaga.id)"><img src="/src/assets/img/icons8-atualizar-48.png" alt="icone atualizar" width="30px"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="cadastro-vaga-form-overlay" v-if="showNewVagaForm">
        <div class="cadastro-vaga-form">
          <h3>Cadastrar Nova Vaga</h3>
          <div class="form-row">
            <input type="text" placeholder="Tipo de vaga" v-model="vagaConfig.tipoVaga" />
          </div>
          <div class="form-row">
            <input type="text" placeholder="Valor" v-model="vagaConfig.valor" />
            <input type="number" placeholder="Quantidade" v-model="vagaConfig.quantidade" />
          </div>
          <div class="form-actions">
            <button class="cancel-button" @click="showNewVagaForm = false; limpaDadosVaga()">Cancelar</button>
            <button class="save-button" @click="cadastroVaga">Salvar</button>
          </div>
        </div>
      </div>
      <div class="cadastro-vaga-form-overlay" v-if="showUpDateVaga">
        <div class="cadastro-vaga-form">
          <h3>Cadastrar Nova Vaga</h3>
          <div class="form-row">
            <input type="text" placeholder="Tipo de vaga" v-model="vagaConfig.tipoVaga" />
          </div>
          <div class="form-row">
            <input type="text" placeholder="Valor" v-model="vagaConfig.valor" />
            <input type="number" placeholder="Quantidade" v-model="vagaConfig.quantidade" />
          </div>
          <div class="form-actions">
            <button class="cancel-button" @click="showUpDateVaga = false; limpaDadosVaga()">Cancelar</button>
            <button class="save-button" @click="atualizarVaga">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  </body>
</template>

<style scoped>

.body-gerenciar-vagas{
    font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
 
}
.gerenciar-vagas-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 38%);
  padding: 30px;
  width: 100%;
  max-width: 700px; /* Largura máxima para centralizar e não ficar muito largo */
  box-sizing: border-box;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.header-section h2 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.nova-vaga-button {
  background-color: #007bff; /* Azul similar ao da imagem */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.nova-vaga-button:hover {
  background-color: #0056b3;
}

.vagas-table-section {
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead th {
  padding: 12px 15px;
  background-color: #f8f9fa; /* Fundo leve para o cabeçalho da tabela */
  color: #666;
  font-weight: 500;
  font-size: 14px;
  border-bottom: 1px solid #dee2e6;
}

tbody td {
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
  color: #333;
  font-size: 14px;
}

tbody tr:last-child td {
  border-bottom: none;
}

.remove-button {
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: color 0.2s ease;

}

.atualizar-remove-button {
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease;
  cursor: pointer;

}
 .atualizar-remove-button img{
  border: none;
 }
/* Formulário de Nova Vaga (Modal/Overlay) */
.cadastro-vaga-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Fundo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Para ficar acima de outros elementos */
}

.cadastro-vaga-form {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 90%;
  max-width: 450px; /* Largura do formulário */
  box-sizing: border-box;
}

.cadastro-vaga-form h3 {
  font-size: 20px;
  color: #333;
  margin-top: 0;
  margin-bottom: 25px;
  text-align: center;
}

.cadastro-vaga-form .form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.cadastro-vaga-form .form-row:last-of-type {
  margin-bottom: 25px;
}

.cadastro-vaga-form input[type="text"],
.cadastro-vaga-form input[type="number"] {
  flex-grow: 1;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

.cadastro-vaga-form input::placeholder {
  color: #a0a0a0;
}

.cadastro-vaga-form .form-actions {
  display: flex;
  justify-content: flex-end; /* Alinha os botões à direita */
  gap: 10px;
}

.cadastro-vaga-form .cancel-button {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cadastro-vaga-form .cancel-button:hover {
  background-color: #e2e6ea;
}

.cadastro-vaga-form .save-button {
  background-color: #28a745; /* Verde similar ao da imagem */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cadastro-vaga-form .save-button:hover {
  background-color: #218838;
}

/* Ajustes de responsividade (opcional, mas boa prática) */
@media (max-width: 768px) {
  .gerenciar-vagas-container {
    padding: 20px;
    margin: 20px;
  }

  .header-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-section h2 {
    margin-bottom: 15px;
  }

  .cadastro-vaga-form .form-row {
    flex-direction: column;
    gap: 10px;
  }
}
</style>