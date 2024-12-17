<script setup>

</script>

<template>

<link href='https://fonts.googleapis.com/css?family=Inria Sans' rel='stylesheet'>

<footer>
<section class="footerHome">
    
        <div class="logo">
            <img src="../assets/img/carro-estacionado.png" alt="logo carro" width="130" height="100">
            <p>I PARK</p>
        </div>
        <div class="redesSociais">
            <h3><b>Nossas redes sociais</b></h3>
        <div class="botao">
            <a href="https://www.instagram.com"><button type="button"><img src="../assets/img/icons8-instagram-50.png" alt="instagram"></button></a>
            <a href="https://www.facebook.com"><button type="button"><img src="../assets/img/icons8-facebook-50.png" alt="facebook"></button></a>
            <a href="https://www.twitter.com"><button type="button"><img src="../assets/img/icons8-twitter-50.png" alt="twiter"></button></a>
        </div>
            <div class="painelEstacionamento">
            <a href="../views/Login.vue"><button type="button"><img src="../assets/img/icons8-estacionamento-50.png" alt="icone P">
                <p>Painel do estacionamento</p></button></a>
            </div>
        </div>
 
</section>
</footer>
</template>

<style>

footer{
    font-family: 'Inria Sans';font-size: 22px;
}

.footerHome{
    
    display: flex; 
    flex-direction: row;
    justify-content:space-between;
    background-color:rgba(160, 152, 152, 0.15);
    width: 100%;
    height: 264px;
    position: absolute;
    left: 0;
    bottom: 0;
}
.logo{
    display: flex;
    align-items: center;
    margin: 20px;
}

.logo  p{
    font-size: 40px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    margin-left: 20px
   
     
}
.logo img{
    float: left;
    box-shadow: 0 5px 10px 0px #4e4d4d;
    border-radius: 15px;
    
}

.redesSociais{
    margin-right: 80px;
    align-content: center;

}

.redesSociais button{
    border: none;
    cursor: pointer;

}
.botao{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px
}

.painelEstacionamento img{
    width: 15%;
    float: left;
}
.painelEstacionamento p{
    font-family: 'Inria Sans';
    font-size: 15px;
    font-weight: bolder;
}
.painelEstacionamento button{
    width: 250px;
    border: none;
    cursor: pointer;
}

button:hover{
    box-shadow: 0 5px 10px 0px #4e4d4d;
}


</style>