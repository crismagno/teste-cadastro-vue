<template>
    <div>
        <div :class="{'description' : showDescription}">
            <div class="description2">
                {{ description }}
            </div>
        </div>
        <!-- ================================= -->
        <div class="search col-xs-12">
            <div class="col-xs-8 col-sm- ">
                <div class="form-group">
                    <input type="text" class="form-control" @keyup.enter="getProtudos"
                        placeholder="Pesquise..." v-model="nomeProduto" >
                </div>
            </div>

            <div class="col-xs-4  ">
                <button class="btn btn-info" @click="getProtudos" title="pesquisar">
                    <i class="fa fa-search" ></i>
                </button>
                <button style="margin-left: 5px;" class="btn btn-dark" @click="clearSearch" title="limpar pesquisa">
                    <i class="fa fa-close"></i>
                </button>
            </div>
        
        </div>
        <hr>

        <div class="List col-xs-12" :class="{'col-sm-12 col-md-7' : showUpDel}">
            <table class="table"> 
                <thead>
                    <th>Código</th>
                    <th>Nome</th>
                    <!-- <th>Slug</th> -->
                    <th>Preço</th>
                    <th>Qtd</th>
                    <th>Ações</th>
                </thead>
                <tbody v-for="(prod, i) in listaProdutos">
                    <tr :key="prod._id" :class="prod.done ? 'linha' : ''" title="click para ver a descrição"
                        @click="descriptionMode(prod.description)" 
                        @mouseleave="descriptionMode()" >
                        <td>{{ prod.cod }}</td>
                        <td>{{ prod.name }}</td>
                        <!-- <td>{{ prod.slug }}</td> -->
                        <td v-money="'R$'"> {{ prod.preco }}</td>
                        <td>{{ prod.quantity }}</td>
                        <td class="actions-list">
                            <button @click="changeMode('update', prod)" v-if="!prod.done" 
                                class="btn btn-warning" title="atualizar">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button @click="changeMode('delete', prod)" title="deletar"
                                style="margin-left: 5px;" class="btn btn-danger">
                                <i class="fa fa-trash-o"></i>
                            </button>
                            <button @click="markeDone(prod)" :class="prod.done ? 'btn-primary' : 'btn-default'"
                                style="margin-left: 5px;" class="btn " :title="prod.done ? 'desfazer' : 'desabilitar' ">
                                <i class="fa " :class="prod.done ? 'fa-undo' : 'fa-close'"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="updateOrDelete col-sm-12 col-md-5" v-if="showUpDel">
            <h3>{{label}}</h3>
            <div class="form-group">
                <input type="text" class="form-control" v-model="produto.name"
                    placeholder="Novo nome..." :readonly="readonly">
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="produto.preco"
                    placeholder="Novo preço..." :readonly="readonly">
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="produto.cod"
                    placeholder="Novo código..." :readonly="readonly">
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="produto.quantity"
                    placeholder="Nova quantidade..." :readonly="readonly">
            </div>
            <div class="form-group" v-if="!readonly">
                <textarea class="form-control" name="descricao" v-model="produto.description" 
                    cols="20" rows="3"></textarea>
            </div>
            <div class="actions btn-xs-6">
                <button class="btn" :class="label === 'Atualizar' ? 'btn-success' : 'btn-danger'" 
                    @click="deleteOrUpdate()">{{label}}</button>
                <button style="margin-left: 5px;" class="btn btn-default" @click="cancel">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiURL, userKey } from "../../config/global";
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
    data: function(){
        return {
            nomeProduto: null,
            listaProdutos: [],
            produto: {},
            readonly: false,
            showUpDel: false,
            label: '',
            showDescription: false,
            description: ''

        }
    },

    methods: {
        getProtudos(){
            const search = this.nomeProduto ? `&name__regex=/${this.nomeProduto}/` : '' 
            axios.get(`${baseApiURL}/api/products?sort=-createdAt${search}`)
                .then(resp => {
                    this.listaProdutos = resp.data
                    })
        },

        changeMode(mode, prod){
            this.produto = { ...prod }
            if (mode === 'update') {
                this.label = 'Atualizar'
                this.showUpDel = true
                this.readonly = false
            } 
            else if (mode === 'delete'){
                this.showUpDel = true
                this.readonly = true
                this.label = 'Deletar'
            }
        },

        deleteOrUpdate(){
            const method = this.readonly ? 'delete' : 'put'

            axios[method](`${baseApiURL}/api/products/${this.produto._id}`, this.produto )
                .then(resp => this.getProtudos())

            this.showUpDel = false
            this.readonly = false
                
        },

        cancel(){
            this.showUpDel = false
            this.readonly = false
        },

        clearSearch(){
            this.nomeProduto = ''
            this.getProtudos()
        },

        markeDone(prod){
            if (prod.done) {
                prod.done = false
            } else {
                prod.done = true
            }

            axios.put(`${baseApiURL}/api/products/${prod._id}`, {...prod})

            this.showUpDel = false
        },

        descriptionMode(description){
            if (description) {
                this.description = description
                this.showDescription = true
            } else {
                this.description = ''
                this.showDescription = false
            }
        }

    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getProtudos()

    },

    updated(){
        // this.getProtudos()
    }

}
</script>

<style>

    .List {
        height: 300px;
        overflow-x: hidden;
        border: 1px solid #0001;
        padding: 10px 5px;
        margin: 10px 0px;
        border-radius: 5px;
    }

    .actions-list {
        width: 150px;
    }

    .linha {
        text-decoration: line-through;
        color: #0003;
    }

    .description {
        position: absolute;
        width: 200px;
        height: 200px;
        border: 1px solid #0003;
        border-radius: 5px;
        background-color: #fff;
        top: 90px;
        right: 40px;
        padding: 5px;
         
    }

    .description2 {
        background-color: #0005;
        color: #fff;
        height: 100%;
        text-align: start;
        padding-left: 5px;
        font-size: 20px;
        
    }
</style>
