<script>
import HeaderGeral from '@/components/HeaderGeral.vue';
import DAOService from '@/service/DAOService';
import { onBeforeMount, onMounted, ref, transformVNodeArgs} from 'vue';



export default {
    components: {
    HeaderGeral,

  },
  
  setup() {
    const isModalOpen = ref(false)
    const  daoVeiculo = new DAOService('veiculos');
    const daoEstaciona = new DAOService('veiculoEstacionado');
    const daoDados = new DAOService('daoDadosVagas');
    const daoveiculoLiberado = new DAOService('daoveiculoLiberado');

    const listaVagas = ref([]);


    const listaTipos = ref([]);
   
    //recebe dados dos veiculos
    const listaVeiculo = ref ([]);

    const telaEntrada =  ref('false');
    const telaSaida = ref('false');
    const telaPagamento = ref('false');

    const veiculoSelecionado = ref();

    const tv = ref ();

    const listVeiculoLiberados = ref([]);
    const recDinheiroDia = ref(0);
    const recDebitoDia = ref(0);
    const recCreditoDia = ref(0);
    const recPixDia = ref(0);
    const recValorTotalMes = ref(0);
    const ticketMedio = ref(0);
    const quantidadeVeiEstacionados = ref(0);
    const quantidadeVagaLivre = ref(0);

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
            dataEntrada: '',
            dataSaida: '',
            HoraEntrada: '',
            HoraSaida: '',
            statuVaga: '',
            valorPago: '',
            tempoPermanecia: ''
        })

    onBeforeMount(async() => {
        //alimenta a lista com todas as vagas disponiveis no banco
        let lista = await fetch("http://localhost:8080/ListaVagas/ListaVagas");
        let listaVagas = await lista.json();

        //lista para saber a quantidade de veiculos estacionados.
        listVeiEstacionados.value  = await daoEstaciona.getAll();
        quantidadeVeiEstacionados.value = listVeiEstacionados.value.length;
        
       


        listaTipos.value = listaVagas;
        //for para converter getTime para hora.
        for (const h of listaTipos.value){
            if(h.HoraEntrada!== undefined){
                let hora = h.HoraEntrada;

                const horaFormatadaEntrada = new Date(hora);

                const formatador = new Intl.DateTimeFormat("pt-BR", {
                
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
                h.HoraEntrada = formatador.format(horaFormatadaEntrada);
            }
        }

        
        //quantidade de vagas livres
        quantidadeVagaLivre.value = listaTipos.value.length - quantidadeVeiEstacionados.value;

        
        listVeiculoLiberados.value = await daoveiculoLiberado.getAll();
        
        function converteMes (data){
        
            const dataM = data
                .split('/') 
                .map(part => part.trim())
                .filter(part => part);
        return dataM;
        }

        let quantidadeVeiculos = 0;
        //for para inserir veiculos liberados no mes atual
        for( const lvl of listVeiculoLiberados.value ){

            let dataMes = converteMes(lvl.veiculoEstacionado.dataSaida)
            let dataA = dataAtual;
            let dataMesAtual = converteMes(dataA);

            //verificar o mes atual e data do dia, alimentando a lista do mes e recebimentos do dia
            if(dataMes[1] === dataMesAtual[1]){
            let vlt = converterParaNumero(lvl.formaPagamento.valorTotal)
            recValorTotalMes.value += vlt;
            quantidadeVeiculos ++;
                if(dataMes[0] === dataMesAtual[0]){
                    if(lvl.formaPagamento.pix){
                        let p = converterParaNumero(lvl.formaPagamento.pix);
                        recPixDia.value += p;
                    }
                    if(lvl.formaPagamento.dinheiro){
                        let d = converterParaNumero(lvl.formaPagamento.dinheiro);
                        recDinheiroDia.value += d;
                        
                    }
                    if(lvl.formaPagamento.debito){
                        let db = converterParaNumero(lvl.formaPagamento.debito);
                        recDebitoDia.value += db;
                    }
                    if(lvl.formaPagamento.credito){
                        let cd = converterParaNumero(lvl.formaPagamento.credito);
                        recCreditoDia.value += cd;
                    }
                }
            }
            
        }
        //formata o valor para duas casas decimais
        recValorTotalMes.value = parseFloat(recValorTotalMes.value.toFixed(2));

        //ticktMedio 
        ticketMedio.value = recValorTotalMes.value / quantidadeVeiculos;
        ticketMedio.value = parseFloat(ticketMedio.value.toFixed(2));

        //convertendo os valores para moeda
        recValorTotalMes.value = moedaFormatada(recValorTotalMes.value);
        recCreditoDia.value = moedaFormatada(recCreditoDia.value);
        recDebitoDia.value = moedaFormatada( recDebitoDia.value);
        recDinheiroDia.value = moedaFormatada(recDinheiroDia.value);
        recPixDia.value = moedaFormatada(recPixDia.value)
        ticketMedio.value = moedaFormatada(ticketMedio.value)
    });

    function convertGetTimeHora (time){
                let hora = time;

                const horaFormatadaEntrada = new Date(hora);

                const formatador = new Intl.DateTimeFormat("pt-BR", {
                
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
                return formatador.format(horaFormatadaEntrada);     
    
    }

    function moedaFormatada (valor){
        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        return valorFormatado.format(valor);
    }
    function converterParaNumero(valor){
      // Remove caracteres de formatação e converte para número
      const numero = parseFloat(valor.replace(/[^\d]/g, "")) || 0;
      return numero / 100;
    }

    onMounted (async()=> {
        
        let lv = await daoVeiculo.getAll();
        listaVeiculo.value = lv;
        //pega o ID do select para inserir os option
        let veiculo = document.getElementById('listaVeiculos');

        //interação para inserir os tipos de vagas no option, e criar o option do select
        lv.forEach(function(veiculos){
            let p = veiculos.placa;
            let m = veiculos.modelo;
            let item = document.createElement('Option');
            item.text = `${p} - ${m}`;
            
            //Estilizar o option direto no css não deu certo, pois apenas o option adicionado no html estva sendo estilizado
            item.style.cssText = "font-size: 14px; padding: 5px; margin: 2px; border: 1px solid #ddd; border-radius: 5px; width: 180px; text-align: center";
            item.addEventListener('mouseover', () => item.style.backgroundColor = 'rgb(228, 234, 247)');
            item.addEventListener('mouseout', () => item.style.backgroundColor = '#ffffff');  
            veiculo.appendChild(item);  
        });

        
    })
    
    let hoje = new Date()
    const dataAtual = formatDate(hoje);

    function formatDate(date) {
    let dia = date.getDate()
    let mes = [
    'janeiro', 'fevereiro', 'março', 'abril',
    'maio', 'junho', 'julho', 'agosto', 'setembro', 
    'outubro', 'novembro', 'dezembro'
    ][date.getMonth()]
    let ano = date.getFullYear()
  
    return `${dia}/ ${mes}/ ${ano}`
    }

    const hora = hoje.getTime()

    const entradaVeiculo = (dados) =>{
        telaEntrada.value = true;
        tv.value = dados;
        isModalOpen.value = true;
        console.log(dados)
        
    }

    const sairTela = () =>{
        telaEntrada.value = false;
        isModalOpen.value = false;
        telaSaida.value =  false;
        telaPagamento.value = false;
    }

    const dadosSaida = ref('')
    const hs = ref('');
  
    const horaPermaneciaLiberarVeiculo = ref('');
    const valorPagar = ref('');

    const saidaVeiculo =async (dados) =>{
        //overlay
        telaSaida.value = true;
        isModalOpen.value = true;



        dadosSaida.value = dados;

        let hoje = new Date()
        const h = hoje.getTime()
        let horaS = h;

        hs.value = convertGetTimeHora(horaS)
        
        let dadosVeiculo = await daoDados.get(dados.id);

        let horaEntrada = dadosVeiculo.HoraEntrada;

        let horaPermanecia = (horaS - horaEntrada)
        
        const horasMinuto = (horaPermanecia / (1000 * 60 * 60));
        console.log(horasMinuto)
        const horas = Math.floor(horaPermanecia / (1000 * 60 * 60));
        const minutos = Math.floor((horaPermanecia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((horaPermanecia % (1000 * 60)) / 1000);

        horaPermaneciaLiberarVeiculo.value = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  
        //calcula o valor, e formata-o para R$
        let valorTempo  = dadosVeiculo.valorHora * horasMinuto
        console.log(dadosVeiculo.valorHora)
        valorPagar.value = moedaFormatada(valorTempo);


        //alimentar const dadosVeiEst com novos valores
        dadosVeiEst.value.HoraSaida = hs.value;
        dadosVeiEst.value.HoraEntrada = dadosSaida.value.HoraEntrada;
        dadosVeiEst.value.tempoPermanecia = horaPermaneciaLiberarVeiculo.value;
        dadosVeiEst.value.statuVaga = 'desocupada';
        dadosVeiEst.value.valorPago = valorPagar.value; 
        dadosVeiEst.value.dataSaida = dataAtual;
        dadosVeiEst.value.tipoVaga = dadosSaida.value.tipoVaga;
        dadosVeiEst.value.placa = dadosSaida.value.placa;
        dadosVeiEst.value.chassi = dadosSaida.value.chassi;
        dadosVeiEst.value.renavam = dadosSaida.value.renavam;
        dadosVeiEst.value.modelo = dadosSaida.value.modelo;
        dadosVeiEst.value.fabricante = dadosSaida.value.fabricante;
        dadosVeiEst.value.anoFabricacao = dadosSaida.value.anoFabricacao;
        dadosVeiEst.value.anoModelo = dadosSaida.value.anoModelo;
        dadosVeiEst.value.cor = dadosSaida.value.cor;
        dadosVeiEst.value.potencia = dadosSaida.value.potencia;
        dadosVeiEst.value.capacidade = dadosSaida.value.capacidade;
        dadosVeiEst.value.dataEntrada = dadosSaida.value.dataEntrada;
        console.log(VeiculoLiberado.value)
        
    }
    const listVeiEstacionados = ref([]);

    const efetuaPagamento = async ()=>{
        await sairTela();
        telaPagamento.value = true;
        isModalOpen.value = true;
        
    }
    const formaPagamento = ref ({
            dinheiro: '',
            debito: '',
            credito: '',
            pix: '',
            valorTotal: ''
    });

    const VeiculoLiberado = ref({
        veiculoEstacionado: dadosVeiEst,
        formaPagamento: formaPagamento.value
       
    })
    const verificarFormaPagamento = async()=>{
        if(formaPagamento.value.dinheiro){
        let numeroLimpo = formaPagamento.value.dinheiro.replace(/\D/g, "");
        formaPagamento.value.dinheiro = (Number(numeroLimpo) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }
    if(formaPagamento.value.debito){
        let numeroLimpo = formaPagamento.value.debito.replace(/\D/g, "");
        formaPagamento.value.debito = (Number(numeroLimpo) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }
    if (formaPagamento.value.credito){
        let numeroLimpo = formaPagamento.value.credito.replace(/\D/g, "");
        formaPagamento.value.credito = (Number(numeroLimpo) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }
    if(formaPagamento.value.pix){
        let numeroLimpo = formaPagamento.value.pix.replace(/\D/g, "");
        formaPagamento.value.pix = (Number(numeroLimpo) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }

    //converte o valor de objet para string, logo depois numero e soma para ter o valor total.
    let dadosPagamento = formaPagamento.value;

    let d = dadosPagamento.dinheiro.toString();
    let cd = dadosPagamento.debito.toString();
    let cc = dadosPagamento.credito.toString();
    let p = dadosPagamento.pix.toString();


    let dinheiro = converterParaNumero(d);
    let debito = converterParaNumero(cd);
    let credito = converterParaNumero(cc);
    let pix =  converterParaNumero(p);
    
    let valorT = moedaFormatada(dinheiro + debito + credito + pix)
    formaPagamento.value.valorTotal = valorT;
    }

 
    const finalizarPagamento = async (dados) =>{
        
        let veiEstacionado = listVeiEstacionados.value.find(v => v.tipoVaga.id === dados.id)
        
        /*veiEstacionado.HoraEntrada = dadosVeiEst.value.HoraEntrada;
        veiEstacionado.HoraSaida = dadosVeiEst.value.HoraSaida;
        veiEstacionado.statuVaga = dadosVeiEst.value.statuVaga;
        veiEstacionado.tempoPermanecia = dadosVeiEst.value.tempoPermanecia;
        veiEstacionado.valorPago =  dadosVeiEst.value.valorPago;
        veiEstacionado.dataSaida = dataAtual;*/

        dadosVeiEst.value.dataSaida = dataAtual
        
        await daoDados.set(dados.id, dados.tipoVaga);

        await daoEstaciona.delete(veiEstacionado.id);

        await daoveiculoLiberado.insert(VeiculoLiberado.value)
        location.reload();
    }


    //pegar o veiculo selecionado, e salva na coleção veiculoestacionado.
    //da um update no dados da vaga.
    const EstacionarVeiculo = async() =>{
        //variavel pega pega a string a tranforma em uma lista, onde o primeiro elemtno é a placa
        let vs = veiculoSelecionado.value.split(" ");
        let veiculo = listaVeiculo.value.find(v => v.placa.includes(vs[0])) //primeiro elemento

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
        dadosVeiEst.value.dataEntrada = dataAtual;
        dadosVeiEst.value.HoraEntrada = hora;
        dadosVeiEst.value.HoraSaida = '';
        dadosVeiEst.value.statuVaga = 'ocupado';
        dadosVeiEst.value.valorPago = '';
        dadosVeiEst.value.tempoPermanecia = '';

        // tv o tela de entrada veiculo, pega o veiculo que vai entrar no estacionamento
        await daoDados.update(tv.value.id, dadosVeiEst.value)
        
        await daoEstaciona.insert(dadosVeiEst.value);
        alert('Veiculo estacionado');
        await sairTela();
        location.reload();
    }

   

    return {
        listaVagas,
        onBeforeMount,
        listaTipos,
        telaEntrada,
        entradaVeiculo,
        listaVeiculo,
        onMounted,
        sairTela,
        EstacionarVeiculo,
        dadosVeiEst,
        veiculoSelecionado,
        formatDate,
        dataAtual,
        hora,
        daoEstaciona,
        daoDados,
        saidaVeiculo,
        telaSaida,
        dadosSaida,
        hs,
        convertGetTimeHora,
        horaPermaneciaLiberarVeiculo,
        valorPagar,
        efetuaPagamento,
        isModalOpen,
        finalizarPagamento,
        telaPagamento,
        formaPagamento,
        VeiculoLiberado,
        verificarFormaPagamento,
        daoveiculoLiberado,
        converterParaNumero,
        listVeiculoLiberados,
        recDinheiroDia, recDebitoDia, recCreditoDia, recPixDia, recValorTotalMes, ticketMedio, quantidadeVeiEstacionados,quantidadeVagaLivre

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

<section class="dashboardGeral" :class="{ 'inactive': isModalOpen }">
    <div class="valores">
        <h2>Valores recebidos do dia</h2>
        <div class="valoresRecebidos">
            <p>{{ recDinheiroDia }} dinheiro</p>
            <p>{{recPixDia}} PIX</p>
            <p>R$ 00,00 APP</p>
            <p>{{recCreditoDia}} cartão de crédito</p>
            <p>{{recDebitoDia}} cartão de débito</p>
        </div>
    </div>
    <div class="dashboard">
        <h2>DASHBOARD</h2>
    <div class="organizarDashboard">
        <div class="conteudoDashboard">
            
            <img src="/src/assets/img/icons8-vendas-50.png" alt="icone das moedas" width="40" height="40">
            
            <p>Valores recebidos</p>
             <p>{{recValorTotalMes}}</p>
            
            <button type="button" @click="veiculo">acumulado do inicio do mês</button>
            
        </div>
        <div class="conteudoDashboard">
        <img src="/src/assets/img/icons8-receber-50.png" alt="icone das moedas" width="40" height="40">
        <p>Ticket médio</p>
        <p>{{ticketMedio}}</p>
            <div>
            <button type="button">média de recebimentos do mês </button>
            </div>
        </div>
        <div class="conteudoDashboard">
        <img src="/src/assets/img/icons8-carros-50.png" alt="icone das moedas" width="40" height="40">
        <p>veiculos estacionados</p>
        <p> {{ quantidadeVeiEstacionados }} </p>
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
        <p>  {{ quantidadeVagaLivre }} </p>
            <div>
            <button type="button">ver detalhes</button>
            </div>
        </div>
        
    </div>
</div>
</section>

<section class="gestaoVaga">

    <div li v-for="(dados, index) in listaTipos" :key="index" :class="{ 'inactive': isModalOpen }"> 
        <div v-if="dados.statuVaga === 'desocupada'">
            <button type="button" class="botaoVaga" @click="entradaVeiculo(dados)">
                <p class="tipoVaga">{{dados.tipoVaga}} </p>
                <img src="/src/assets/img/icons8-porta-da-garagem-aberta-50.png" width="40" height="40" alt="">
                <p class="placa">PLACA</p>
                <p class="horaEntrada">Entrada: </p>
            </button>
      </div>
      <div v-if="dados.statuVaga === 'ocupado'" :class="{ 'inactive': isModalOpen }">
        <button type="button" class="botaoVaga" @click="saidaVeiculo(dados)">
            <p class="tipoVaga">{{dados.tipoVaga.tipoVaga}}</p>
            <img src="/src/assets/img/icons8-estacionamentovagaocupada-50.png" width="40" height="40" alt="">
            <p class="placaVagaOcupada">{{dados.placa}}</p>
            <p class="horaEntrada">Entrada: {{dados.HoraEntrada}}</p>
        </button>
      </div>
    </div>

    <div v-show="telaEntrada === true" class="modalEstacionamento">
        <div class="veiculoCadastrado">
            <label for="">Lista de veiculos: </label>
            <select id="listaVeiculos" size="6" v-model="veiculoSelecionado">
                <option selected disabled class="option">Seleciona a placa</option>    
            </select>
            <div class="botaoEstacionarCancelar">

                <button type="button" @click="EstacionarVeiculo" >Estacionar</button>
                <button type="button" @click="sairTela" >Cancelar</button>
 
            </div>
        </div>
        <div>
            <label for="">Cadastrar novo veiculo: </label>
            <RouterLink to="CadastrarVeiculo"><button type="button">Cadastrar novo veiculo</button></RouterLink>
        </div>
        <div v-if="isModalOpen" class="overlay"></div>
    </div>

    <div v-show="telaSaida === true" class="modalEstacionamentoSaida">
        <h1>Saída de estacionamento</h1>
        <div>
            <p>Veiculo: {{ dadosSaida.modelo }}</p>
            <p>Placa: {{ dadosSaida.placa }}</p>
            <p>Ano: {{ dadosSaida.anoModelo }}</p>
            <p>Hora de entrada: {{ dadosSaida.HoraEntrada }} ({{ dadosSaida.dataEntrada }})</p>
            <p>Hora de saída: {{hs}}</p>
            <p>Tempo de permanência: {{ horaPermaneciaLiberarVeiculo }} </p>
            <p>Valor a pagar: {{ valorPagar}}</p>
        </div>
        <div class="botaoEfetuarPagamento">
            <button type="button" @click="efetuaPagamento(dadosSaida)"> Efetuar recebimento</button>
            <button type="button" @click="sairTela">cancelar</button>
        </div>
        
    </div>

    <div v-show="telaPagamento === true" class="modalEstacionamentoSaida">
        <h1>Tipo de pagamento:</h1>
        <h2>{{valorPagar}}</h2>
        <div class="telaPagamento">
            <label for="dinehiro"> Dinheiro: 
                <input type="text" id="dinheiro" v-model="formaPagamento.dinheiro" @input="verificarFormaPagamento()">
            </label>
            <label for="cartCredito"> Crédito:
                <input type="text" id="credito" v-model="formaPagamento.credito" @input="verificarFormaPagamento()">
            </label>
            <label for="cartDebito"> Débito: 
                <input type="text" id="debito" v-model="formaPagamento.debito" @input="verificarFormaPagamento()">
            </label>
            <label for="pix"> Pix: 
                <input type="text" id="pix" v-model="formaPagamento.pix" @input="verificarFormaPagamento()">
            </label>
        </div>

        <div class="botaoPagamento">
            <button type="button" @click="finalizarPagamento(dadosSaida)"> Finalizar pagamento</button>
            <button type="button" @click="sairTela">cancelar</button>
        </div>        
    </div>

    
</section>
</body>
</template>

<style scoped>
.inactive {
  pointer-events: none; /* Bloqueia cliques */
  opacity: 0.5; /* Esmaece */
}
.botaoEstacionarCancelar div{
    display: inline-block;
    
}
::-webkit-scrollbar {
  width: 8px;
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
    font-family: 'Inria Sans';   
    
}

.option{
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

.modalEstacionamentoSaida{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 350px;
    width: 300px;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    font-family: 'Inria Sans'
}
.modalEstacionamentoSaida h1{
    text-align: center;
}
.modalEstacionamentoSaida h2{
    text-align: center;
}
.modalEstacionamentoSaida div{
    margin-left: 3%;
}
.botaoEfetuarPagamento{
    display: flex;
    align-items: center;
    justify-content: center;

}
.botaoEfetuarPagamento button{
    margin: 2%;
    background-color: rgba(21, 88, 116, 1);
    color: #fff;
    border-radius: 5px;
}
.telaPagamento{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 45%;
    transform: translate(-49%, -50%);
}

.botaoPagamento{
    margin-top: 70%;
    display: flex;
    justify-content: center;
}.botaoPagamento button{
    margin: 2%;
    background-color: rgba(21, 88, 116, 1);
    color: #fff;
    border-radius: 5px;
}
body{
    font-family: 'Inria Sans';font-size: 15px;
    display: flex;
    flex-direction: column;
    margin-bottom: 100%;
    margin-left: auto;
    margin-right: auto;
   
    
   
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
    margin-top: 10%;
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
    height: auto;
    display: flex;
    border-radius: 15px;
    margin-top: 5%;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    align-content: flex-start;
  
}

.vaga{
    margin-bottom: 5%;
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
.placaVagaOcupada{
    margin: 18px;
    font-size: 15px;
    font-weight: bolder;
    
}
.horaEntrada{
    margin-left: 10px;
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