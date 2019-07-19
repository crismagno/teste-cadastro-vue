<template>
    <div>
        <div class="form col-md-7">
            <div class="form-group">
                <input class="form-control" v-model="prod.name" readonly/>
            </div>
            <div class="form-group">
                <input class="form-control" v-model="prod.slug" readonly/>
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="prod.preco"  readonly/>
            </div>
            <div class="form-group">
                <input type="number" class="form-control" v-model="prod.cod" readonly/>
            </div>
            <button class="btn btn-primary" @click="deleteProduct()" >Deletar produto</button>
            <button style="margin-left: 5px;" @click="cancel()" class="btn btn-default" >Cancelar</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { baseApiURL, userKey } from "../../config/global";

export default {

    computed: mapState(["prod"]),

    methods: {
        deleteProduct(){
            axios.delete(`${baseApiURL}/api/products/${prod._id}`)
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

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
    },
}
</script>

<style>

</style>
