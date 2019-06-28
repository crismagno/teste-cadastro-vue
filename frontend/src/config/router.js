import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '../components/user/auth'
import Usuarios from '../components/user/Usuarios'

import Dashboard from "../components/dashboard/Dashboard";
import CiclosProdutos from "../components/produtos/CiclosProdutos";

Vue.use(VueRouter)

const routes = [{
    name: 'auth',
    path: '/',
    component: Auth
}, {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard
}, {
    name: 'usuarios',
    path: '/usuarios',
    component: Usuarios
}, {
    name: 'ciclos_produtos',
    path: '/ciclos_produtos',
    component: CiclosProdutos
}]

export default new VueRouter({
    mode: 'history',
    routes //ou -> routes: routes 
})
