<script>
import DAOService from '@/service/DAOService';
import { onBeforeMount, ref } from 'vue';


export default{

    setup(){

        const daoVeiculo = new DAOService('veiculos');

        const daoEstacionado = new DAOService('veiculoEstacionado')

        let vs = vagaEscolhida;
        
        const listaVeiculo = ref ();

        const dadosVeiEst = ref({
            tipoVaga: '',
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
            HoraEntrada: '',
            HoraSaida: ''
        })


    const veiculoEstaciona =()=>{

    }

onBeforeMount (async () => {
    //pega lista de vagas do banco
   let lv= await daoVeiculo.getAll();
   console.log(lv)
   listaVeiculo.value = lv;
    //pega o ID do select para inserir os option
    let veiculo = document.getElementById('listaVeiculos');

    //inetração para inserir os tipos de vagas no option, e criar o option do select
    lv.forEach(function(veiculos){
        let v = veiculos.placa;
        let item = document.createElement('Option');
        item.text = `${v}`;
        veiculo.appendChild(item);
        
    }); 
});

    const veiculoSelecionado = ref();
    console.log(veiculoSelecionado + 'veiculo selecionado')
    
    const estacionar = ()=> {
        let placa = listaVeiculo.value.find(v => v.palaca === veiculoSelecionado.value)
        console.log(placa)
        console.log(placa.placa+ 'teste')
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

    <div class="veiculoCadastrado">
        <label for="">Lista de veiculos: </label>
        <select id="listaVeiculos"  v-model="veiculoSelecionado">
            <option selected disabled>Seleciona a placa</option>    
        </select>
        <button type="button" @click="estacionar">Estacionar</button>
    </div>
    <div>
        <label for="">caso não encontre a placa, cadastre um novo veiculo: </label>
        <RouterLink to="CadastrarVeiculo.vue"><button type="button">Cadastrar novo veiculo</button></RouterLink>
    </div>

</template>

<style>

</style>