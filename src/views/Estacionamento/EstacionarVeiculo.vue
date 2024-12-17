<script>
import DAOService from '@/service/DAOService';
import { onBeforeMount } from 'vue';

export default{

    setup(){

        const daoVeiculo = new DAOService('veiculos');

let listaVeiculo = [];

onBeforeMount (async () => {
    //pega lista de vagas do banco
    let listveiculos = await daoVeiculo.getAll();
    console.log(listaVeiculo)
    //pega o ID do select para inserir os option
    let veiculo = document.getElementById('listaVeiculos');

    //inetração para inserir os tipos de vagas no option, e criar o option do select
    listveiculos.forEach(function(veiculos){
        let v = veiculos.placa;
        let item = document.createElement('Option');
        item.text = `${v}`;
        veiculo.appendChild(item);
        return listaVeiculo.push(veiculos)
    }); 

    })
    return{
        onBeforeMount,
        listaVeiculo,
        daoVeiculo
    }
    }
}

</script>

<template>
<section>
    <div class="veiculoCadastrado">
        <select id="listaVeiculos">
            <option selected disabled>Seleciona a placa</option>
            
        </select>
    </div>
   <RouterLink to="CadastrarVeiculo.vue"><button type="button">Cadastrar novo veiculo</button></RouterLink>
</section>
</template>

<style>

</style>