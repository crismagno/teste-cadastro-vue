<template>
    <div>
        <div class="form col-md-7">
            <div class="form-group">
                <input class="form-control" v-model="prod.name"/>
            </div>
            <div class="form-group">
                <input class="form-control" v-model="prod.slug" />
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="prod.preco"  />
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="prod.cod" />
            </div>
            <button class="btn btn-primary" @click="updateProduct()" >Atualizar produto</button>
            <button style="margin-left: 5px;" @click="cancel()" class="btn btn-default" >Cancelar</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiURL } from "../../config/global";

export default {

    data: function(){
        return {
            product: {}
        }
    },

    computed: mapState(["prod"]),

    methods: {
        updateProduct(){
            axios.put(`${baseApiURL}/api/products/${prod._id}`, prod)
                .then(resp => alert(prod))
                .catch(e => alert(e))
            this.$store.commit('tabSelected', 'list')
            this.$store.commit('prodUpdate', {})
        },

        cancel(){
            this.$store.commit('tabSelected', 'list')
            this.$store.commit('prodUpdate', {})

        }
    },

}
</script>

<style>

</style>
