<template>
    <div>
        <div class="form col-md-7">
            <div class="form-group">
                <label for="">Nome</label>
                <input class="form-control" v-model="produtoParaAtualizar.name" readonly
                    placeholder="Nome do produto..." title="Nome produto" />
            </div>
            <div class="form-group">
                <label for="">Código</label>
                <input type="type" class="form-control" v-model="produtoParaAtualizar.cod" readonly
                    placeholder="Código do Produto..." title="Código do Produto"/>
            </div>
            
            <div class="form-group">
                <label for="">Descrição</label>
                <textarea class="form-control" name="descricao" v-model="produtoParaAtualizar.description" readonly
                    placeholder="Descrição do produto..." title="Descrição do produto"></textarea>
            </div>
            <div class="btn-group" style="float: right">
                <button class="btn btn-danger" @click="deleteProduct" >Deletar produto</button>
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
        deleteProduct(){
            axios.delete(`${baseApiURL}/api/products/${this.produtoParaAtualizar._id}`)
                .then(resp => {
                    this.$toasted.global.defaultSuccess({msg: 'Produto deletado!!!'})
                    this.$router.push({path: '/load_produto'})
                })
                .catch(e => showError(e))
        },
        
        cancel(){
            this.$router.push({path: '/load_produto'})
        }
    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))  
        document.title = 'Deletar Produto' 
    },
}
</script>

<style>

</style>
