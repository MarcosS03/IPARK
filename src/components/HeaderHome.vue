<script setup>

</script>

<template>
<div class="headerHome">
    <div class="info-header">
        <p>
            <b>Encontre, reserve e pronto! <br>Agora é só segui até o estacionamento escolhido.</b>
        </p>
    </div>
    <div class="logo-header">
        <div class="logo-header-titulo">
            <h4>Baixe o nosso APP</h4><br>
        </div>
        
        <div class="botoes-header">
            <div class="imagens-header">
                <a href="https://play.google.com/store/apps"><img src="../assets/img/play store.png" alt="google play"></a>
                <a href="https://www.apple.com/br/app-store/"><img src="../assets/img/icons8-apple-logo-50.png" alt="apple"></a>
            </div>
            <div>
                <p><b>IOS e Android</b></p>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.headerHome {
    position: absolute;
    display: flex;
    left: 0;
    top: 0;
    right: 0;
    background-color: #E6E3E3;/* F2885B */
    justify-content: space-between;
    border: solid 1px;
    border-color: #F2885B;
}

.info-header {
    margin: 0 4% 0 4%;
    font-size: large;
}

.logo-header {
    background-color: #F2885B;
    border-radius: 10px;
    margin: 0.5% 5% 0.5% 0;
    height: 68px;
    width: 200px;
}

.logo-header-titulo {
    height: 12%;
}

.logo-header-titulo h4 {
    text-align: center;
    margin: 5% 0 0 0;
}

.botoes-header {
    position: static;
    display: flex;
    justify-content: space-between;
    top: 0;
    margin: 5% 5% 0 5%;
}

.botoes-header p {
    font-size: 85%;
}

.imagens-header {
    display: flex;
    justify-content: center;
}

.imagens-header img {
    width: 50%;
}

.imagens-header a {
    margin: 0;
    align-self: center;
}

</style>