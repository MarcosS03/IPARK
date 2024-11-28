<script setup>

import headerGeral from '../components/HeaderGeral.vue'

</script>

<template>
<header>
  <headerGeral></headerGeral>
</header>

<body>
    <h1>Cadastro de pessoas</h1>
 <form action="">

    <label for="tipoPessa">TIPO DE PESSOA </label>
    <select name="TipoPessoa" id="tipoPessoa">
      <option value="Fisica">Fisica</option>
      <option value="Juridica">Juridica</option>
    </select><br>

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

    <p>VEICULOS VINCULADOS </p>
    <iframe src="" name="frame_veiculos_vinculados" width="807" height="86"></iframe><br>

    <label for="vincular_veiculo"> VINCULAR VEICULO</label>
    <input type="text" id="vincular_veiculo">
    <button type="button">VINCULAR</button>
    <button type="button">CADASTRAR NOVO VEICULO</button>
<br>
    <input type="submit" value="Salvar">

 </form>
</body>
</template>

<style>

</style>