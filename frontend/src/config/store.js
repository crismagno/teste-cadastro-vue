import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        visible: true,
        tab: '',
        menuVisible: true
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
        }

    }
})
