<script setup>

</script>

<template>
    <link href='https://fonts.googleapis.com/css?family=Inria Sans' rel='stylesheet'>
    <header>
        <div class="headergeral">
            <div class="logo">
                <img src="../assets/img/carro-estacionado.png" alt="logo carro" width="95" height="67">
                <p>I PARK</p>
            </div>
            <div class="iconeUsuario">

                <a href="../views/HomeIPark.vue"><button type="button" class="buttonSemIcone"> home </button></a>
                <a href="../views/HomeIPark.vue"><button type="button" class="buttonSemIcone"> suporte </button></a>
                <a href="../views/Carteira.vue"><button type="button" class="buttonIcone"><img
                            src="../assets/img/icons8-carteira-60.png" alt="carteira"></button></a>
                <a href="../views/Perfil.vue"><button type="button" class="buttonIcone"><img
                            src="../assets/img/icons8-usuário-homem-com-círculo-50.png"
                            alt="icone usuario"></button></a>
            </div>
        </div>
    </header>
</template>

<style>
header {
    font-family: 'Inria Sans';
    font-size: 22px;
}

.headergeral {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgb(211, 210, 210, 0.15);
    width: 100%;
    height: 94px;
    box-shadow: 0 0 20px 0px #b3b2b3;
}

.iconeUsuario {
    align-content: center;
}

.logo {
    display: flex;
    align-items: center;
    margin-left: 8%;
}

.logo p {
    font-size: 40px;
    font-weight: bolder;
    display: flex;
    align-items: center;
}

.logo img {
    float: left;
    margin-left: 14px;
    margin-right: 14px;
}

.buttonSemIcone {
    background-color: #66CFFC;
    color: black;
    padding: 7px 30px;
    border-radius: 30px;
    margin: 10px;
    cursor: pointer;
    border: none;
    vertical-align: text-bottom;
}

.buttonIcone img {
    width: 50px;
    height: 50px;
    border: none;
}

.buttonIcone {
    margin: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}
</style>