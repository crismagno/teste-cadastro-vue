<template>
    <div>
        <div class="form col-md-7">
            <div class="form-group">
                <input class="form-control" v-model="product.name" 
                    placeholder="Nome do produto..." />
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="product.preco"  
                    placeholder="Preço do produto..." />
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="product.cod" 
                    placeholder="Codigo do Produto..." min="0" max="10000000"/>
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="product.quantity"  
                    placeholder="Quantidade do produto..." min="0" max="10000000"/>
            </div>
            <div class="form-group">
                <textarea class="form-control" name="descricao" v-model="product.description" 
                    cols="20" rows="3" maxlength="100" placeholder="Dê uma descrição do produto..."></textarea>
            </div>
            <button class="btn btn-primary" @click="criarProduto()">Postar produto</button>
            <button style="margin-left: 5px;" class="btn btn-default" @click="product = {}">Cancelar produto</button>
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

    computed: {

    },

    methods: {
        criarProduto(){
            axios.post(`${baseApiURL}/api/products`, {...this.product})
                .then(resp => { 
                    this.$toasted.global.defaultSuccess({msg: 'Produto cadastrado!'})
                    this.$router.push({path: '/load_produto'})
                    // this.$store.commit('tabSelected', 'list')
                    })
                .catch(e => showError("Erro ao cadastrar Produto!!!"))
                this.product = {}
                
            

            // const imagem = document.querySelector('input[type=file]').files[0]
            // console.log(imagem)
            // axios.post(`${baseApiURL}/api/products/imagem`, {...imagem})
            //     .then(resp => console.log(resp))
            //     .catch(e => console.log(e))
        }
    }

}
</script>

<style>

</style>
