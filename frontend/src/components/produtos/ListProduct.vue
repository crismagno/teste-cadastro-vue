<template>
    <div>
        <div class="List">
            <table class="table"> 
                <thead>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Slug</th>
                    <th>Preço</th>
                </thead>
                <tbody v-for="(prod, i) in listaProdutos">
                    <tr :key="prod._id">
                        <td>{{ prod.cod }}</td>
                        <td>{{ prod.name }}</td>
                        <td>{{ prod.slug }}</td>
                        <td>R$ {{ prod.preco }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: function(){
        return {
            listaProdutos: []
        }
    },

    methods: {
        getProtudos(){
            axios.get('http://localhost:3005/api/products')
                .then(resp => this.listaProdutos = resp.data)
                .catch(e => this.getProtudos())
        }
    },

    mounted(){
        this.getProtudos()
    }


}
</script>

<style>

</style>
