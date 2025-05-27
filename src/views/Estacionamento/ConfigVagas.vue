<script>
import HeaderGeral from '@/components/HeaderGeral.vue';
import DAOService from '@/service/DAOService';
import { onBeforeMount, ref } from 'vue';



export default {
    components: {
    HeaderGeral,

  },

    setup() {

    const cadastroVaga = async()=>{

        // Remove quaisquer caracteres que não sejam números ou ponto/virgula
       let valorLimpo = vagaConfig.value.valor.replace(/(\d+),(\d+)/, "$1.$2");
        vagaConfig.value.valor = valorLimpo;
        
        vagaConfig.value.estacionamentoID = 1;
        //let dadosVaga = {...vagaConfig.value};

        let dadosVaga = await addvaga(vagaConfig.value);

        alert('vaga cadastrada!')
        console.log(dadosVaga);

        console.log(listaVagas.value)
        listaVagas.value.push(dadosVaga);

        //await lista_Vagas();
        await limpaDadosVaga();
    }

    const vagaConfig = ref ({
 
        tipoVaga: '',
        quantidade: null,
        statuVaga: 'desocupada',
        valor: null,
        estacionamentoID: null,
        cadastroVagaID: null
      

    });
    const vagaQuantidade = ref('');

    const limpaDadosVaga = ()=>{
        vagaConfig.value.tipoVaga = '';
        vagaConfig.value.quantidade = '';
        vagaConfig.value.valor = '';
    };
    const listaVagas = ref([]);

    const listaDaoDadosVagas =  ref ([]);

    const listaTipoVagaAgr = ref([]);

        onBeforeMount (async () => {
       
            await lista_Vagas();

        //alimenta a lista com todas as vagas disponiveis no banco
        let lista = await fetch("http://localhost:8080/ListaVagas/ListaVagas");
        listaDaoDadosVagas.value = await lista.json();
    
        //função para separar vagas por tipos
        function agruparPorTipo() {
                const agrupados = {}; 
                for (const i of listaDaoDadosVagas.value){
                    console.log(i)
                    const { tipoVaga } = i;
                    if (!agrupados[tipoVaga]) {
                    agrupados[tipoVaga] = [];
                    }
                    agrupados[tipoVaga].push(i);
                };

                listaTipoVagaAgr.value = Object.values(agrupados);
  
            }

        await agruparPorTipo();
        console.log(listaTipoVagaAgr.value)
}); 

    async function lista_Vagas (){
     //pega lista de vagas do banco
        let vagas = await fetch("http://localhost:8080/vaga/vagas")//daoTipoVaga.getAll();
            if(!vagas.ok){
                throw new Error("vErro ao buscar vagas!")
            }
            
        listaVagas.value = await vagas.json();
        console.log(listaVagas.value)
        //pega o ID do select para inserir os option
        let tipoVaga = document.getElementById('listarVagas');

        //interação para inserir os tipos de vagas no option, e criar o option do select
        listaVagas.value.forEach(function(veiculos, index){
            let v = veiculos.tipoVaga;
            let item = document.createElement('Option');
            item.text = `${v}`;
            //Estilizar o option direto no css não deu certo, pois apenas o option adicionado no html estva sendo estilizado
            item.style.cssText = "font-size: 14px; padding: 5px; margin: 2px; border: 2px solid #ddd; border-radius: 5px; width: 180px; text-align: center";
            item.addEventListener('mouseover', () => item.style.backgroundColor = 'rgb(228, 234, 247)');
            item.addEventListener('mouseout', () => item.style.backgroundColor = '#ffffff');

            tipoVaga.appendChild(item);

        })
}
let vagaSelecionada = ref('');


const listaTipos = ref([]);

const listaAtualizada = ref([]);

const salvarQuantidade = async ()=>{
        let vaga = listaVagas.value.find(v => v.tipoVaga === vagaSelecionada.value)
        
        vaga.quantidade = vagaQuantidade.value;

        console.log(vaga)
        vaga.estacionamentoID = vaga.estacionamento.id;
        
        await atualizarVaga(vaga.id, vaga);


        //função para mutiplicar a quantidade de vagas em uma outra coleção
        const multiplicarVaga = async ()=>{
            let vagas = [await getVaga(vaga.id)];

            listaTipos.value = vagas.flatMap((vagas) =>
            Array.from({ length: vagas.quantidade  }, () => vagas));

            //.map para eliminar o id que está se repetindo da lista de tipos.
            const propriedadeParaRemover = 'id'
            listaAtualizada.value = listaTipos.value //.map(({ [propriedadeParaRemover]: _, ...resto }) => resto);
            console.log(listaAtualizada.value )

            const verificarVaga = listaTipoVagaAgr.value.find(sublista =>sublista.some(vaga => vaga.tipoVaga === vagaSelecionada.value));
            console.log(verificarVaga)
            if(verificarVaga){
                for (const v of verificarVaga){
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
            }else{
            for (const i of listaAtualizada.value) {
                vagaConfig.value.tipoVaga = i.tipoVaga
                vagaConfig.value.quantidade = '1'
                vagaConfig.value.statuVaga = 'desocupada'
                vagaConfig.value.valor = i.valor
                vagaConfig.value.estacionamentoID = i.estacionamento.id;
                vagaConfig.value.cadastroVagaID = i.id;
                await addListavaga(vagaConfig.value);
                await limpaDadosVaga();
                console.log('inserindo dados')
            }
           
        }
            alert('Vaga atualizada!!!')
}
    await multiplicarVaga();
    await limpaDadosVaga();
}
async function atualizarVaga(id, vagaAtualizada) {
    console.log(vagaAtualizada)
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
            } catch (error) {
                console.error('Erro ao atualizar vaga:', error);
            }
        }

async function addvaga(novaVaga) {
    try {
        
        const response = await fetch(`http://localhost:8080/vaga/insert`, {
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
async function deletarListaVaga(id) {
    
    try {
      // Requisição DELETE ao backend
      const response = await fetch(`http://localhost:8080/ListaVagas/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar vaga no servidor');
      }

    } catch (error) {
      console.error('Erro ao deletar vaga:', error);
      alert('Não foi possível deletar a vaga. Tente novamente.');
    }
}
async function deletarVaga(index) {
    const vaga = this.listaVagas[index];

    // Confirmação opcional
    const confirmar = confirm(`Deseja deletar a vaga: ${vaga.tipoVaga}?`);
    if (!confirmar) return;

    try {/*
      // Requisição DELETE ao backend
      const response = await fetch(`http://localhost:8080/vaga/${vaga.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar vaga no servidor');
      }*/

      let quantidadeVaga = 0
      while(quantidadeVaga < vaga.quantidade){
         let vagas = [await getVaga(vaga.id)];
            
            listaTipos.value = vagas.flatMap((vagas) =>
            Array.from({ length: vagas.quantidade  }, () => vagas));

            //.map para eliminar o id que está se repetindo da lista de tipos.
            const propriedadeParaRemover = 'id'
            listaAtualizada.value = listaTipos.value //.map(({ [propriedadeParaRemover]: _, ...resto }) => resto);

            
                for (const v of listaAtualizada.value){
                    let listaVagas =  await fetch("http://localhost:8080/ListaVagas/ListaVagas");
                    let lista = await listaVagas.json();

                    for (const i of lista){
                        if (i.cadastroVagaID === v.id){
                            deletarListaVaga(i.id);
                        }
                    }
                    
                    console.log('deletando dados')
                }
      
        quantidadeVaga ++;
      }

      // Remove da lista local após sucesso
      this.listaVagas.splice(index, 1);
    } catch (error) {
      console.error('Erro ao deletar vaga:', error);
      alert('Não foi possível deletar a vaga. Tente novamente.');
    }
  }

    return{
        cadastroVaga,
        salvarQuantidade,
        vagaSelecionada,
        onBeforeMount,
        listaVagas,
        limpaDadosVaga,
        vagaQuantidade,
        vagaConfig,
        listaTipoVagaAgr,
        listaDaoDadosVagas,
        deletarVaga
       
    };
    }
}
</script>

<template>
    <header>
        <HeaderGeral/>
    </header>
<body>
<div class="geral">
<h1>Vagas</h1>

<div class="tipoVaga">
    <label for="tipoVaga">Adicionar tipo de vaga</label>
    <input type="text" id="tipoVaga" v-model="vagaConfig.tipoVaga">
    <input type="text"  id="valorHora" v-model="vagaConfig.valor" placeholder="Valor">
    <button type="button" @click="cadastroVaga">cadastrar</button>
</div>
<div class="selecVaga">
    <label for="vagasCadastradas"> Vagas</label>
    <select id="listarVagas" v-model="vagaSelecionada">
        
        <option disabled value="">Selecione uma opção</option>
        
    </select >
    <input type="text" v-model="vagaQuantidade" placeholder="Qtde.">
    <button type="button" @click="salvarQuantidade">salvar</button>
</div>

<section>
<div class="vagasVinculadas">
    <p>Tipos de vagas vinculadas</p>
    <div v-for="(v, index) in listaVagas" :key="index" id="vaga">
        <div class="deletarVaga">
            <p>{{ v.tipoVaga }} [{{ v.quantidade }}]
                <button type="button" id="botãoDeleArquivo" @click="deletarVaga(index)" >❌</button> 
            </p>
        </div>

    </div>

</div>
</section>  
</div> 
</body>

</template>

<style scoped>
.geral {
    align-self: center;
    height: 350px;
    width: 37%;
    margin-top: 10%;
    padding: 0px;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-family: 'Inria Sans'
}

h1{
    text-align: center;
}
body{
    font-family: 'Inria Sans';font-size: 15px;
    display: flex;
    flex-direction: column;
    margin-bottom: 100%;
    margin-left: auto;
    margin-right: auto;
    
}

.tipoVaga{
    display: flex;
    justify-content: center;
    align-items: center;
    
    
}
.tipoVaga input{
    border-radius: 5px;
    margin: 0.5%;
}
#valorHora{
    width: 50px;
}
.tipoVaga button{
    margin: 5px;
    border-radius: 5px;
    background-color: rgba(21, 88, 116, 1);
    color: #fff;
}
.selecVaga{
    display: flex;
    justify-content: center;
    align-items: center;
}
.selecVaga button{
    margin: 5px;
    border-radius: 5px;
    background-color: rgba(21, 88, 116, 1);
    color: #fff;
}
.selecVaga input{
    border-radius: 5px;
    margin: 0.5%;
}
.selecVaga select{
    border-radius: 5px;
    margin: 0.5%;
}

.vagasVinculadas{
    display: inline;
    text-align:center;
    align-items: center;
}
#vaga{
    justify-self: center;
    align-items: center;
    width: 150px;
    background-color: rgb(6, 128, 6);
    color: white;
}
.deletarVaga{
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    margin: 2%;
}
.deletarVaga p {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 2px;
  
}
#botãoDeleArquivo{
    border: none;
    font-size: 10px;
    background: none;
    cursor: pointer;
    padding: 0;
    width: 10px;
    height: 10px;
    margin-right: 15px;
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    justify-content: flex-start;
}
#botãoDeleArquivo:hover{
    font-size: 15px;

}
</style>