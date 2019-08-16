<template>
    <div>
        <Pagetitle title="Venda" sub="Faça sua venda" icon="fa fa-shopping-cart" />
        <VendaModal :produto="produto" />
        <div class="search col-xs-12">
            <div class="col-xs-8 ">
                <div class="form-group">
                    <input type="text" class="form-control" 
                        placeholder="Pesquise o produto..." v-model="nomeProduto" @keyup.enter="getProtudos">
                </div>
            </div>

            <div class="col-xs-4 ">
                <button class="btn btn-info" title="pesquisar" @click="getProtudos">
                    <i class="fa fa-search" ></i>
                </button>
                <button style="margin-left: 5px;" class="btn btn-dark"  
                    title="limpar pesquisa" @click="limparPesquisa">
                    <i class="fa fa-close"></i>
                </button>
            </div>
        </div>

        <div class="div-produtos" >
            <a href v-for="prod in listaProdutos" :key="prod._id" 
                class="produto" @click.prevent="teste(prod)" 
                v-if="!prod.done "
                data-toggle="modal" data-target="#myModal">
                
                <div class="image">
                    <img  alt="" >
                </div>
                
                <div class="about-text">
                    <h4>{{prod.name}}</h4>
                    <p>{{prod.description}}</p>
                </div>
                <div class="about-num">
                    Qtd:<span class="quantity"> {{prod.quantity}}</span><br>
                    Preço:<span class="preco" v-money="'R$'"> {{prod.preco}} </span>
                        <strong style="color:red;" v-if="prod.desconto"> - {{prod.desconto}}%</strong>
                        <br>
                    Cod: <span class="codigo">{{prod.cod}}</span>
                
                </div>
            </a>    
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import { baseApiURL, userKey } from '../../config/global'

import Pagetitle from "../template/Pagetitle";
import VendaModal from "./VendaModal";

import Vue from 'vue'

Vue.directive('money', {
    inserted(el, binding){
        const amount =parseFloat(el.innerHTML).toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
        el.innerHTML = `${binding.value} ${amount}`
    }
})

export default {
    name: 'venda',
    data: function(){
        return {
            nomeProduto: '',
            listaProdutos: [],
            produto: {},
        }
    },
    components: { Pagetitle, VendaModal },

    methods: {
        async getProtudos(){
            const search = this.nomeProduto ? `&name__regex=/${this.nomeProduto}/` : '' 
            await axios.get(`${baseApiURL}/api/products?sort=-createdAt${search}`)
                .then(resp => {
                    this.listaProdutos = resp.data
                })
        },

        limparPesquisa(){
            this.nomeProduto = ''
            this.getProtudos()
        },

        teste(prod){
            this.produto = { ...prod }
        }
    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getProtudos()
        this.$store.commit('menuSelected', 'venda')
        document.title = 'Venda'
    },

    mounted(){
        this.getProtudos()
    }
    
}

</script>

<style>

    .div-produtos {

        margin-top: 60px;
        width: 100%;
        /* border-radius: 5px; */
        /* padding: 5px; */
        /* overflow-x: hidden; */

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap;

        
    }

    .produto {

        width: 220px;
        height: 275px;
        border: 1px solid #0003;
        border-radius: 3px;
        margin-bottom: 20px;
        padding: 5px;
        text-decoration: none;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19)  ;
          
    }

    .produto:hover{
        text-decoration: none;
        color: rgba(0,0,0,.8);
    }

    .produto:active{
        text-decoration: none;
        color: rgba(0,0,0,.8);
    }
    
    .produto:enabled{
        text-decoration: none;
        color: rgba(0,0,0,.8);
    }
    

    .image{
        width: 100%;
        height: 50%;
        max-width: 100%;
        max-height: 50%;
        background: #0007;
    }

    .image img{
        width: 100%;
        height:100%; 
    }

    .about-text h4 {
        font-size: 16px;
        font-weight: bold;
        margin: 4px;
    }
    
    .about-text p {
        font-size: 13.5px;
    }

    .about-text{
        padding: 5px;
        width: 95%;
        height: 70px;
        overflow: hidden;
    }

    .about-num{
        padding: 5px;
        height: 70px;
        /* float: right; */
        font-size: 14;
        font-weight: 700;
        overflow-y: auto;
    }

    .quantity {
        color: blue;
        font-weight: 700;
    }

    .preco {
        color: green;
        font-weight: 700;
    }

    .codigo {
        color: rgb(255, 166, 0);
        font-weight: 700; 
    }


/* ===================== MEDIA QUERIES ======================= */


/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .produto {
        width: 47%;
    }
} 

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .produto {
        width: 47%;
    }
} 

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .produto {
        width: 35%;
    }
} 

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .produto {
        width: 30%;
    }
} 

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .produto {
        width: 19%;
    }
}


</style>
