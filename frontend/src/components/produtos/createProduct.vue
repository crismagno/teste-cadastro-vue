<template>
    <div>
        <div class="form col-md-7">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input class="form-control" id="nome" v-model="product.name" autofocus 
                    placeholder="Nome do produto..." title="Nome produto" />
            </div>
            <div class="form-group">
                <label for="preco">Preço</label>
                <input type="number" class="form-control" id="preco" v-model="product.preco"  
                    placeholder="Preço do produto..." title="Preço produto"/>
            </div>
            <div class="form-group">
                <label for="cod">Código</label>
                <input type="type" class="form-control" id="cod" v-model="product.cod" 
                    placeholder="Codigo do Produto..." maxlength="8" title="Código produto"/>
            </div>
            <div class="form-group">
                <label for="quantity">Quantidade</label>
                <input type="number" class="form-control" id="quantity" v-model="product.quantity"  
                    placeholder="Quantidade do produto..." min="0" max="10000000" title="Quantidade produto"/>
            </div>
            <div class="form-group">
                <label for="desconto">Desconto%</label>
                <input type="number" class="form-control" id="desconto" v-model="product.desconto"  
                    placeholder="Desconto..." min="0" max="100" title="Desconto produto"/>
            </div>
            <div class="form-group">
                <label for="descricao">Descrição</label>
                <textarea class="form-control" name="descricao" id="descricao" v-model="product.description" title="Descrição produto"
                    cols="20" rows="3" maxlength="100" placeholder="Dê uma descrição do produto..."></textarea>
            </div>
            <div class="btn-group" style="float: right">
                <button class="btn btn-primary" @click="criarProduto()">Postar produto</button>
                <button style="margin-left: 5px;" class="btn btn-default" 
                    @click="product = {}">Cancelar produto</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiURL, showError } from "../../config/global";

export default {
    data: function(){
        return {
            product: {}
        }
    },

    methods: {
        criarProduto(){
            axios.post(`${baseApiURL}/api/products`, {...this.product})
                .then(resp => { 
                    this.$toasted.global.defaultSuccess({msg: 'Produto cadastrado!'})
                    this.$router.push({path: '/load_produto'})
                    this.product = {}

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
                
        }
    },

    created(){
        document.title = 'Criar Produto'
    }

}
</script>

<style>

</style>
