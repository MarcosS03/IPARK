<script setup>
import headerGeral from '../components/HeaderGeral.vue'
</script>

<template>
<header>
    <headerGeral></headerGeral>
</header>
    <div class="login-container">
        <div class="login-box">
            <!-- <div class="login-icon">
                <img src="../assets/img/carro-estacionado.png" alt="logo">
            </div> -->

            <div class="login-form">
                <h1>login</h1>
                <form>
                    <label for="email">Email</label><br>
                    <input id="email" type="email" placeholder="Email de usuario" required>
                    <br>
                    <label for="campo_senha">Senha</label><br>
                    <input id="campo_senha" type="password" placeholder="senha" required>
                    <br>
                    <input type="submit" value="Entrar">
                </form>
            </div>
        </div>
    </div>
</template>