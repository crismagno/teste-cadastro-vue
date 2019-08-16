<template>
    <div class="dashboard">
        <Pagetitle title="Dashboard" 
            sub="Base de conhecimento" icon="fa fa-home" />

        <div class="stats">
            <Stat title="Produtos" :value="totalProdutos" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Vendas" :value="totalVendas" icon="fa fa-industry" color="#3bc480" />
            <Stat title="Anotações" :value="totalAnotacoes" icon="fa fa-edit" color="#3282cd" />
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
            totalAnotacoes: 0,
            totalVendas: 0
        }
    },

    methods: {
        countProdutcs(){
            axios.get(`${baseApiURL}/api/products/count`)
                .then(resp => this.totalProdutos = resp.data.value)
            axios.get(`${baseApiURL}/api/anotacao/count`)
                .then(resp => this.totalAnotacoes = resp.data.value)
            axios.get(`${baseApiURL}/api/status-venda/count`)
                .then(resp => this.totalVendas = resp.data.value)

        }
    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.countProdutcs()
        this.$store.commit('menuSelected', 'dashboard')
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
