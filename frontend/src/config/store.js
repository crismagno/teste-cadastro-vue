import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null, //dados do usuário
        visible: true,  //visibilidade dos componentes quando estiver na tela de auth
        tab: '',    //pra mudar a navegação das tabs do componente de ciclos de produto
        menuVisible: true, //visibilidade do menu de navegação
        produtoParaAtualizar: null, //guarda o produto para atualizar ou deletar
        menuSelecionado: null,  //insere o menu selecionado
        sinoAlerta: false, // sino que alerta quando tiver anotações do dia
    },

    mutations: {
        setUser(state, user){
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        },

        show(state, col){
            state.visible = col
        },

        tabSelected(state, newTab){
            state.tab = newTab
            
        },

        showMenu(state, menuVisible){
            state.menuVisible = menuVisible
        
        },

        ProdutoUpdateDelete(state, produto){
            state.produtoParaAtualizar = produto
        },

        menuSelected(state, menuSelecionado){
            state.menuSelecionado = menuSelecionado
        },

        showSino(state, sino) {
            state.sinoAlerta = sino
        }
    }
})
