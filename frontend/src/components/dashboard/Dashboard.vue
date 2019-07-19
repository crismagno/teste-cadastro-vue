<template>
    <div class="dashboard">
        <Pagetitle title="Dashboard" 
            sub="Base de conhecimento" icon="fa fa-home" />

        <div class="stats">
            <Stat title="Produtos" :value="totalProdutos" icon="fa fa-folder" color="#d54d50" />
            <!-- <Stat title="Artigos" value="10" icon="fa fa-file" color="#3bc480" /> -->
            <Stat title="Usuários" :value="totalUsers" icon="fa fa-users" color="#3282cd" />
        </div>
    </div>
</template>

<script>

import Stat from "../widget/Stat";
import Pagetitle from "../template/Pagetitle";
import axios from 'axios'
import { baseApiURL, userKey } from '../../config/global'

export default {
    name: 'Dashboard',
    components: { Stat, Pagetitle },
    data: function(){
        return{
            totalProdutos: 0,
            totalUsers: 0
        }
    },

    methods: {
        countProdutcs(){
            axios.get(`http://localhost:3005/api/products/count`)
                .then(resp => this.totalProdutos = resp.data.value)
            axios.get(`http://localhost:3005/api/users/count`)
                .then(resp => this.totalUsers = resp.data.value)
        }
    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.countProdutcs()
        document.title = 'Dashboard'
    }
}
</script>

<style>

    .stats{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

</style>
