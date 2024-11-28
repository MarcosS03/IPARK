<script setup>
import HeaderGeral from '@/components/HeaderGeral.vue';
</script>

<template>

<headerGeral></headerGeral>

<section class="opcionaisCadastroUsuario">
    <div>
        <img src="/src/assets/img/icons8-document-writer-50.png" alt="icone pessoa">
        <p>geral</p>
    </div>
    <div>
        <img src="/src/assets/img/icons8-cadastro-60.png" width="50" height="50" alt="permissoes">
        <p>permissoes</p>
    </div>
</section>
<section class="dadosUsuario">
<h1>Usuarios</h1>
<form>
    <label for="CPF_CNPJ">CPF/CNPJ </label>
    <input id="CPF_CNPJ" type="text" >
    <button type="button"> Pesquisar CNPJ </button>

    <label for="RG_IE"> RG/IE </label>
    <input type="text" id="RG_IE">
    <br>
    <label for="nomePessoa"> NOME </label>
    <input type="text" id="nomePessoa"><br>

    <label for="nomeApelidio"> APELIDIO</label>
    <input type="text" id="nomeApelidio"><br>

    <label for="CEP"> CEP </label>
    <input type="text" id="CEP">
    <button type="button"><img src="../assets/img/icons8-pesquisa-50.png" width="21" height="21" alt="lupa"> Pesquisar CEP</button>
    <br>

    <label for="endereco">ENDEREÇO</label>
    <input type="text" id="endereco" >
    <label for="numero"> NUMERO</label>
    <input type="text" id="numero"><br>

    <label for="complemento">COMPLEMENTO</label>
    <input type="text" id="complemento">
    <select  id="estadu_uf">
      <option value="PE">Pernambuco</option>
      <option value="AL">Alagoas</option>
    </select><br>

    <label for="bairro">BAIRRO</label>
    <input type="text" id="bairro">
    <label for="cidade">CIDADE</label>
    <input type="text" id="cidade" placeholder="cod. IBGE">
    <select id="cidade">
      <option value="PALMARES">PALMARES</option>
      <option value="AGUA PRETA">AGUA PRETA</option>
    </select><br>

    <label for="telefone">TELEFONE</label>
    <input type="tel" id="telefone">

    <label for="celular">CELULAR</label>
    <input type="tel" id="celular">

    <label for="whatsapp">WHATS APP</label>
    <input type="tel" id="whatsapp">

    <input type="submit" value="salvar">
</form>
</section>
</template>

<style>

</style>