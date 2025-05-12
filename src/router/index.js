import { createRouter, createWebHistory } from 'vue-router'

import HomeIPark from '../views/HomeIPark.vue'
import Login from '@/views/Estacionamento/Login.vue'
import CadastroPessoa from '@/views/CadastroPessoa.vue'
import CadastrarVeiculo from '@/views/Estacionamento/CadastrarVeiculo.vue'
import Carteira from '@/views/Carteira.vue'
import Cidade from '@/views/Cidade.vue'
import Estados from '@/views/Estados.vue'
import OpcoesPerfil from '@/views/OpcoesPerfil.vue'
import Perfil from '@/views/Perfil.vue'
import TipoPessoa from '@/views/TipoPessoa.vue'
import VeiCadastrados from '@/views/VeiCadastrados.vue'
import VeiEstacionados from '@/views/VeiEstacionados.vue'
import HomeEstacionamento from '@/views/Estacionamento/HomeEstacionamento.vue'
import DadosEstacionamento from '@/views/Estacionamento/DadosEstacionamento.vue'
import FooterHome from '@/components/FooterHome.vue'
import CadsUsuaEstacionamento from '@/views/Estacionamento/CadsUsuaEstacionamento.vue'
import PermissoesUsuario from '@/views/Estacionamento/PermissoesUsuario.vue'
import DetVeiEstacionado from '@/views/Estacionamento/DetVeiEstacionado.vue'
import EstacionarVeiculo from '@/views/Estacionamento/EstacionarVeiculo.vue'
import HeaderGeral from '@/components/HeaderGeral.vue'
import ConfigVagas from '@/views/Estacionamento/ConfigVagas.vue'
import NovoEstacionamento from '@/views/Estacionamento/NovoEstacionamento.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'HomeIPark',
      component : HomeIPark
      
    },
    {
      path: '/HeaderGeral',
      name: 'HeaderGeral.vue',
      component : HeaderGeral
      
    },
    {
      path: '/Login',
      name: 'Login.vue',
      component : Login
    },
    {
      path: '/CadastroPessoa',
      name: 'CadastroPessoa.vue',
      component : CadastroPessoa,
      meta: { requiresAuth: true }
    },
    {
    path: '/CadastrarVeiculo',
    name:'CadastrarVeiculo.vue',
    component : CadastrarVeiculo,
    meta: { requiresAuth: true }
    },
    {
      path: '/Carteira.vue',
      name:'Carteira',
      component : Carteira,
      meta: { requiresAuth: true }
    },
    {
      path: '/Cidade',
      name:'Cidade',
      component : Cidade
    },
    {
      path: '/DetVeiEstacionado',
      name:'DetVeiEstacionado',
      component : DetVeiEstacionado,
      meta: { requiresAuth: true }
    },
    {
      path: '/Estados',
      name:'Estados',
      component : Estados
    },
    {
      path: '/NovoEstacionamento',
      name: 'NovoEstacionamento.vue',
      component: NovoEstacionamento
    },
    {
      path: '/OpcoesPerfil',
      name:'OpcoesPerfil',
      component : OpcoesPerfil,
      meta: { requiresAuth: true }
    },
    {
      path: '/Perfil',
      name:'Perfil.vues',
      component : Perfil,
      meta: { requiresAuth: true }
    },
    {
      path: '/TipoPessoa',
      name:'TipoPessoa',
      component : TipoPessoa
    },
    {
      path: '/VeiCadastrados',
      name:'VeiCadastrados.vue',
      component : VeiCadastrados,
      meta: { requiresAuth: true }
    },
    {
      path: '/VeiEstacionados.vue',
      name:'VeiEstacionados',
      component : VeiEstacionados,
    },
    {
      path: '/HomeEstacionamento',
      name:'HomeEstacionamento.vue',
      component : HomeEstacionamento,
      meta: { requiresAuth: true }
    },

    {
      path: '/DadosEstacionamento',
      name:'DadosEstacionamento.vue',
      component : DadosEstacionamento,
      meta: { requiresAuth: true }
    },
    {
      path: '/FooterHome.vue',
      name:'FooterHome',
      component : FooterHome
    },
    {
      path: '/CadsUsuaEstacionamento',
      name:'CadsUsuaEstacionamento',
      component : CadsUsuaEstacionamento,
      meta: { requiresAuth: true }
    },
    {
      path: '/PermissoesUsuario',
      name:'PermissoesUsuario',
      component : PermissoesUsuario,
      meta: { requiresAuth: true }
    },
    {
      path: '/DetVeiEstacionado',
      name:'DetVeiEstacionado.vue',
      component : DetVeiEstacionado
    },
    {
      path: '/EstacionarVeiculo',
      name:'EstacionarVeiculo.vue',
      component : EstacionarVeiculo,
      meta: { requiresAuth: true }
    },
    {
      path: '/ConfigVagas',
      name: 'ConfigVagas.vue',
      component: ConfigVagas,
      meta: { requiresAuth: true }
    },

  ],
})

router.beforeEach((to, from, next) =>{
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth){
    onAuthStateChanged(auth, (user) =>{
      if(user){
        next();
      }else{
        next('/login')
      }
    })
  }else{
    next();
  }
})
export default router
