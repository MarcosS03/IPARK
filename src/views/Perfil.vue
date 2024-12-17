<script setup>

import headerGeral from '../components/HeaderGeral.vue'

</script>

<template>
<header>
  <headerGeral></headerGeral>
</header>

<body>
  <div class="titulo">
    <h1>Cadastro de pessoas</h1>
  </div>

 <form action="">
  <div>
    <label for="tipoPessa">TIPO DE PESSOA </label>
    <select name="TipoPessoa" id="tipoPessoa">
      <option value="Fisica">Fisica</option>
      <option value="Juridica">Juridica</option>
    </select>
  </div>
  <div>
    <label for="CPF_CNPJ">CPF/CNPJ </label>
    <input id="CPF_CNPJ" type="text" >
    <button type="button" id="botaopesquisaCNPJ"> Pesquisar CNPJ </button>
  
    <label for="RG_IE"> RG/IE </label>
    <input type="text" id="RG_IE">
  </div> 
  <div>
    <label for="nomePessoa"> NOME </label>
    <input type="text" id="nomePessoa">
  </div>
  <div>
    <label for="nomeApelidio"> APELIDIO</label>
    <input type="text" id="nomeApelidio">
  </div>
  <div class="cep">
    <label for="CEP"> CEP </label>
    <input type="text" id="CEP">
    <button type="button"><img src="../assets/img/icons8-pesquisa-50.png" width="21" height="21" alt="lupa"> Pesquisar CEP</button>
  </div> 
  <div>
    <label for="endereco">ENDEREÇO</label>
    <input type="text" id="endereco" >
    <label for="numero"> NUMERO</label>
    <input type="text" id="numero">
  </div>
  <div>
    <label for="complemento">COMPLEMENTO</label>
    <input type="text" id="complemento">
    <select  id="estadu_uf">
      <option value="PE">Pernambuco</option>
      <option value="AL">Alagoas</option>
    </select>
  </div>
  <div>
    <label for="bairro">BAIRRO</label>
    <input type="text" id="bairro">
    <label for="cidade">CIDADE</label>
    <input type="text" id="cidade" placeholder="cod. IBGE">
    <select id="cidadeSelect">
      <option value="PALMARES">PALMARES</option>
      <option value="AGUA PRETA">AGUA PRETA</option>
    </select>
  </div>
  <div>
    <label for="telefone">TELEFONE/CELULAR</label>
    <input type="tel" id="telefone">

    <label for="whatsapp">WHATS APP</label>
    <input type="tel" id="whatsapp">
  </div>
  <div class="VeiculosVinculados">
    <p>VEICULOS VINCULADOS </p>
    <iframe src="" name="frame_veiculos_vinculados"></iframe><br>
  </div>
  <div>
    <label for="vincular_veiculo"> VINCULAR VEICULO</label>
    <input type="text" id="vincular_veiculo">
    <button type="button" id="botaovincular">VINCULAR</button>
    <button type="button" id="cadastroVeiculo">CADASTRAR NOVO VEICULO</button>
  </div>
 
   <div class="botaoSalvar">
   <button type="button">Salvar</button>
  </div>

 </form>
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
.titulo{
  margin-top: 50%;

}

h1{
  font-size: 40px;
  margin-left: 10%;
  width: max-content;
 
}
.pai{
  height: 10em;
  position: relative;
  justify-content: space-around;
}
form{
  
    position: absolute;
    top: 90%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  
   
    
}

#tipoPessoa{
  margin-top: 15%;
  width: 200px;
  height: 25px;
  
}

#CPF_CNPJ{
  width: 200px;
  

}

#botaopesquisaCNPJ{
  width: 140px;
  background-color: rgba(102, 207, 252, 1);
  
  
}

#nomePessoa{
  width:595px;
  
}
#nomeApelidio{
  width: 578px;

}
.cep{
  display: flex;
}
.cep button{
  width: 140px;
  text-align: center;
  background-color: rgba(102, 207, 252, 1);
  margin-bottom: 5px;
  
}
.cep img{
  float: left;
  margin-left: 5px;
  margin-right: 5px;
 
  
}


#endereco{
width: 390px;
}
#numero{
 width: 103px;
 
}
#complemento{
  width: 430px;
 
}
#estado_uf{
  width: 80px;
  text-align: center;

}
#bairro{
  width: 250px;

}
#cidade{
width: 100px;
text-align: center;

}
#cidadeSelect{
width: 169px;

}
#email{
width: 600px;

}
#telefone{
  width: 280px;

}
#whatsapp{
  width: 142px;

}
.botaoSalvar button{
width: 150px;
background-color: rgba(102, 207, 252, 1);

}
.botaoSalvar{
  display: flex;
  justify-content: end;
  margin-bottom: 10%;
  
  
}
.VeiculosVinculados iframe{
border: none;
border-radius: 15px;
background-color: rgba(217, 217, 217, 1);
width: 650px;
height:86px;
}
.VeiculosVinculados p{
  margin-bottom: 7px;
  font-weight: bolder;
}

#vincular_veiculo{
  width: 200px;
}
#botaovincular{
  width: 100px;
  background-color: rgba(102, 207, 252, 1);
}
#cadastroVeiculo{
  background-color: rgba(102, 252, 177, 1);
}
</style>