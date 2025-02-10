<script setup>

import headerHome from '../components/HeaderHome.vue';
import footerHome from '../components/FooterHome.vue';

</script>

<template>

<headerHome/>

<body>
        
   <div class="cabecalho2">
      <div class="logocarro">
         <img src="../assets/img/carro-estacionado.png" alt="logo IPark">
         <h2>I PARK</h2>
      </div>
      <div class="link-login">
         <img src="../assets/img/icons8-usuário-30.png" alt="logo usuario">
      </div>
   </div>

   <div class="mapa">
      <section>
         <a href="#mapa">Encontre</a>
         <RouterLink to="./suporte">Suporte</RouterLink>
         <RouterLink to="./Sobre">Sobre</RouterLink>
      </section>

      <iframe id="mapa" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3168.602359423974!2d-35.59385254595784!3d-8.685599161551972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1732195137563!5m2!1spt-BR!2sbr" 
      wistyle="border:1px;" allowfullscreen="" 
      loading="lazy" referrerpolicy="no-referrer-when-downgrade">
      </iframe>
   </div>
   <section class="appCelular">
      <div class="app1">
         <img src="../assets/img/appimagem1.jpeg" alt="imagems app 1">
         <h3><b>Encontre</b></h3>
         <p>
            Com milhares de vagas de estacionamento disponíveis nas principais 
            cidades do Brasil, encontrar uma vaga nunca foi tão fácil. 
            Basta procurar os pinos no mapa e verificar a 
            disponibilidade em tempo real.
         </p>
      </div>
      <div class="app2">
         <img src="../assets/img/appimagem2.jpeg" alt="imagems app 2">
         <h3><b>Reserva</b></h3>
         <p>
            Diga adeus às voltas intermináveis ​​para encontrar uma vaga. 
            Reserve sua vaga de estacionamento por até 30 minutos antes de chegar, 
            garantindo que você tenha uma vaga esperando por você.
         </p>
      </div>
      <div class="app3">
         <img src="../assets/img/appimagem3.jpeg" alt="imagems app 3">
         <h3><b>Feito</b></h3>
         <p>
            Pronto! Agora você pode aproveitar seu trajeto sem o estresse de 
            encontrar um Estacionamento.
         </p>
      </div>
   </section>

   <hr>
   
   <div class="vantagensIpark">
      <h1><b>Estacionar com o IPark é...</b></h1>

      <section class="vantagens">
         <div class="vantagem-01">
            <section class="icon-titulo">
               <img src="../assets/img/toque no touch.jpeg" alt="touch">
               <h3><b>Fácil e reservável</b></h3>
            </section>
            <p>
               Planeje seu dia com confiança encontrando, reservando e pagando pelo estacionamento com seu telefone. 
               Nosso aplicativo permite que você reserve vagas de estacionamento com facilidade, e segurança.
            </p>
         </div>
         <div class="vantagem-02">
            <section class="icon-titulo">
               <img src="../assets/img/cartão.jpeg" alt="cartão">
               <h3><b>Sem dinheiro</b></h3>
            </section>
            <p>
               Os pagamentos são descomplicados, basta usar seu cartão de crédito para 
               pagar com segurança pelo aplicativo.
            </p>
         </div>
         <div class="vantagem-03">
            <section class="icon-titulo">
               <img src="../assets/img/lupa com estrela.jpeg" alt="lupa com estrela">
               <h3><b>Transparente</b></h3>
            </section>
            <p>
               Saiba as tarifas horárias e diárias antes de estacionar e pagar. Seja estacionamento 
               casual ou de longo prazo, não haverá custos ocultos ou surpresas 
               com nosso estacionamento.
            </p>
         </div>
      </section>
   </div>
</body>

<footer>
<footerHome></footerHome>
</footer>
</template>

<style scoped>
.cabecalho2 {
   position: absolute;
   top: 130px;
   right: 0;
   left: 0;
   display: flex;
   justify-content: space-between;
}

.logocarro {
   display: flex;
   align-items: center;
   width: 18%;
   margin: 1% 1% 1% 4%;
   justify-content: space-evenly;
}

.logocarro img {
   width: 100px;
   height: 80px;
   margin: 2%;
   box-shadow: 0px 5px 2px #888;
   border-radius: 10px;
}

.logocarro h2 {
   display: inline;
   white-space: nowrap;
   font-size: 30px;
   margin-left: 3%;
}

.link-login {
   display: flex;
   align-items: center;
   width: 18%;
   margin: 1% 4% 1% 1%;
   justify-content: space-evenly;
}

.link-login img {
   width: 50px;
   height: 50px;
   margin: 2%;
}

.link-login a {
   display: inline;
   white-space: nowrap;
   text-decoration: none;
   color: black;
   font-size: 19px;
   margin-right: 3%;
   font-weight: bold;
}

.mapa {
   position: absolute;
   top: 350px;
   right: 0;
   left: 0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}

.mapa section {
   display: flex;
   align-self: end;
   width: 25%;
   margin: 0 10% 0 10%;
   gap: 15%;
   overflow-x: scroll;
}

.mapa section::-webkit-scrollbar {
   width: 10px; /* Largura da barra */
}

.mapa section::-webkit-scrollbar-track {
  background: #D9D9D9; /* Cor do fundo da barra */
}

.mapa section a {
   text-decoration: none;
   color: black;
   font-size: 20px;
}

.mapa iframe {
   width: 80%;
   height: 800px;
   border: 1px solid black;
   border-radius: 10px;
}

.appCelular {
   position: absolute;
   top: 1300px;
   right: 0;
   left: 0;
   display: flex;
   justify-content: space-between;
}

.app1 {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 30%;
   margin: 0 5% 0 5%;
}

.app2 {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 30%;
   margin: 0 5% 0 5%;
}

.app3 {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 30%;
   margin: 0 5% 0 5%;
}

hr {
   position: absolute;
   top: 1870px;
   right: 10%;
   left: 10%;
   border: 1px solid gray;
}

.vantagensIpark {
   position: absolute;
   top: 1950px;
   right: 0;
   left: 0;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
}

.vantagensIpark h1 {
   display: flex;
   justify-content: center;
   font-size: 40px;
   margin: 0 10% 5% 10%;
}

.vantagens {
   display: flex;
   align-items: center;
   width: 80%;
   margin: 0 10% 0 10%;
}

.icon-titulo {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 10%;
}

.icon-titulo img {
   width: 40px;
   height: 40px;
}

.vantagem-01 {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 30%;
   margin: 0 5% 0 5%;
}

.vantagem-02 {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 30%;
   margin: 0 5% 0 5%;
}

.vantagem-03 {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 30%;
   margin: 0 5% 0 5%;
}

</style>

<!--   -->