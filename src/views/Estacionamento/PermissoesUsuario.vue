<script>
import HeaderGeral from '@/components/HeaderGeral.vue';
import DAOService from '@/service/DAOService';
import { getAuth } from 'firebase/auth';
import { onBeforeMount, ref } from 'vue';


export default {
    components: {
    HeaderGeral,

  },
setup() {
    const daoUsuario = new DAOService('dadosUsuario')
    const usuarioLogado = ref();

    
    onBeforeMount (async () => {
        //pega lista de usuario do banco
        let usuarios = await daoUsuario.getAll();

        const usuarioAuth = getAuth();
        const user = usuarioAuth.currentUser;

        usuarioLogado.value = usuarios.find(u => u.object.idUsuario === user.uid);
        console.log(usuarioLogado.value)

   
    });

    const alterar =async ()=> {

        await daoUsuario.update(usuarioLogado.value.id, usuarioLogado.value)
        alert("permissões alteradas")
    }
    return {
        daoUsuario,
        usuarioLogado,
        onBeforeMount,
        alterar

    }
    }
}

</script>

<template>

<headerGeral></headerGeral>

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
<section class="permisoesCheckBox">
    <div class="Titulo">
        <h1>Permissoes</h1>
    </div>
    <form>
        <div class="linhaUm">
            <div class="camposCheckbox">
                <label for="visualizarDashboard">
                    visualizar Dashboard 
                    <input type="checkbox"  id="visualizarDashboard" value="visualizarDashboard" v-model="usuarioLogado.object.visDashboard">
                </label>
                <label for="desconto">
                    dar descontos
                    <input type="checkbox" id="desconto" value="desconto"  v-model="usuarioLogado.object.darDesconto">
                </label>   
            </div>
        </div>
        <div class="linhaDois">
            <div class="camposCheckbox">
                <label for="cadastrarUsuario">
                    cadastrar Usuario
                    <input type="checkbox" id="cadastrarUsuario" value="cadastrarUsuario"  v-model="usuarioLogado.object.cadastrarUsuario">
                </label>
                
                <label for="tipoVaga">
                    cadastar tipo de vaga 
                    <input type="checkbox" id="tipoVaga" value="tipoVaga" v-model="usuarioLogado.object.cadasTipoVaga">
                </label>
            </div> 
            
        </div>
        
        <div class="linhaTres">
            <div class="camposCheckbox">
                <label for="valorvaga">
                    alterar valor da vaga
                    <input type="checkbox"id="valorvaga" value="valorvaga"  v-model="usuarioLogado.object.altValorVaga">
                </label>
                <label for="financeiro">
                    financeiro 
                    <input type="checkbox" id="financeiro" value="financeiro" v-model="usuarioLogado.object.financeiro">
                </label>
            </div>   
        </div>
        <div class="linhaQuatro">
            <div class="camposCheckbox">
                <label for="cadastrarvaga">
                    Cadastrar vagas
                    <input type="checkbox" id="cadastrarvaga" value="cadastrarvaga" v-model="usuarioLogado.object.cadasVaga">
                </label>
                <label for="carteira">
                    Carteira
                    <input type="checkbox" id="carteira" value="carteira" v-model="usuarioLogado.object.carteira">
                </label>
            </div>    
        </div>
    </form >
    <button type="button" @click="alterar">Alterar</button>
</section>
</template>

<style scoped>
input{
    margin-bottom: 10px;
    padding: 0;
    vertical-align: middle;
    margin-left: 10px;
    
    
    
}
input:hover{
   
  opacity: 50%;
   
    
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

body{
  font-family: 'Inria Sans';font-size: 12px;
  font-weight: bolder;
  padding: 0;
  margin: 0;
}
.permisoesCheckBox{
    display: inline-block;
    margin-top: 10%;
    margin-left: 20%;
    margin-right: auto;
}
.Titulo{
  margin-top: 8%;
  margin-bottom: 5%
}

h1{
  font-size: 40px;
  margin-left: 2%; 
  font-family: 'Inria Sans';
  font-weight: bolder;
  
}

form{
     
    margin-left: 10%;
    display: -webkit-inline-box;
    justify-content: center;
       
}
.linhaUm{

    margin: 10px;
    display: flex;
    margin: 10px;
    flex-direction: row;
    justify-content:space-around;
    align-items: end;
}
.linhaUm label{
    display: flex;
    justify-content: end;
}
.linhaDois{
    margin: 10px;
    display: flex;
    margin: 10px;
    flex-direction: row;
    justify-content:space-around;
    align-items: end;
}
.linhaDois label{
    display: flex;
    justify-content: end;
}
.linhaTres{
    margin: 10px;
    display: flex;
    margin: 10px;
    flex-direction: row;
    justify-content:space-around;
    align-items: end;
}
.linhaTres label{
    display: flex;
    justify-content: end;
}
.linhaQuatro{
    margin: 10px;
    display: flex;
    margin: 10px;
    flex-direction: row;
    justify-content:space-around;
    align-items: end;
}
.linhaQuatro label{
    display: flex;
    justify-content: end;
}
.camposCheckbox{
    margin-left: 20px
}
</style>