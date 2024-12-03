<script setup>

import HeaderGeral from '@/components/HeaderGeral.vue';

</script>

<template>
 
<header>
  <headerGeral></headerGeral>
</header>

<body>
    <h1>Dados  do Estacionamento</h1>

  <form>
   
    <div class="tipoPFPJ">
      <label for="tipoPessa">TIPO DE PESSOA </label>
      <select name="TipoPessoa" id="tipoPessoaEstacionamento">
        <option value="Fisica">Fisica</option>
        <option value="Juridica">Juridica</option>
      </select>
    </div>

    <div class="CPFCNPJRG">
      <label for="CPF_CNPJ">CPF/CNPJ </label>
      <input id="CPF_CNPJ_Estacionamento" type="text" >
      <button type="button" id="botaopesquisaCNPJ"> Pesquisar CNPJ </button>

      <label for="RG_IEEstacionamento"> RG/IE </label>
      <input type="text" id="RG_IEEstacionamento">
    </div>
    <div>
      <label for="nomePessoaEstacionamento"> RAZÃO SOCIAL </label>
      <input type="text" id="nomePessoaEstacionamento"><br>
   </div>
   <div>
    <label for="nomeApelidioEstacionamento"> FANTASIA</label>
    <input type="text" id="nomeApelidioEstacionamento"><br>
   </div>
   <div class="cep">
    <label for="CEPEstacionemento"> CEP </label>
    <input type="text" id="CEPEstacionemento">
    <button type="button"><img src="/src/assets/img/icons8-pesquisa-50.png" width="18" height="18" alt="lupa"> Pesquisar CEP</button>
  </div>
  <div>
    <label for="enderecoEstacionamento">ENDEREÇO</label>
    <input type="text" id="enderecoEstacionamento" >
    <label for="numeroEstacionamento"> NUMERO</label>
    <input type="text" id="numeroEstacionamento"><br>
  </div>
  <div>
    <label for="complementoEstacionamento">COMPLEMENTO</label>
    <input type="text" id="complementoEstacionamento">
    <label for="estado_ufEstacionamento">UF</label>
    <select  id="estado_ufEstacionamento">
      <option value="PE">PE</option>
      <option value="AL">AL</option>
    </select>
  </div>
  <div>
    <label for="bairroEstacionamento">BAIRRO</label>
    <input type="text" id="bairroEstacionamento">
    <label for="cidadeEstacionamento">CIDADE</label>
    <input type="text" id="cidadeEstacionamento" placeholder="cod. IBGE">
    <select id="cidadeEstacionamentoSelect">
      <option value="PALMARES">PALMARES</option>
      <option value="AGUA PRETA">AGUA PRETA</option>
    </select>
  </div>
  <div>
    <label for="emailEstacionamento">EMAIL</label>
    <input type="email" id="emailEstacionamento">
  </div>
  <div>
    <label for="telefoneEstacionamento">TELEFONE/CELULAR</label>
    <input type="tel" id="telefoneEstacionamento">

    <label for="whatsappEstacionamento">WHATS APP</label>
    <input type="tel" id="whatsappEstacionamento">
  </div>
<div class="botaoEstacionamento">
  <button type="submit">ALTERAR</button>
</div>
 </form>

</body>
</template>

<style>


body{
  font-family: 'Inria Sans';font-size: 12px;
  font-weight: bolder;
  padding: 0;
  margin: 0;
}
h1{
  font-size: 40px;
  margin-left: 5%;
  margin-top: 12%;
  margin-bottom: 7%;
}
.pai{
  height: 10em;
  position: relative;
}
form{
  
    position: absolute;
    top: 80%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    justify-content: space-around;
    
}

#tipoPessoaEstacionamento{
  
  width: 200px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
}

#CPF_CNPJ_Estacionamento{
  width: 200px;
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;

}
#RG_IEEstacionamento{
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#botaopesquisaCNPJ{
  width: 140px;
  background-color: rgba(102, 207, 252, 1);
  margin: 0px 5px 5px;
  height: 25px;
  border: none;
  border-radius: 5px;
  
}

#nomePessoaEstacionamento{
  width:540px;
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#nomeApelidioEstacionamento{
  width: 567px;
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}

.cep button{
  width: 140px;
  text-align: center;
  background-color: rgba(102, 207, 252, 1);
  margin: 0px 5px 5px;
  height: 25px;
  border: none;
  border-radius: 5px;
}
.cep img{
  float: left;
  margin-left: 5px;
  margin-right: 5px
  
}
#CEPEstacionemento{
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}

#enderecoEstacionamento{
width: 390px;
margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#numeroEstacionamento{
 width: 110px;
 margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#complementoEstacionamento{
  width: 430px;
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#estado_ufEstacionamento{
  width: 80px;
  text-align: center;
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#bairroEstacionamento{
  width: 250px;
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#cidadeEstacionamento{
width: 100px;
text-align: center;
margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#cidadeEstacionamentoSelect{
width: 169px;
margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#emailEstacionamento{
width: 584px;
margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#telefoneEstacionamento{
  width: 300px;
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
#whatsappEstacionamento{
  width: 145px;
  margin: 0px 5px 5px;
  height: 25px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  border-radius: 5px;
}
.botaoEstacionamento button{
width: 150px;
background-color: rgba(102, 207, 252, 1);
margin: 0px 5px 5px;
  height: 25px;
  border: none;
  border-radius: 5px;
}
.botaoEstacionamento{
  display: flex;
  justify-content: end;
  margin-bottom: 10%;
  
  
}

</style>