<script>
import DAOService from '@/service/DAOService';
import { onBeforeMount, ref } from 'vue';



export default {

    setup() {
    const daoTipoVaga = new DAOService ('cadastroVaga');

    const cadastroVaga = async()=>{
        await daoTipoVaga.insert(vagaConfig.value);
        limpaDadosVaga();
        alert('vaga cadastrada!')
    }

    const vagaConfig = ref ({
        tipoVaga: '',
        quantidade: null
    });
    const vagaQuantidade = ref('');

    const limpaDadosVaga = ()=>{
        vagaConfig.tipoVaga = '';
        vagaConfig.quantidade = '';

    };
    const listaVagas = ref();
    console.log(listaVagas)

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
            tipoVaga.appendChild(item);

        })

}); 

let vagaSelecionada = ref('');

const salvarQuantidade = async ()=>{
        let vaga = listaVagas.find(v => v.tipoVaga === vagaSelecionada.value)
        console.log(vaga)
        vaga.quantidade = vagaQuantidade.value
        console.log(vaga)

        await daoTipoVaga.update(vaga.id, vaga)
        alert('vaga atualizada')
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
        vagaConfig
    };
    }
}
</script>

<template>
<body>

<h1>Vagas</h1>

<div class="tipoVaga">
    <label for="tipoVaga">Adicionar tipo de vaga</label>
    <input type="text" id="tipoVaga" v-model="vagaConfig.tipoVaga">
    <button type="button" @click="cadastroVaga">cadastrar</button>
</div>
<div>
    <label for="vagasCadastradas"> Vagas</label>
    <select id="listarVagas" v-model="vagaSelecionada">
        
        <option disabled value="">Selecione uma opção</option>
        
    </select >
    <input type="text" v-model="vagaQuantidade" >
    <button type="button" @click="salvarQuantidade">salvar</button>
</div>

<section>
<div>
    <p>Tipos de vagas vinculadas</p>
    <div v-for="(v, index) in listaVagas" :key="index" id="vaga">
        <div>
            <p>{{ v.tipoVaga }} [{{ v.quantidade }}]</p>
        </div>
        
    </div>
</div>
</section>

    
</body>
</template>

<style scoped>
.tipoVaga{
    display: inline;
    width: max-content;
    
}
#vaga{
    background-color: green;
    color: white;
}
</style>