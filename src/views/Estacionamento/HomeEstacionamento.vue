<script>
import HeaderGeral from '@/components/HeaderGeral.vue';
import DAOService from '@/service/DAOService';
import { onBeforeMount, onMounted, ref} from 'vue';
import VeiculosEstacionados from './VeiculosEstacionados.vue';




export default {
    components: {
    HeaderGeral,
  },
  
  setup() {
 
    const daoVaga = new DAOService('cadastroVaga');
    const daoVeiculo = new DAOService('veiculos');
    const daoEstaciona = new DAOService('veiculoEstacionado');
    const daoDados = new DAOService('daoDados');

    const listaVagas = ref([]);

    const listaTipos = ref([]);
   
    const listaVeiculo = ref ([]);

    const telaEntrada =  ref('false');

    const veiculoSelecionado = ref();

    const listaVeiculoEstacionado = ref([]);

    const tv = ref ();

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
            data: '',
            HoraEntrada: '',
            HoraSaida: '',
            statuVaga: '',
        })

    onBeforeMount(async() => {
        let vagas = await daoVaga.getAll();
        listaVagas.value = vagas;  

        //puxa uma array com os veiculos estacionados.
        let vagaOcupada = await daoEstaciona.getAll();
        listaVeiculoEstacionado.value = vagaOcupada;
        vagaOcupada.forEach(function(v){
            listaTipos.value.push(v)
        
        }); 

        
        listaTipos.value = vagas.flatMap((vagas) =>
         Array.from({ length: vagas.quantidade  }, () => vagas)); 
         
         //for (const i of listaTipos.value) {
          //   await daoDados.insert(i);
        //}
    });

    onMounted (async()=> {
        let lv = await daoVeiculo.getAll();
        listaVeiculo.value = lv;
        //pega o ID do select para inserir os option
        let veiculo = document.getElementById('listaVeiculos');

        //inetração para inserir os tipos de vagas no option, e criar o option do select
        lv.forEach(function(veiculos){
            let p = veiculos.placa;
            let m = veiculos.modelo;
            let item = document.createElement('Option');
            item.text = `${p} - ${m}`;
            veiculo.appendChild(item);
        
    });
    
    })

    const entradaVeiculo = (dados) =>{
        telaEntrada.value = true;
        tv.value = dados;
       


    }
    const sairTelaVeiculos = () =>{
        telaEntrada.value = false;
    }

    function formatDate(date) {
    let dia = date.getDate()
    let mes = [
    'janeiro', 'fevereiro', 'março', 'abril',
    'maio', 'junho', 'julho', 'agosto', 'setembro', 
    'outubro', 'novembro', 'dezembro'
    ][date.getMonth()]
    let ano = date.getFullYear()
  
    return `${dia}/${mes}/${ano}`
}


let hoje = new Date()
const dataAtual = formatDate(hoje);

const hora = hoje.getTime()


    const EstacionarVeiculo = async() =>{
        let vs = veiculoSelecionado.value.split(" ");
        let veiculo = listaVeiculo.value.find(v => v.placa.includes(vs[0]))

        dadosVeiEst.value.tipoVaga = tv.value;
        dadosVeiEst.value.placa = veiculo.placa;
        dadosVeiEst.value.chassi = veiculo.chassi;
        dadosVeiEst.value.renavam = veiculo.renavam;
        dadosVeiEst.value.modelo = veiculo.modelo;
        dadosVeiEst.value.fabricante = veiculo.fabricante;
        dadosVeiEst.value.anoFabricacao = veiculo.anoFabricacao;
        dadosVeiEst.value.anoModelo = veiculo.anoModelo;
        dadosVeiEst.value.cor = veiculo.cor;
        dadosVeiEst.value.potencia = veiculo.potencia;
        dadosVeiEst.value.capacidade = veiculo.capacidade;
        dadosVeiEst.value.data = dataAtual;
        dadosVeiEst.value.HoraEntrada = hora;
        dadosVeiEst.value.HoraSaida = '';
        dadosVeiEst.value.statuVaga = 'ocupado';


        //await daoVaga.update(tv.value.id, dadosVeiEst.value)
        
        await daoEstaciona.insert(dadosVeiEst.value);
        alert('Veiculo estacionado');
    }

   

    return {
        listaVagas,
        onBeforeMount,
        listaTipos,
        telaEntrada,
        entradaVeiculo,
        listaVeiculo,
        onMounted,
        sairTelaVeiculos,
        EstacionarVeiculo,
        dadosVeiEst,
        veiculoSelecionado,
        formatDate,
        dataAtual,
        hora,
        daoEstaciona,
        listaVeiculoEstacionado,
        daoDados
    };
}
  }
</script>

<template>
<header>
    <HeaderGeral/>
</header>
<link href='https://fonts.googleapis.com/css?family=Inria Sans' rel='stylesheet'>
<body>




<section class="dashboardGeral">
    <div class="valores">
        <h2>Valores recebidos do dia</h2>
        <div class="valoresRecebidos">
            <p>R$ 00,00 dinheiro</p>
            <p>R$ 00,00 PIX</p>
            <p>R$ 00,00 APP</p>
            <p>R$ 00,00 cartão de crédito</p>
            <p>R$ 00,00 cartão de débito</p>
        </div>
    </div>
    <div class="dashboard">
        <h2>DASHBOARD</h2>
    <div class="organizarDashboard">
        <div class="conteudoDashboard">
            
            <img src="/src/assets/img/icons8-vendas-50.png" alt="icone das moedas" width="40" height="40">
            
            <p>Valores recebidos</p>
             <p> R$ 00,00</p>
            
            <button type="button" @click="veiculo">acumulado do inicio do mês</button>
            
        </div>
        <div class="conteudoDashboard">
        <img src="/src/assets/img/icons8-receber-50.png" alt="icone das moedas" width="40" height="40">
        <p>Ticket médio</p>
        <p>R$ 00,00</p>
            <div>
            <button type="button">média de recebimentos do mês </button>
            </div>
        </div>
        <div class="conteudoDashboard">
        <img src="/src/assets/img/icons8-carros-50.png" alt="icone das moedas" width="40" height="40">
        <p>veiculos estacionados</p>
        <p> 0000 </p>
            <div>
            <button type="button">veículo mês</button>
            </div>
        </div>
    </div>
    <div class="organizarDashboard">
        <div class="conteudoDashboard">
        <img src="/src/assets/img/icons8-retirada-50.png" alt="icone das moedas" width="40" height="40">
        <p>Contas a pagar</p>
        <p> R$ 00,00 </p>
            <div>
            <button type="button">ver detalhes</button>
            </div>
        </div>
        <div class="conteudoDashboard">
        <img src="/src/assets/img/icons8-receber-50.png" alt="icone das moedas" width="40" height="40">
        <p>Contas a receber</p>
        <p> R$ 00,00 </p>
            <div>
            <button type="button">ver detalhes</button>
            </div>
        </div>
        <div class="conteudoDashboard">
        <img src="/src/assets/img/icons8-porta-da-garagem-aberta-50.png" alt="icone das moedas" width="40" height="40">
        <p>Vagas disponíveis</p>
        <p>  0000 </p>
            <div>
            <button type="button">ver detalhes</button>
            </div>
        </div>
        
    </div>
</div>
</section>

<section class="gestaoVaga">

    <div li v-for="(dados, index) in listaTipos" :key="index"> 
        <div v-if="dados.statuVaga === 'desocupada'">
            <button type="button" class="botaoVaga" @click="entradaVeiculo(dados)">
                    <p class="tipoVaga">{{dados.tipoVaga}} </p>
                    <img src="/src/assets/img/icons8-porta-da-garagem-aberta-50.png" width="40" height="40" alt="">
                    <p class="placa">PLACA</p>
                    <p class="horaEntrada">Entrada: </p>
               </button>
      </div>
    </div>

    <div v-show="telaEntrada === true" class="modalEstacionamento">
        <div class="veiculoCadastrado">
            <label for="">Lista de veiculos: </label>
            <select id="listaVeiculos" size="6" v-model="veiculoSelecionado">
                <option selected disabled>Seleciona a placa</option>    
            </select>
            <div class="botaoEstacionarCancelar">

                <button type="button" @click="EstacionarVeiculo" >Estacionar</button>
                <button type="button" @click="sairTelaVeiculos" >Cancelar</button>
 
            </div>
        </div>
        <div>
            <label for="">Cadastrar novo veiculo: </label>
            <RouterLink to="CadastrarVeiculo.vue"><button type="button">Cadastrar novo veiculo</button></RouterLink>
        </div>
        
    </div>
    
    
</section>
</body>
</template>

<style>
.botaoEstacionarCancelar div{
    display: inline-block;
    
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
.modalEstacionamento ::-webkit-scrollbar-thumb {
  background: rgb(38, 121, 146);
  height: 10px; 
  border-radius: 10px;
}

.modalEstacionamento ::-webkit-scrollbar-thumb:hover {
  background: rgb(98, 196, 226); 
}
.modalEstacionamento{
position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 350px;
  width: 300px;
  padding: 0px;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
    font-family: 'Inria Sans'
}

.modalEstacionamento div {
    display: flex;
    margin: 7px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
}

.modalEstacionamento select {
    border-radius: 5px;
    max-height: 200px; /* Altura limitada */
    overflow-y: auto; /* Ativa a barra de rolagem */
    display: block;
    font-family: 'Inria Sans',
    
    
    
}

.modalEstacionamento option{
    font-size: 14px;
    padding: 5px;
    margin: 2px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 180px;
    text-align: center;

}
.modalEstacionamento option:hover{
    
      background-color: rgb(228, 234, 247)
}
.modalEstacionamento button{
    margin: 5px;
    border-radius: 5px;
    background-color: rgba(21, 88, 116, 1);
    color: #fff;
}

body{
    font-family: 'Inria Sans';font-size: 15px;
    display: flex;
    flex-direction: column;
    margin-bottom: 100%;
    
   
}

.valoresRecebidos{
    background-color: rgba(217, 217, 217, 1);
    width: 292px;
    height: 246px;
    border-radius: 5px;
    padding-top: 20px;
    padding-left: 20px;

}
.valores h2{
    margin-bottom: 5px;
    text-align: center;
}

.dashboard h2{
    
    
    text-align: center;
}
.dashboardGeral{
    display: inline-flex;
    flex-direction: row;
    margin: 0 auto;
    margin: 30% 0 5% 20%;
    align-items: baseline;
    
    
    
    
}
.organizarDashboard{
    display: flex;
    flex-direction: row;
    
    
    
    
}

.conteudoDashboard{
    width: 267px;
    height: 121px;
    background-color: rgba(217, 217, 217, 1);
    margin: 0px 10px 10px 10px;
    border-radius: 5px;
    position: relative;
    
    

}

.organizarDashboard img{
    margin-left: 20px;
    margin-top: 20px;
    margin-right: 10px;
    float: left;
    
}
.organizarDashboard p{
    padding: 5px;
    text-align: center;
    margin-right: 30px;
    margin-top: 2px;
    
        
}
.conteudoDashboard button{
    background-color: rgba(21, 88, 116, 1);
    color: white;
    width: 267px;
    height: 22px;
    border-radius: 0px 0px 5px 5px;
    cursor: pointer;
    text-align: center;
    position: relative;
    bottom: 0px;
    position: absolute;
    bottom: 0px;
    left: 0px;   
    
}
.dashboard h2{
   text-align: center;
   margin-bottom: 12px;
   
    
}

.gestaoVaga{
    background-color: rgba(217, 217, 217, 1);
    width: 1200px;
    height: 700px;
    display: flex;
    border-radius: 15px;
    margin-top: 5%;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 13%;
    margin-right: 15%;
    margin-bottom: 20%;
   
  
}

.tipoVaga{
    font-size: 12px;
    margin: 5px;
    text-align: center;
    
}
.placa{
    margin: 18px;
    font-size: 15px;
    
}
.horaEntrada{
    margin-left: 5px;
    text-align: left;
}

.botaoVaga{
    border: none;
    padding: 0px;
    width: 151px;
    height: 96px;
    background-color: rgba(126, 189, 241, 1);
    margin: 20px;
    justify-content: space-between;  
    border-radius: 5px;
    cursor: pointer;
}

.botaoVaga:hover{
    background-color: rgb(30, 92, 143);

}

.botaoVaga img{
    float: left;
    margin-top: 0px;
    margin-left: 5px;
    margin-right: 5px;
    
}
</style>