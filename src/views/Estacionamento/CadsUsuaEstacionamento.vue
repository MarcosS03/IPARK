<script setup>
import HeaderGeral from '@/components/HeaderGeral.vue';
</script>

<template>

<headerGeral></headerGeral>
<body>
  
<section class="opcionaisCadastroUsuario">
    <div class="dadosUsuario">
       <RouterLink to="/CadsUsuaEstacionamento.vue"><img src="/src/assets/img/icons8-document-writer-50.png" alt="icone pessoa"></RouterLink>
        <p>geral</p>
    </div>
    <div class="permissoesUsuario">
       <RouterLink to="/PermissoesUsuario.vue"><img src="/src/assets/img/icons8-cadastro-60.png" width="50" height="50" alt="permissoes"></RouterLink>
        <p>permissoes</p>
    </div>
</section>


<section class="dadosUsuario">
  <div class="titulo">
    <h1>USUARIO</h1>
  </div>

 <form action="">
  
  <div class="CPFRG">
    <div>
    <label for="CPF">CPF</label>
    <input id="CPF" type="text" >
  </div>
  <div>
    <label for="RG_IE"> RG/IE </label>
    <input type="text" id="RG_IE">
  </div>
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
    <button type="button"><img src="/src/assets/img/icons8-pesquisa-50.png" width="21" height="21" alt="lupa"> Pesquisar CEP</button>
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

   <div class="botaoSalvar">
   <button type="button">Salvar</button>
  </div>

 </form>
</section>
</body>

</template>

<style scoped>
.CPFRG{
  display: flex;
  justify-content: space-between;
}
.opcionaisCadastroUsuario{
  background-color: rgba(247, 225, 225, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 170px;
  top: 93.992px;
  
}
.dadosUsuario{
  text-align: center;
  margin-top: 40px;
}
.dadosUsuario p{
  margin: 0;
}
.dadosUsuario img:hover{
  width: 55px;
  height: 55px;
}
.permissoesUsuario{
  text-align: center;
  margin-top: 40px;
}
.permissoesUsuario p{
  margin: 0;
}
.permissoesUsuario img:hover{
  width: 55px;
  height: 55px;
}
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
  margin-top: 12%;
  margin-bottom: 5%
}

h1{
  font-size: 40px;
  margin-left: 20%;

 
}
.pai{
  height: 10em;
  position: relative;
  justify-content: space-around;
}
form{
  
    position: absolute;
    top: 72%;
    left: 55%;
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
 
  
  
}

</style>