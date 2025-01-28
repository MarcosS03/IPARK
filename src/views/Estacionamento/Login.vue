<script>
import { ref } from 'vue';
import headerGeral from '@/components/HeaderGeral.vue'
import LoginService from '@/service/LoginService';
import router from '@/router';

export default {
    components: {
    headerGeral,
    
  },
  setup() {
const email = ref("");
const senha = ref("");


const loginService = new LoginService();

const login = () => {
  loginService.login(email.value, senha.value)
    .then(result => {
      alert('Login realizado com sucesso!')
      router.push('/homeEstacionamento');
    }).catch(error => {
      alert('E-mail e/ou senha inválido(s).')
    });
};

const createUser = () => {
  loginService.createUser('Victor', 'professor', 'victor.cavalcanti@palmares.ifpe.edu.br', '12345678')
    .then(result => {
      alert('Usuário criado com sucesso!');
    })
};

const recoverPassword = () => {
  loginService.recoverPassword(email.value)
    .then(() => alert('E-mail de recuperação de senha enviado com sucesso!'))
};
    return {
        login,
        loginService,
        senha,
        email


        }
    }
}
</script>

<template>
<header>
    <headerGeral></headerGeral>
</header>
    <div class="login-container">
        <div class="login-box">
             <div class="login-icon">
                <img src="/src/assets/img/carro-estacionado.png" alt="logo" width="170" height="100">
            </div>

            <div class="login-form">
                <h1>Login</h1>
                <div>
                    <label for="email">Email</label><br>
                    <input id="email" v-model="email" type="email" placeholder=" Email de usuario" required>
                    <br>
                    <label for="campo_senha">Senha</label><br>
                    <input id="campo_senha" v-model="senha" type="password" placeholder=" senha" required>
                    <br>
                    <button @click="login">ENTRAR</button>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body{

    font-family: sans-serif;
   
}
input {
    width: 250px;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin: 10px;
}
button{
    display: flex;
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
}
button:hover{
    background-color: #66CFFC;
}
.login-container{
    max-width: 350px;
    margin: 15% auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, 0.1);
    background: #26A8DF;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-icon img{
    display: flex;
    margin-top: -30%;
    border-radius: 10px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    margin-right: auto;
    margin-left: auto;
    
}
.login-form h1{
    margin-top: 15%;
    margin-bottom: 10%;
    margin-left: -10%;
    color: white;
}
.login-form label{
    color: white;
    font-size: 15px;
}
.login-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 10%;
    
}
</style>