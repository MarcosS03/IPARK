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



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeIPark',
      component : HomeIPark
      
    },
    {
      path: '/Login',
      name: 'Login',
      component : Login
    },
    {
      path: '/CadastroPessoa',
      name: 'CadastroPessoa',
      component : CadastroPessoa
    },
    {
    path: '/CadastrarVeiculo',
    name:'CadastrarVeiculo',
    component : CadastrarVeiculo
    },
    {
      path: '/Carteira',
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
      path: '/Perfil',
      name:'Perfil',
      component : Perfil
    },
    {
      path: '/TipoPessoa',
      name:'TipoPessoa',
      component : TipoPessoa
    },
    {
      path: '/VeiCadastrados',
      name:'VeiCadastrados',
      component : VeiCadastrados
    },
    {
      path: '/VeiEstacionados',
      name:'VeiEstacionados',
      component : VeiEstacionados
    },
  ],
})

export default router
