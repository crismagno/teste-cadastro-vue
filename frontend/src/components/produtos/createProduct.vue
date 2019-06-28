<template>
    <div>
        <div class="form col-md-7">
            <div class="form-group">
                <input class="form-control" v-model="product.name" placeholder="Nome do produto..."/>
            </div>
            <div class="form-group">
                <input class="form-control" v-model="product.slug"  placeholder="Slug do produto Ex.: carro-corrida" />
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="product.preco"  placeholder="Preço do produto..." />
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="product.cod" placeholder="Codigo do Produto..."/>
            </div>
            <button class="btn btn-primary" @click="criarProduto()">postar produto</button>
            <button style="margin-left: 5px;" class="btn btn-default" @click="product = {}">zerar produto</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
    data: function(){
        return {
            product: {}
        }
    },

    methods: {
        criarProduto(){
            axios.post('http://localhost:3005/api/products', {...this.product})
                .then(resp => alert('produto cadastrado com sucesso!'))
                .catch(e => alert('deu merda!!!!!!!!'))
                this.product = {}
                this.$store.commit('tabSelected', 'list')
        }
    }


}
</script>

<style>

</style>
