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
<section class="permisoesUsuario">
    <h1>Permissoes</h1>
    <form>
        <label for="visualizarDashboard">visualizar Dashboard</label>
        <input type="checkbox"  id="visualizarDashboard" value="visualizarDashboard">

        <label for="cadastrarUsuario">cadastrar Usuario</label>
        <input type="checkbox" id="cadastrarUsuario" value="cadastrarUsuario">

        <label for="tipoVaga">cadastar tipo de vaga</label>
        <input type="checkbox" id="tipoVaga" value="tipoVaga">

        <label for="valorvaga">alterar valor da vaga</label>
        <input type="checkbox"id="valorvaga" value="valorvaga">

        <label for="desconto">dar descontos</label>
        <input type="checkbox" id="desconto" value="desconto">

        <label for="financeiro">financeiro</label>
        <input type="checkbox" id="financeiro" value="financeiro">

        <label for="cadastrarvaga">Cadastrar vagas</label>
        <input type="checkbox" id="cadastrarvaga" value="cadastrarvaga">

        <label for="carteira">Carteira</label>
        <input type="checkbox" id="carteira" value="carteira">
    </form>
</section>
</template>

<style>

</style>