<script>
import DAOService from '@/service/DAOService';
import LoginService from '@/service/LoginService';
import { ref } from 'vue';

export default{

    setup() {

    const daoUsuario = new DAOService('dadosUsuario');
    const daoEstacionamento =  new DAOService('dadosEstacionamento');
    const loginUsuario =  new LoginService();

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
        idUsuario: '',
        idEstacionamento: ''

    });

    const dadosLogin = ref ({
        email: '',
        senha: ''
    })
    const SalavarUsuario = () =>{

    }
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

    let idEstacionamento = null;
    const salvarEstacionamento = async () =>{
        idEstacionamento = await daoEstacionamento.insert(dadosEstacionamento.value);
        console.log(idEstacionamento)
    }

    return{
        salvarEstacionamento,SalavarUsuario, dadosEstacionamento, dadosUsuario, dadosLogin
    }
  }
}



</script>

<template>

<body>
    
<h1>Novo Estacionamento:</h1>
<section class="dadosEstacionamento">
    <div class="tipoPFPJ">
      <label for="tipoPessa">TIPO DE PESSOA </label>
      <select name="TipoPessoa" id="tipoPessoaEstacionamento" v-model="dadosEstacionamento.tipoPessoa">
        <option value="Fisica">Fisica</option>
        <option value="Juridica">Juridica</option>
      </select>
    </div>

    <div class="CPFCNPJRG">
      <label for="CPF_CNPJ">CPF/CNPJ </label>
      <input id="CPF_CNPJ_Estacionamento" type="text" v-model="dadosEstacionamento.CPF_CNPJ">
      <button type="button" id="botaopesquisaCNPJ"> Pesquisar CNPJ </button>

      <label for="RG_IEEstacionamento"> RG/IE </label>
      <input type="text" id="RG_IEEstacionamento" v-model="dadosEstacionamento.RG_IE">
    </div>
    <div>
      <label for="razao"> RAZÃO SOCIAL </label>
      <input type="text" id="razao" v-model="dadosEstacionamento.razao_social">
    </div>
    <div>
        <label for="nomeFantasia"> FANTASIA</label>
        <input type="text" id="nomeFantasia" v-model="dadosEstacionamento.nome_fantasia">
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
        <button type="button" @click="salvarEstacionamento">salvar</button>
    </div>
</section>

<section class="dadosTitular">
    <label for="titular">Titula</label>
    <input type="text" id="titular" v-model="dadosUsuario.nome">
    <label for="CPF">CPF</label>
    <input type="text" id="CPF" v-model="dadosUsuario.CPF">
    <div>
        <label for="nomeApelidio"> APELIDIO</label>
        <input type="text" id="nomeApelidio" v-model="dadosUsuario.apelidio">
    </div>
    <div class="cep">
        <label for="CEP"> CEP </label>
        <input type="text" id="CEP" v-model="dadosUsuario.cep">
        <button type="button"><img src="../assets/img/icons8-pesquisa-50.png" width="21" height="21" alt="lupa"> Pesquisar CEP</button>
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
        <select  id="estadu_uf" v-model="dadosUsuario.uf">
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
   
    <section class="LoginSenha">
        <div>
            <label for="email">EMAIL</label>
            <input type="email" id="email" v-model="dadosLogin.email">
        </div>
        <div>
            <label for="senha">SENHA </label>
            <input type="password" id="senha" v-model="dadosLogin.senha">
            <input type="text" placeholder="nivel da senha" id="nivelSenha">
            <label for="repetir_senha">REPETIR SENHA </label>
            <input type="password" id="repetir_senha">
        </div> 
        <div class="botaoSalvar">
            <button type="button" @click="SalavarUsuario">Salvar</button>
        </div>
    </section>
</section>

</body>
</template>

<style scoped>
body{

font-family: sans-serif;

}
</style>