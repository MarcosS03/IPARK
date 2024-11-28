import { createRouter, createWebHistory } from 'vue-router'

import HomeIPark from '../views/HomeIPark.vue'
import Login from '@/views/Login.vue'
import CadastroPessoa from '@/views/CadastroPessoa.vue'
import CadastrarVeiculo from '@/views/CadastrarVeiculo.vue'
import Carteira from '@/views/Carteira.vue'
import Cidade from '@/views/Cidade.vue'
import DetVeiEstacionado from '@/views/DetVeiEstacionado.vue'
import Estados from '@/views/Estados.vue'
import OpcoesPerfil from '@/views/OpcoesPerfil.vue'
import Perfil from '@/views/Perfil.vue'
import TipoPessoa from '@/views/TipoPessoa.vue'
import VeiCadastrados from '@/views/VeiCadastrados.vue'
import VeiEstacionados from '@/views/VeiEstacionados.vue'
import HomeEstacionamento from '@/views/Estacionamento/HomeEstacionamento.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeIPark',
      component : HomeIPark
      
    },
    {
      path: '/Login.vue',
      name: 'Login',
      component : Login
    },
    {
      path: '/CadastroPessoa.vue',
      name: 'CadastroPessoa',
      component : CadastroPessoa
    },
    {
    path: '/CadastrarVeiculo.vue',
    name:'CadastrarVeiculo',
    component : CadastrarVeiculo
    },
    {
      path: '/Carteira.vue',
      name:'Carteira',
      component : Carteira
    },
    {
      path: '/Cidade',
      name:'Cidade',
      component : Cidade
    },
    {
      path: '/DetVeiEstacionado',
      name:'DetVeiEstacionado',
      component : DetVeiEstacionado
    },
    {
      path: '/Estados',
      name:'Estados',
      component : Estados
    },
    {
      path: '/OpcoesPerfil',
      name:'OpcoesPerfil',
      component : OpcoesPerfil
    },
    {
      path: '/Perfil.vue',
      name:'Perfil',
      component : Perfil
    },
    {
      path: '/TipoPessoa',
      name:'TipoPessoa',
      component : TipoPessoa
    },
    {
      path: '/VeiCadastrados.vue',
      name:'VeiCadastrados',
      component : VeiCadastrados
    },
    {
      path: '/VeiEstacionados.vue',
      name:'VeiEstacionados',
      component : VeiEstacionados
    },
    {
      path: '/HomeEstacionamento.vue',
      name:'HomeEstacionamento',
      component : HomeEstacionamento
    },
  ],
})

export default router
