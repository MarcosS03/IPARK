<script>
import HeaderGeral from '@/components/HeaderGeral.vue';
import DAOService from '@/service/DAOService';
import LoginService from '@/service/LoginService';
import { getAuth } from 'firebase/auth';
import { onBeforeMount, onMounted, ref } from 'vue';

export default {
  components: {
    HeaderGeral,

  },
  setup() {
  const daoUsuario = new DAOService('dadosUsuario');

  const loginUsuario =  new LoginService();

  //falta ajustar a função alterar, quando tento modificar algum item do formulario o restante some da tela,
  //e quandoclica em alterar, é enviada para o banco apenas a a alteração, sem os demais itens.

  const dadosUsuario = ref({
    CPF: '',
    RG: '',
    nome: '',
    apelidio: '',
    cep: '',
    uf:'',
    bairro: '',
    cidade: '',
    endereço: '',
    numero: '',
    telefone: [],
    whatsApp: [],
    visDashboard: '',
    darDesconto: '',
    cadastrarUsuario: '',
    cadasTipoVaga: '',
    altValorVaga: '',
    financeiro: '',
    cadasVaga:'',
    carteira:'',
    idUsuario: ''

  });

  const dadosLogin = ref ({
    email: '',
    senha: ''
  })


  onBeforeMount (async () => {
      //pega lista de usuario do banco
      let usuarios = await daoUsuario.getAll();

      const usuarioAuth = getAuth();
      const user = usuarioAuth.currentUser;

      const usuario = usuarios.find(u => u.object.idUsuario === user.uid);

      //pega o ID do select para inserir os option
        document.querySelector('#CPF').value = usuario.object.CPF;
        document.querySelector('#RG').value = usuario.object.RG;
        document.querySelector('#nomePessoa').value = usuario.object.nome;
        document.querySelector('#nomeApelidio').value =usuario.object.apelidio;
        document.querySelector('#CEP').value = usuario.object.cep;
        document.querySelector('#endereco').value = usuario.object.endereço;
        document.querySelector('#bairro').value = usuario.object.bairro;
        document.querySelector('#numero').value = usuario.object.numero;
        document.querySelector('#estado_uf').value  = usuario.object.uf;
        document.querySelector('#cidadeSelect').value = usuario.object.cidade;
        document.querySelector('#complemento').value = usuario.object.complemento;
        document.querySelector('#telefone').value = usuario.object.telefone;
        document.querySelector('#whatsapp').value = usuario.object.whatsApp;
        

  });

  let idUsuario ='';

  onMounted (async () =>{
    let vagas =await daoUsuario.getAll();
    vagas.forEach(function(dados){       
        idUsuario = dados.id;
        
      })
    });


  const cadastrar = async()=>{

    await loginUsuario.createUser( dadosUsuario.value, dadosLogin.value.email, dadosLogin.value.senha )

    
    alert('cadastro salvo com sucesso')
    
  }

  const alterar =async ()=>{
    await daoUsuario.update(idUsuario, dadosUsuario.value);
    
    alert('Alterações gravadas com sucesso!!!')

  }
  return {
    cadastrar,
    alterar,
    onBeforeMount,
    dadosUsuario,
    daoUsuario,
    dadosLogin,
    loginUsuario

  };
}
}

</script>

<template>

<headerGeral></headerGeral>
<body>
  
<section class="opcionaisCadastroUsuario">
    <div class="dadosUsuario">
       <RouterLink to="/CadsUsuaEstacionamento"><img src="/src/assets/img/icons8-document-writer-50.png" alt="icone pessoa"></RouterLink>
        <p>geral</p>
    </div>
    <div class="permissoesUsuario">
       <RouterLink to="/PermissoesUsuario"><img src="/src/assets/img/icons8-cadastro-60.png" width="50" height="50" alt="permissoes"></RouterLink>
        <p>permissoes</p>
    </div>
</section>


<section class="dadosUsuario">
  <div class="titulo">
    <h1>USUARIO 
      <select name="" id="">
        <option disabled value="">Usuarios</option>
      </select>
    </h1>

  </div>

 <div class="divForm">
  
  <div class="CPFRG">
    <div>
    <label for="CPF">CPF</label>
    <input id="CPF" type="text" v-model="dadosUsuario.CPF" >
  </div>
  <div>
    <label for="RG"> RG </label>
    <input type="text" id="RG" v-model="dadosUsuario.RG">
  </div>
  </div> 
  <div>
    <label for="nomePessoa"> NOME </label>
    <input type="text" id="nomePessoa" v-model="dadosUsuario.nome">
  </div>
  <div>
    <label for="nomeApelidio"> APELIDIO</label>
    <input type="text" id="nomeApelidio" v-model="dadosUsuario.apelidio">
  </div>
  <div class="cep">
    <label for="CEP"> CEP </label>
    <input type="text" id="CEP" v-model="dadosUsuario.cep">
    <button type="button"><img src="/src/assets/img/icons8-pesquisa-50.png" width="21" height="21" alt="lupa"> Pesquisar CEP</button>
  </div> 
  <div>
    <label for="endereco">ENDEREÇO</label>
    <input type="text" id="endereco" v-model="dadosUsuario.endereço">
    <label for="numero"> NUMERO</label>
    <input type="text" id="numero" v-model="dadosUsuario.numero">
  </div>
  <div>
    <label for="complemento">COMPLEMENTO</label>
    <input type="text" id="complemento" v-model="dadosUsuario.complemento">
    <select  id="estado_uf" v-model="dadosUsuario.uf">
      <option value="PE">Pernambuco</option>
      <option value="AL">Alagoas</option>
    </select>
  </div>
  <div>
    <label for="bairro">BAIRRO</label>
    <input type="text" id="bairro" v-model="dadosUsuario.bairro">
    <label for="cidade">CIDADE</label>
    <input type="text" id="cidade" placeholder="cod. IBGE">
    <select id="cidadeSelect" v-model="dadosUsuario.cidade">
      <option value="PALMARES">PALMARES</option>
      <option value="AGUA PRETA">AGUA PRETA</option>
    </select>
  </div>
  <div>
    <label for="telefone">TELEFONE/CELULAR</label>
    <input type="tel" id="telefone" v-model="dadosUsuario.telefone">

    <label for="whatsapp">WHATS APP</label>
    <input type="tel" id="whatsapp" v-model="dadosUsuario.whatsApp">
  </div>

  <div class="loginSenha">
    <label for="login">LOGIN</label>
    <input type="email" id="login" v-model="dadosLogin.email">

    <label for="senha">SENHA</label>
    <input type="password" id="senha" v-model="dadosLogin.senha">
  </div>

  <div class="botaoSalvar">
    <button type="button" @click="alterar">Alterar</button>
    <button type="button" @click="cadastrar">Cadastrar</button>
  </div>

</div>
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
  margin-top: 10%;
  margin-bottom: 5%;
  margin-left: 18%;
  
}

h1{
  font-size: 40px;
 
}
.pai{
  height: 10em;
  position: relative;
  justify-content: space-around;
}
.divForm{
  
    position: absolute;
    top: 65%;
    left: 55%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    
  
   
    
}

#CPF{
  width: 200px;


}

#nomePessoa{
  width:595px;
  display: inline;
  justify-content: end;
}
#nomeApelidio{
  width: 578px;
  display: inline;
  justify-content: end;
  
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
  margin-right: 30px;

}
#whatsapp{
  width: 142px;
  

}
.botaoSalvar button{
width: 145px;
background-color: rgba(102, 207, 252, 1);

}
.botaoSalvar{
  display: flex;
  justify-content: end;
 
  
  
}

</style>