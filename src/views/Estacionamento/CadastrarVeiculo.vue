<script>

import DAOService from '@/service/DAOService';
import { onBeforeMount, onMounted, ref } from 'vue';

export default{

    setup() {

    const daoVeiculos = new DAOService ('veiculos')

    const daoFabricantes = new DAOService('fabricantes');

    const daoModelos = new DAOService('modelosVeiculos')

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
    const idFabricante = ref();
    const idModelos = ref([]);

    
    onBeforeMount (async () => {
        idFabricante.value = await daoFabricantes.getAll();
       
        

    });
    async function opcaoSelecionada (){
        idModelos.value = [];
        const modelos = await daoModelos.getAll()
       let marca = idFabricante.value.find(v => v.nome === veiculo.value.fabricante)
          for( const m of modelos){
            if(m.idFabricante === marca.id){
                idModelos.value.push(m)
            }
          }

 
    }
    const cadastraVeiculo = async () => {
         
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
        return {
        veiculo,
        daoVeiculos,
        cadastraVeiculo,
        limpaDadosVeiculo,
        daoFabricantes,
        daoModelos,
        idFabricante,
        idModelos, opcaoSelecionada
        }
    }
}
</script>

<template>
    <body>
        
  

<div class="geral">
    <div class="geralIntens">
    <h3>Cadastrar Veiculo</h3>
    <div class="linhaum">
        <label for="placa">Placa
            <input type="text" id="placa" v-model="veiculo.placa">
        </label>

        <label for="chassi">Chassi
            <input type="text" id = "chassi" v-model="veiculo.chassi">
        </label>
    </div>

    <div class="linhadois">
        <label for="renavam">Renavam
            <input type="text" id="renavam" v-model="veiculo.renavam">
        </label>

        <label for="fabricante">Fabricante
            <select id="idFabricante" v-model="veiculo.fabricante" @change="opcaoSelecionada">
                <option disabled value="">Fabricantes</option>
                <option v-for="f in idFabricante" :key="f.id">{{f.nome}}</option>
                
            </select>
        </label>
    </div>

        <label for="modelo">Modelo
            <select id="modelo" v-model="veiculo.modelo">
                <option disabled value="">Modelos</option>
                <option v-for="m in idModelos">{{ m.nome }}</option>

            </select>
        </label>

        <label for="ano_fabricacao">Ano de fabricação
            <input type="text" id="ano_fabricacao" v-model="veiculo.anoFabricacao">
        </label>
    
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
    border: 1px solid #ccc;
   
}
.geral{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 300px;
    width: 600px;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-family: 'Inria Sans';
        
}
.geralIntens {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    margin-left: -35%;
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
#placa{
    width: 80px;
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