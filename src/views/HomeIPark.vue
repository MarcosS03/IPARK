<script setup>

import headerHome from '../components/HeaderHome.vue';
import footerHome from '../components/FooterHome.vue';

</script>

<template>
<header>

<headerHome></headerHome>

</header>

<body>
        
   <div class="cabecalho2">

      <div class="logocarro">
         <img src="../assets/img/carro-estacionado.png" alt="logo carro">
         <h2>I PARK</h2>
      </div>

      <div class="HomeIpark-login">
         <router-link to="./Login.vue">Crie a sua conta/ Entrar</router-link>
         <img src="../assets/img/icons8-usuário-30.png" alt="logo usuario">
      </div>
   </div>

   <div class="mapaGoogle">
      <div class="homeIpark-opcoes">
         <router-link to="#mapa">Encontre</router-link>
         <router-link to="./suporte">Suporte</router-link>
         <router-link to="./sobre">Sobre</router-link>
      </div>

      <div id="mapa">
         <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3168.602359423974!2d-35.59385254595784!3d-8.685599161551972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1732195137563!5m2!1spt-BR!2sbr" 
         width="1253" height="896" allowfullscreen="" 
         loading="lazy" referrerpolicy="no-referrer-when-downgrade">
         </iframe>
      </div>
   </div>

   <section class="appCelular">
      <div class="app1">
         <img src="../assets/img/appimagem1.jpeg" alt="imagems app 1">
         <p> <b>Encontrar</b><br>
            Com milhares de vagas de estacionamento disponíveis nas principais 
            cidades do Brasil, encontrar uma vaga nunca foi tão fácil. 
            Basta procurar os pinos no mapa e verificar a 
            disponibilidade em tempo real.
         </p>
      </div>
      <div class="app2">
         <img src="../assets/img/appimagem2.jpeg" alt="imagems app 2">
         <p> <b>Reserva</b> <br>
            Diga adeus às voltas intermináveis ​​para encontrar uma vaga. 
            Reserve sua vaga de estacionamento por até 30 minutos antes de chegar, 
            garantindo que você tenha uma vaga esperando por você.
         </p>
      </div>
      <div class="app3">
         <img src="../assets/img/appimagem3.jpeg" alt="imagems app 3">
         <p> <b>Feito</b> <br>
            Pronto! Agora você pode aproveitar seu trajeto sem o estresse de encontrar um Estacionamento.
         </p>
      </div>
   </section>

   <hr>

   <h1>
      <b>Estacionar com o IPark é...</b>
   </h1>

   <div class="vantagensIpark">
      <div class="vantagem-01">
         <div class="icon-titulo">
            <img src="../assets/img/toque no touch.jpeg" alt="touch">
            <h3><b>Fácil e reservável</b></h3>
         </div>
         <p>Planeje seu dia com confiança encontrando, reservando e pagando pelo estacionamento com seu telefone. Nosso aplicativo permite que você reserve vagas de estacionamento com facilidade, e segurança.</p>
      </div>
      <div class="vantagem-02">
         <div class="icon-titulo">
            <img src="../assets/img/cartão.jpeg" alt="cartão">
            <h3><b>Sem dinheiro</b></h3>
         </div>
         <p>Os pagamentos são descomplicados, basta usar seu cartão de crédito para pagar com segurança pelo aplicativo.</p>
      </div>
      <div class="vantagem-03">
         <div class="icon-titulo">
            <img src="../assets/img/lupa com estrela.jpeg" alt="lupa com estrela">
            <h3><b>Transparente</b></h3>
         </div>
         <p>Saiba as tarifas horárias e diárias antes de estacionar e pagar. Seja estacionamento casual ou de longo prazo, não haverá custos ocultos ou surpresas com nosso estacionamento.</p>
      </div>
   </div>
</body>

<footer>
   <!-- <footerHome/> -->
</footer>
    
</template>
