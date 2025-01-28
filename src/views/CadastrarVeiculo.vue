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
<div class="geral">
    <div class="linhaum">
        <label for="placa">Placa
            <input type="text" id="placa" v-model="veiculo.placa">
        </label>

        <label for="chassi">Chassi
            <input type="text" id = "chassi" v-model="veiculo.chassi">
        </label>

        <label for="renavam">Renavam
            <input type="text" id="renavam" v-model="veiculo.renavam">
        </label>
    </div>
    <div class="linhadois">
        <label for="modelo">Modelo
            <select id="modelo" v-model="veiculo.modelo">
                <option value="corolla">Corolla</option>
                <option value="CB TWISTER"> CB TWISTER 300F</option>
            </select>
        </label>

        <label for="fabricante">Fabricante
            <select id="fabricante" v-model="veiculo.fabricante">
                <option value="toyota">Toyota</option>
                <option value="HONDA">Honda</option>
            </select>
        </label>

        <label for="ano_fabricacao">Ano de fabricação
            <input type="text" id="ano_fabricacao" v-model="veiculo.anoFabricacao">
        </label>
    </div>
    <div class="linhatres">
        <label for="ano_modelo">Ano modelo
            <input type="text" id="ano_modelo" v-model="veiculo.anoModelo">
        </label>

        <label for="cor">Cor
            <select id = "cor"v-model="veiculo.cor">
                <option value="vermelho">Vermelho</option>
                <option value="preto">Preto</option>
            </select>
        </label>

        <label for="potencia">Potência
            <input type="text" id="potencia" v-model="veiculo.potencia">
        </label>
        <label for="capacidade">Capacidade
            <input type="text" id="capcaidade" v-model="veiculo.capacidade">
        </label>
    </div>
    <div id="botaoCadastrar">
        <button @click="cadastraVeiculo()"> Cadastrar</button>
    </div>
</div>
</body>

</template>

<style scoped>
body{
    font-family: 'Inria Sans';font-size: 15px;
    
}
input{
    border-radius: 5px;
    margin-right: 3%;
   
}
.geral{
    display: inline-block;
    flex-direction: column;
    
   
}
     
.linhaUm{
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    align-items: center;
    
}
.linhaUm label{
    margin-right: 100%;
}
.lilnhadois{
    display: flex;
   
    flex-direction: row;
    justify-content: space-around;
    align-items: center

}
.lilnhatres{
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;

}

</style>