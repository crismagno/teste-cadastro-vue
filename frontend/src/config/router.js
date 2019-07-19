import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '../components/user/auth'
import Usuarios from '../components/user/Usuarios'

import Dashboard from "../components/dashboard/Dashboard";
import CiclosProdutos from "../components/produtos/CiclosProdutos";
import LoadProduto from "../components/produtos/LoadProduto";
import Venda from "../components/vendas/Venda";
import StatusVenda from "../components/vendas/StatusVenda";

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
}, {
    name: 'load_produto',
    path: '/load_produto',
    component: LoadProduto
}, {
    name: 'venda',
    path: '/venda',
    component: Venda
}, {
    name: 'status_venda',
    path: '/status_venda',
    component: StatusVenda
}]

export default new VueRouter({
    mode: 'history',
    routes //ou -> routes: routes 
})
