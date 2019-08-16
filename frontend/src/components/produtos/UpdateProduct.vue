<template>
    <div>
        <div class="form col-md-7">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input class="form-control" id="nome" v-model="produtoParaAtualizar.name" autofocus
                    placeholder="Novo nome do produto..." title="Novo nome produto" />
            </div>
            <div class="form-group">
                <label for="preco">Preço</label>
                <input type="number" id="preco" class="form-control" v-model="produtoParaAtualizar.preco"
                    placeholder="Novo preço do produto..." title="Novo preço produto"/>
            </div>
            <div class="form-group">
                <label for="cod">Código</label>
                <input type="type" id="cod" class="form-control" v-model="produtoParaAtualizar.cod"
                    placeholder="Novo código do Produto..." maxlength="8" title="Novo código produto"/>
            </div>
            <div class="form-group">
                <label for="quantity">Quantidade</label>
                <input type="number" id="quantity" class="form-control" v-model="produtoParaAtualizar.quantity"
                    placeholder="Nova quantidade do produto..." min="0" max="10000000" 
                    title="Nova quantidade produto"/>
            </div>
            <div class="form-group">
                <label for="desconto">Desconto%</label>
                <input type="number" id="desconto" class="form-control" v-model="produtoParaAtualizar.desconto"  
                    placeholder="Novo desconto..." min="0" max="100" title="Novo desconto produto"/>
            </div>
            <div class="form-group">
                <label for="descricao">Descrição</label>
                <textarea class="form-control" id="descricao" v-model="produtoParaAtualizar.description"
                    cols="20" rows="3" maxlength="100" 
                    placeholder="Dê uma nova descrição do produto..." title="Nova descrição produto"></textarea>
            </div>
            <div class="btn-group" style="float: right">
                <button class="btn btn-success" @click="updateProduct()" 
                    >Atualizar produto</button>
                <button style="margin-left: 5px;" @click="cancel()" 
                    class="btn btn-default" >Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiURL, userKey, showError } from "../../config/global";

export default {

    computed: mapState(['produtoParaAtualizar']),

    methods: {
        updateProduct(){
            axios.put(`${baseApiURL}/api/products/${this.produtoParaAtualizar._id}`, this.produtoParaAtualizar)
                .then(resp => {
                    this.$toasted.global.defaultSuccess({msg: 'Produto Atualizado com Sucesso!!!'})
                    this.$router.push({path: '/load_produto'})
                })
                .catch(e => {
                    if (e.response.data.code === 11000) {
                        this.$toasted.global.defaultError({msg: 'Esse código já existi!'})
                    }
                    const errors = e.response.data.errors
                    for (let i = errors.length-1; i >= 0 ; i--) {
                        this.$toasted.global.defaultError({msg: errors[i]});
                    }
                })
        },

        cancel(){
            this.$router.push({path: '/load_produto'})
        }
    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        document.title = 'Atualizar Produto'
    }

}
</script>

<style>

</style>
