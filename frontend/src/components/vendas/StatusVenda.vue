<template>
    <div class="status-venda">
        <div class="col-xs-12">
        <PageTitle title="Vendas" sub="Todas Vendas Vendas" icon="fa fa-table"/>
            <table class="table"> 
                <thead >
                    <th>Código</th>
                    <th>Nome</th>
                    <!-- <th>Slug</th> -->
                    <th>Preço</th>
                    <th>Qtd</th>
                    <th>Venda</th>
                    <th>Data</th>
                </thead>
                <tbody v-for="(status, i) in listaStatusVenda">
                    <tr :key="status._id" >
                        <td>{{ status.cod }}</td>
                        <td>{{ status.name }}</td>
                        <!-- <td>{{ status.slug }}</td> -->
                        <td v-money="'R$'"> {{ status.preco }}</td>
                        <td>{{ status.quantity }}</td>
                        <td v-money="'R$'">{{ status.valorVenda }}</td>
                        <td>{{ status.createdAt}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { baseApiURL, userKey } from '../../config/global'
import Vue from 'vue'

import PageTitle from "../template/Pagetitle";

Vue.directive('money', {
    inserted(el, binding){
        const amount =parseFloat(el.innerHTML).toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
        el.innerHTML = `${binding.value} ${amount}`
    }
})
export default {

    components: { PageTitle },

    data: function(){
        return {
            listaStatusVenda: []
        }
    },

    methods: {
        getStatusVenda(){ 
            axios.get(`${baseApiURL}/api/status-venda?sort=-createdAt`)
                .then(resp => {
                    this.listaStatusVenda = resp.data
                })
        },
    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getStatusVenda()
        document.title = 'Status Venda'
    }
}

</script>

<style>

.status-venda {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100%;
    width: 100%; */
    /* background-color: black; */
}

/* img{
    width: 200px;
    height: 200px;
} */

</style>
