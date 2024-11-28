<script setup>
import headerGeral from '../components/HeaderGeral.vue'
</script>

<template>
<header>
<headerGeral></headerGeral>

</header>
<img src="../assets/img/carro-estacionado.png" alt="logo">

    <h1>login</h1>

<form action="">
    <label for="email">Email</label><br>
    <input id="email" type="email" placeholder="Email de usuario" required>
    <br>
    <label for="campo_senha">Senha</label><br>
    <input id="campo_senha" type="password" placeholder="senha" required>
<br>
    <input type="submit" value="Entrar">
</form>

</template>



<style>

</style>