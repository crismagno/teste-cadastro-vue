import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '../components/user/auth'
import Home from '../components/template/Home'

Vue.use(VueRouter)

const routes = [{
    name: 'auth',
    path: '/',
    component: Auth
}, {
    name: 'home',
    path: '/home',
    component: Home
}]

export default new VueRouter({
    mode: 'history',
    routes //ou -> routes: routes 
})
