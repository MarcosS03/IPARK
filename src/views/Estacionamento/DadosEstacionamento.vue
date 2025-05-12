<script setup>

import HeaderGeral from '@/components/HeaderGeral.vue';
import DAOService from '@/service/DAOService';
import { onBeforeMount, onMounted, ref } from 'vue';

const daoEstacionamento = new DAOService('dadosEstacionamento')
//falta ajustar a função alterar, quando tento modificar algum item do formulario o restante some da tela,
//e quando clica em alterar, é enviada para o banco apenas a a alteração, sem os demais itens.

const dadosEstacionamento = ref({
  tipoPessoa: '',
  CPF_CNPJ: '',
  RG_IE: '',
  razao_social: '',
  nome_fantasia: '',
  cep: '',
  uf:'',
  bairro: '',
  cidade: '',
  endereço: '',
  numero: '',
  complemento: '',
  email: '',
  telefone: [],
  whatsApp: []


});

let idEstacionamento = '';
console.log(idEstacionamento)

onBeforeMount (async () => {
    //pega lista de vagas do banco
    let vagas = await daoEstacionamento.getAll();

    //pega o ID do select para inserir os option
    //let tipoVaga = document.getElementById('listarVagas');

    //inetração para inserir os tipos de vagas no option, e criar o option do select
    vagas.forEach(function(dados){
        
      document.querySelector('#tipoPessoaEstacionamento').value = dados.tipoPessoa;
      document.querySelector('#CPF_CNPJ_Estacionamento').value = dados.CPF_CNPJ;
      document.querySelector('#RG_IEEstacionamento').value = dados.RG_IE;
      document.querySelector('#nomePessoaEstacionamento').value = dados.razao_social;
      document.querySelector('#nomeApelidioEstacionamento').value =dados.nome_fantasia;
      document.querySelector('#CEPEstacionemento').value = dados.cep;
      document.querySelector('#enderecoEstacionamento').value = dados.endereço;
      document.querySelector('#bairroEstacionamento').value = dados.bairro;
      document.querySelector('#numeroEstacionamento').value = dados.numero;
      document.querySelector('#estado_ufEstacionamento').value  = dados.uf;
      document.querySelector('#cidadeEstacionamentoSelect').value = dados.cidade;
      document.querySelector('#complementoEstacionamento').value = dados.complemento;
      document.querySelector('#emailEstacionamento').value = dados.email;
      document.querySelector('#telefoneEstacionamento').value = dados.telefone;
      document.querySelector('#whatsappEstacionamento').value = dados.whatsApp;
      

    })
});

onMounted (async () =>{

let vagas =await daoEstacionamento.getAll();

vagas.forEach(function(dados){
        
        idEstacionamento = dados.id
  
      })
  });


const salvar = async()=>{
  await daoEstacionamento.insert(dadosEstacionamento.value)
  alert('cadastro salvo com sucesso')
  
}
console.log(dadosEstacionamento.value)
const alterar =async ()=>{
  await daoEstacionamento.update(idEstacionamento, dadosEstacionamento.value);
  console.log(dadosEstacionamento.tipoPessoa)
  alert('Alterações gravadas com sucesso!!!')

}




</script>

<template>
 
<header>
  <headerGeral></headerGeral>
</header>

<body>
    <h1>Dados  do Estacionamento</h1>

  <div class="divForm">
   
    <div class="tipoPFPJ">
      <label for="tipoPessa">TIPO DE PESSOA </label>
      <select name="TipoPessoa" id="tipoPessoaEstacionamento" v-model="dadosEstacionamento.tipoPessoa">
        <option value="Fisica">Fisica</option>
        <option value="Juridica">Juridica</option>
      </select>
    </div>

    <div class="CPFCNPJRG">
      <label for="CPF_CNPJ">CPF/CNPJ </label>
      <input id="CPF_CNPJ_Estacionamento" type="text" v-model="dadosEstacionamento.CPF_CNPJ" value="dadosEstacionamento.CPF_CNPJ">
      <button type="button" id="botaopesquisaCNPJ"> Pesquisar CNPJ </button>

      <label for="RG_IEEstacionamento"> RG/IE </label>
      <input type="text" id="RG_IEEstacionamento" v-model="dadosEstacionamento.RG_IE">
    </div>
    <div>
      <label for="nomePessoaEstacionamento"> RAZÃO SOCIAL </label>
      <input type="text" id="nomePessoaEstacionamento" v-model="dadosEstacionamento.razao_social">
   </div>
   <div>
    <label for="nomeApelidioEstacionamento"> FANTASIA</label>
    <input type="text" id="nomeApelidioEstacionamento" v-model="dadosEstacionamento.nome_fantasia">
   </div>
   <div class="cep">
    <label for="CEPEstacionemento"> CEP </label>
    <input type="text" id="CEPEstacionemento" v-model="dadosEstacionamento.cep">
    <button type="button"><img src="/src/assets/img/icons8-pesquisa-50.png" width="18" height="18" alt="lupa"> Pesquisar CEP</button>
  </div>
  <div>
    <label for="enderecoEstacionamento">ENDEREÇO</label>
    <input type="text" id="enderecoEstacionamento" v-model="dadosEstacionamento.endereço">
    <label for="numeroEstacionamento"> NUMERO</label>
    <input type="text" id="numeroEstacionamento" v-model="dadosEstacionamento.numero">
  </div>
  <div>
    <label for="complementoEstacionamento">COMPLEMENTO</label>
    <input type="text" id="complementoEstacionamento" v-model="dadosEstacionamento.complemento">
    <label for="estado_ufEstacionamento">UF</label>
    <select  id="estado_ufEstacionamento" v-model="dadosEstacionamento.uf">
      <option value="PE">PE</option>
      <option value="AL">AL</option>
    </select>
  </div>
  <div>
    <label for="bairroEstacionamento">BAIRRO</label>
    <input type="text" id="bairroEstacionamento" v-model="dadosEstacionamento.bairro">
    <label for="cidadeEstacionamento">CIDADE</label>
    <input type="text" id="cidadeEstacionamento" placeholder="cod. IBGE">
    <select id="cidadeEstacionamentoSelect" v-model="dadosEstacionamento.cidade">
      <option value="PALMARES">PALMARES</option>
      <option value="AGUA PRETA">AGUA PRETA</option>
    </select>
  </div>
  <div>
    <label for="emailEstacionamento">EMAIL</label>
    <input type="email" id="emailEstacionamento" v-model="dadosEstacionamento.email">
  </div>
  <div>
    <label for="telefoneEstacionamento">TELEFONE/CELULAR</label>
    <input type="tel" id="telefoneEstacionamento" v-model="dadosEstacionamento.telefone">

    <label for="whatsappEstacionamento">WHATS APP</label>
    <input type="tel" id="whatsappEstacionamento" v-model="dadosEstacionamento.whatsApp">
  </div>
<div class="botaoEstacionamento">
  <button type="button" @click="alterar">Alterar</button>
  <button type="button" @click="salvar">salvar</button>
</div>
</div>

</body>
</template>

<style scoped>

button, input, select{
  
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;

}
body{
  font-family: 'Inria Sans';font-size: 12px;
  font-weight: bolder;
  padding: 0;
  margin: 0;
}
h1{
  font-size: 40px;
  margin-left: 7%;
  margin-top: 12%;
  margin-bottom: 7%;
  width: max-content;
}
.pai{
  height: 10em;
  position: relative;
  justify-content: space-around;
}
.divForm{
  
    position: absolute;
    top: 80%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  
   
    
}

#tipoPessoaEstacionamento{
  
  width: 200px;
  height: 25px;
  
}

#CPF_CNPJ_Estacionamento{
  width: 200px;
  

}

#botaopesquisaCNPJ{
  width: 140px;
  background-color: rgba(102, 207, 252, 1);
  
  
}

#nomePessoaEstacionamento{
  width:545px;
  
}
#nomeApelidioEstacionamento{
  width: 578px;

}
.cep{
  display: flex;
}
.cep button{
  width: 140px;
  text-align: center;
  background-color: rgba(102, 207, 252, 1);
  
}
.cep img{
  float: left;
  margin-left: 5px;
  margin-right: 5px
  
}


#enderecoEstacionamento{
width: 390px;
}
#numeroEstacionamento{
 width: 103px;
 
}
#complementoEstacionamento{
  width: 430px;
 
}
#estado_ufEstacionamento{
  width: 80px;
  text-align: center;

}
#bairroEstacionamento{
  width: 250px;

}
#cidadeEstacionamento{
width: 100px;
text-align: center;

}
#cidadeEstacionamentoSelect{
width: 169px;
text-align: center;

}
#emailEstacionamento{
width: 600px;

}
#telefoneEstacionamento{
  width: 280px;

}
#whatsappEstacionamento{
  width: 145px;

}
.botaoEstacionamento button{
width: 150px;
background-color: rgba(102, 207, 252, 1);

}
.botaoEstacionamento{
  display: flex;
  justify-content: end;
  margin-bottom: 10%;
  
  
}

</style>