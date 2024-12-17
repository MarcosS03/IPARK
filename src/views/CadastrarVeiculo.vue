<script setup>

import DAOService from '@/service/DAOService';
import { ref } from 'vue';


const veiculo = ref({
    placa: '',
    chassi : '',
    renavam :'',
    modelo : '',
    fabricante:'',
    anoFabricacao : '',
    anoModelo :'',
    cor: '',
    potencia : '',
    capacidade: '',
})

const daoVeiculos = new DAOService ('veiculos')

const cadastraVeiculo = () => {
     daoVeiculos.insert(veiculo.value);

     limpaDadosVeiculo();
     alert('veiculo cadastrado!!')
    
}

function limpaDadosVeiculo  (){
    veiculo.placa = '',
    veiculo.chassi = '',
    veiculo.renavam = '',
    veiculo.modelo = '',
    veiculo.fabricante = '',
    veiculo.anoFabricacao = '',
    veiculo.anoModelo = '',
    veiculo.cor = '',
    veiculo.potencia = '',
    veiculo.capacidade = ''
}

</script>

<template>
    <body>
        
  
<h3>Cadastrar Veiculo</h3>

    <div class="dadosVeiculo">
        <label for="placa">Placa</label>
        <input type="text" id="placa" v-model="veiculo.placa">

        <label for="chassi">Chassi</label>
        <input type="text" id = "chassi" v-model="veiculo.chassi">

        <label for="renavam">Renavam</label>
        <input type="text" id="renavam" v-model="veiculo.renavam">
    </div>
    <div class="dadosVeiculo">
        <label for="modelo">Modelo</label>
        <select id="modelo" v-model="veiculo.modelo">
            <option value="corolla">Corolla</option>
        </select>
        <label for="fabricante">Fabricante</label>
        <select id="fabricante" v-model="veiculo.fabricante">
            <option value="toyota">Toyota</option>
        </select>
        <label for="ano_fabricacao">Ano de fabricação</label>
        <input type="text" id="ano_fabricacao" v-model="veiculo.anoFabricacao">
    </div>
    <div class="dadosVeiculo">
        <label for="ano_modelo">Ano modelo</label>
        <input type="text" id="ano_modelo" v-model="veiculo.anoModelo">
        <label for="cor">Cor</label>
        <select id = "cor"v-model="veiculo.cor">
            <option value="vermelho">Vermelho</option>
            <option value="preto">Preto</option>
        </select>
        <label for="potencia">Potência</label>
        <input type="text" id="potencia" v-model="veiculo.potencia">
        <label for="capacidade">Capacidade</label>
        <input type="text" id="capcaidade" v-model="veiculo.capacidade">
    </div>
    <div id="botaoCadastrar">
        <button @click="cadastraVeiculo()"> Cadastrar</button>
    </div>

</body>

</template>

<style scoped>
body{
    display: flex;
    
}

form{
    display: flex;
    flex-direction: column;
    
}

.dadosVeiculo{
    display: flex;
    flex-direction: row;
    
}

</style>