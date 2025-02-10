<script>
import { getAuth, reload, signOut } from 'firebase/auth';

export default{

    setup() {
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }

  async function sair () {
    const auth = getAuth();
    await signOut(auth);
    location.reload();
  }
  return {
        toggleDropdown,
        sair
    };
}

}
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
                <a href="../views/Carteira.vue"><button type="button" class="buttonIcone"><img src="../assets/img/icons8-carteira-60.png" alt="carteira"></button></a>
<div>
                <button type="button" class="buttonIcone" @click="toggleDropdown()">
                    <img src="../assets/img/icons8-usuário-homem-com-círculo-50.png" alt="icone usuario">  
                    </button>
                    <div class="dropDown">
                    <div class="dropdown-content" id="dropdownMenu">
                      
                            <RouterLink to="DadosEstacionamento"><div id="empresa">Empresa</div></RouterLink>
                            <RouterLink to="configVagas"><div id="confVaga">Configurar vaga</div></RouterLink>
                            <RouterLink to="CadsUsuaEstacionamento"><div id="usuario">Usuario</div></RouterLink>
                            <RouterLink to=""><div id="sair" @click="sair">Sair</div></RouterLink>
                        
                    </div>
                </div>

            </div>              
            </div>
        </div>
    </header>
</template>

<style scoped>

.dropdown {
   
      display:contents;
     
    }

    .dropdown-content {
      display: none;
      position:fixed;
      right: 1%;
      background-color: #f9f9f9;
      min-width: 200px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
  
      
    }

    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    
    }

    .dropdown-content a:hover {
      background-color: #f1f1f1;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 20px 0px #b3b2b3;
}

.iconeUsuario {
    align-items: center;
    margin-right: 5%;
    display: inline-flex;
    text-align: start;
}

.logo {
    display: flex;
    align-items: center;
    margin-left: 5%;
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