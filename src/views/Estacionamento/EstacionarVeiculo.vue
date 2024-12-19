<script>
import DAOService from '@/service/DAOService';
import { onBeforeMount, ref } from 'vue';
import {vagaEscolhida} from '@/views/Estacionamento/HomeEstacionamento.vue'

export default{

    setup(){

        const daoVeiculo = new DAOService('veiculos');

        const daoEstacionar = new DAOService('dadosEstacionar')

        let vs = vagaEscolhida;

        let listaVeiculo = [];


onBeforeMount (async () => {
    //pega lista de vagas do banco
    listaVeiculo = await daoVeiculo.getAll();
    //pega o ID do select para inserir os option
    let veiculo = document.getElementById('listaVeiculos');

    //inetração para inserir os tipos de vagas no option, e criar o option do select
    listaVeiculo.forEach(function(veiculos){
        let v = veiculos.placa;
        let item = document.createElement('Option');
        item.text = `${v}`;
        veiculo.appendChild(item);
        return listaVeiculo.push(veiculos)
    }); 
});

    const veiculoSelecionado = ref();
    console.log(veiculoSelecionado.placa + 'veiculo selecionado')
    
    const estacionar = ()=> {
        let placa = listaVeiculo.find(v => v.palaca === veiculoSelecionado.value)
        console.log(placa.value + 'teste')
    }


    return{
        onBeforeMount,
        listaVeiculo,
        daoVeiculo,
        estacionar,
        vs,
        vagaEscolhida,
        veiculoSelecionado
    }
    }
}

</script>

<template>
<section>
    <div class="veiculoCadastrado">
        <select id="listaVeiculos"  v-model="veiculoSelecionado">
            <option selected disabled>Seleciona a placa</option>    
        </select>
        <button type="button" @click="estacionar">Estacionar</button>
    </div>
   <RouterLink to="CadastrarVeiculo.vue"><button type="button">Cadastrar novo veiculo</button></RouterLink>
</section>
</template>

<style>

</style>