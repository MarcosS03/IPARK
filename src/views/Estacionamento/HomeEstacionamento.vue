<script>
import HeaderGeral from '@/components/HeaderGeral.vue';
import DAOService from '@/service/DAOService';
import { onBeforeMount, ref} from 'vue';



const vagaEscolhida = ref();


export default {
    components: {
    HeaderGeral,
  },
  setup() {
 
    const daoVaga = new DAOService('cadastroVaga');

    const listaVagas = ref([]);
    console.log(listaVagas);

    const listaTipos = ref([]);

    onBeforeMount(async() => {
        let vagas = await daoVaga.getAll();
        listaVagas.value = vagas;
   
        listaTipos.value = vagas.flatMap((vagas) =>
         Array.from({ length: vagas.quantidade }, () => vagas.tipoVaga)); 
        
    });

    
    
    const selecionarVaga = (dados)=>{
        vagaEscolhida.value = dados;
        alert(vagaEscolhida.value)
        
    }

    return {
        listaVagas,
        onBeforeMount,
        listaTipos,
        selecionarVaga,
        vagaEscolhida
    };
}
  }
 export {vagaEscolhida};
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

            <RouterLink to="/EstacionarVeiculo" @click="selecionarVaga(dados)"><button type="button" class="botaoVaga">
                    <p class="tipoVaga">{{dados}} </p>
                    <img src="/src/assets/img/icons8-porta-da-garagem-aberta-50.png" width="40" height="40" alt="">
                    <p class="placa">PLACA</p>
                    <p class="horaEntrada">Entrada: </p>
               </button></RouterLink>
      
    </div>
    
    
</section>
</body>
</template>

<style>

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