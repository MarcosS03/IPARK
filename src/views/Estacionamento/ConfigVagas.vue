<script>
import DAOService from '@/service/DAOService';
import { onBeforeMount, ref } from 'vue';



export default {

    setup() {
    const daoTipoVaga = new DAOService ('cadastroVaga');

    const daoDados = new DAOService('daoDadosVagas');

    const cadastroVaga = async()=>{

         // Remove quaisquer caracteres que não sejam números ou ponto/virgula
       let valorLimpo = vagaConfig.value.valorHora.replace(/(\d+),(\d+)/, "$1.$2");
        vagaConfig.value.valorHora = valorLimpo;
        await daoTipoVaga.insert(vagaConfig.value);
        alert('vaga cadastrada!')
        await limpaDadosVaga();
    }

    const vagaConfig = ref ({
        tipoVaga: '',
        quantidade: null,
        statuVaga: 'desocupada',
        valorHora: null

    });
    const vagaQuantidade = ref('');

    const limpaDadosVaga = ()=>{
        vagaConfig.value.tipoVaga = '';
        vagaConfig.value.quantidade = '';
        vagaConfig.value.valorHora = '';
    };
    const listaVagas = ref('');

    const listaDaoDadosVagas =  ref ([]);

    const listaTipoVagaAgr = ref([]);

        onBeforeMount (async () => {
        //pega lista de vagas do banco
        let vagas = await daoTipoVaga.getAll();
        listaVagas.value = vagas
        //pega o ID do select para inserir os option
        let tipoVaga = document.getElementById('listarVagas');

        //inetração para inserir os tipos de vagas no option, e criar o option do select
        vagas.forEach(function(veiculos, index){
            let v = veiculos.tipoVaga;
            let item = document.createElement('Option');
            item.text = `${v}`;
            //Estilizar o option direto no css não deu certo, pois apenas o option adicionado no html estva sendo estilizado
            item.style.cssText = "font-size: 14px; padding: 5px; margin: 2px; border: 2px solid #ddd; border-radius: 5px; width: 180px; text-align: center";
            item.addEventListener('mouseover', () => item.style.backgroundColor = 'rgb(228, 234, 247)');
            item.addEventListener('mouseout', () => item.style.backgroundColor = '#ffffff');

            tipoVaga.appendChild(item);

        })

        //alimenta a lista com todas as vagas disponiveis no banco
        listaDaoDadosVagas.value = await daoDados.getAll();

        //função para separar vagas por tipos
        function agruparPorTipo() {
                const agrupados = {}; 
                for (const i of listaDaoDadosVagas.value){
                    const { tipoVaga } = i;
                    if (!agrupados[tipoVaga]) {
                    agrupados[tipoVaga] = [];
                    }
                    agrupados[tipoVaga].push(i);
                };

                listaTipoVagaAgr.value = Object.values(agrupados);
  
            }

        await agruparPorTipo();
}); 

let vagaSelecionada = ref('');


const listaTipos = ref([]);

const listaAtualizada = ref([]);

const salvarQuantidade = async ()=>{
        let vaga = listaVagas.value.find(v => v.tipoVaga === vagaSelecionada.value)
        vaga.quantidade = vagaQuantidade.value;

        await daoTipoVaga.update(vaga.id, vaga)


        //função para mutiplicar a quantidade de vagas em uma outra coleção
        const multiplicarVaga = async ()=>{
            let vagas = [await daoTipoVaga.get(vaga.id)];

            listaTipos.value = vagas.flatMap((vagas) =>
            Array.from({ length: vagas.quantidade  }, () => vagas));

            //.map para eliminar o id que está se repetindo da lista de tipos.
            const propriedadeParaRemover = 'id'
            listaAtualizada.value = listaTipos.value.map(({ [propriedadeParaRemover]: _, ...resto }) => resto);
          

            const verificarVaga = listaTipoVagaAgr.value.find(sublista =>sublista.some(vaga => vaga.tipoVaga === vagaSelecionada.value));
            console.log(verificarVaga)
            if(verificarVaga){
                for (const v of verificarVaga){
                    console.log(v.id)
                    daoDados.delete(v.id);
                    console.log('deletando dados')
                }
                for (const i of listaAtualizada.value) {
                    i.quantidade = '1';
                    await daoDados.insert(i);
                    console.log('atualizando dados')
                }
            }else{
            for (const i of listaAtualizada.value) {
                i.quantidade = '1';
                await daoDados.insert(i);
                console.log('inserindo dados')
            }
           
        }
            alert('Vaga atualizada!!!')
}
    await multiplicarVaga();
    await limpaDadosVaga();
}
    return{
        cadastroVaga,
        daoTipoVaga,
        salvarQuantidade,
        vagaSelecionada,
        onBeforeMount,
        listaVagas,
        limpaDadosVaga,
        vagaQuantidade,
        vagaConfig,
        daoDados,
        listaTipoVagaAgr,
        listaDaoDadosVagas
       
    };
    }
}
</script>

<template>
<body>
<div class="geral">
<h1>Vagas</h1>

<div class="tipoVaga">
    <label for="tipoVaga">Adicionar tipo de vaga</label>
    <input type="text" id="tipoVaga" v-model="vagaConfig.tipoVaga">
    <input type="text"  id="valorHora" v-model="vagaConfig.valorHora">
    <button type="button" @click="cadastroVaga">cadastrar</button>
</div>
<div class="selecVaga">
    <label for="vagasCadastradas"> Vagas</label>
    <select id="listarVagas" v-model="vagaSelecionada">
        
        <option disabled value="">Selecione uma opção</option>
        
    </select >
    <input type="text" v-model="vagaQuantidade" >
    <button type="button" @click="salvarQuantidade">salvar</button>
</div>

<section>
<div class="vagasVinculadas">
    <p>Tipos de vagas vinculadas</p>
    <div v-for="(v, index) in listaVagas" :key="index" id="vaga">
        <div>
            <p>{{ v.tipoVaga }} [{{ v.quantidade }}]</p>
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
</style>