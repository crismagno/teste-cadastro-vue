<template>
    <div>
        <div class="search row">
            <div class="col-xs-2 col-md-1">
                <button style="margin-left: 5px;" data-toggle="tooltip" data-placement="bottom" @click="codOrName = codOrName ? false : true"
                    class="btn btn-default" :title="codOrName ? 'trocar para código' : 'trocar para nome'">
                    <i class="fa fa-exchange"></i>
                </button>
            </div>
            <div class="col-xs-6 col-md-9">
                <div class="form-group">
                    <input type="text" class="form-control" @keyup.enter="getProtudos" v-model="nomeProduto"
                        :placeholder="codOrName ? 'pesquise por nome...' : 'pesquise por código...'"  >
                </div>
            </div>

            <div class="col-xs-4 col-md-2">
                <button class="btn btn-info" @click="getProtudos" data-toggle="tooltip" title="pesquisar">
                    <i class="fa fa-search" ></i>
                </button>
                
                <button style="margin-left: 5px;" class="btn btn-dark" @click="clearSearch" data-toggle="tooltip" title="limpar pesquisa">
                    <i class="fa fa-close"></i>
                </button>
            </div>
        
        </div>
        <hr>

        <div class="List col-xs-12 ">
            <table class="table"> 
                <thead>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Qtd</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    <tr v-for="prod  in listaProdutos" :class="prod.done ? 'linha' : ''" :key="prod._id">
                        <td>{{ prod.cod }}</td>
                        <td>{{ prod.name }}</td>
                        <td >
                            R$ {{ prod.preco }} 
                            <span style="color:red" v-if="prod.desconto">- {{prod.desconto}}%</span>
                        </td>
                        <td>{{ prod.quantity }}</td>
                        <td class="actions-list">
                            <button style="margin: 2px;" @click="changeDeleteUpdate('update', prod)" v-if="!prod.done" 
                                class="btn btn-warning" title="atualizar">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button @click="changeDeleteUpdate('deletar', prod)" title="deletar"
                                style="margin: 2px;" class="btn btn-danger">
                                <i class="fa fa-trash-o"></i>
                            </button>
                            <button @click="markeDone(prod)" :class="prod.done  ? 'btn-primary' : 'btn-default'" data-toggle="tooltip"
                                style="margin: 2px;" class="btn "  :title="prod.done ? 'desfazer' : 'desabilitar' ">
                                <i class="fa " :class="prod.done ? 'fa-undo' : 'fa-close'"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            label: '',
            codOrName: true
        }
    },

    methods: {
        getProtudos(){
            const codigoNome = this.codOrName ? 'name' : 'cod'
            const search = this.nomeProduto ? `&${codigoNome}__regex=/${this.nomeProduto}/` : '' 
            axios.get(`${baseApiURL}/api/products?sort=-createdAt${search}`)
                .then(resp => {
                    this.listaProdutos = resp.data
                    })
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

        changeDeleteUpdate(tabSelecionada, produto){
            this.$store.commit('tabSelected', tabSelecionada)
            this.$store.commit('ProdutoUpdateDelete', produto)

        }

    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getProtudos()
        document.title = 'Listar Produto'
    },

}


</script>

<style>

    .List {
        max-height: 400px;
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

</style>
