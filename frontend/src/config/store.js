import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        visible: true,
        tab: ''
    },

    mutations: {
        setUser(state, user){
            state.user = user
            if (user) {
                axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
            } else {
                delete axios.defaults.headers.Authorization
            }
        },

        show(state, col){
            state.visible = col
        },

        tabSelected(state, newTab){
            state.tab = newTab
        }
    }
})
