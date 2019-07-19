<template>
    <div class="ciclos-produtos">

        <Pagetitle title="Ciclos de Produtos"   
            sub="Meus Produtos" icon="fa fa-industry" />

        <ul class="nav nav-tabs">
            <li :class="{'active' : tab === 'list'}"><a data-toggle="tab" 
                href="javascript:" @click="changeTab('list')">Lista Produtos </a></li>

            <li :class="{'active' : tab === 'create'}"><a data-toggle="tab" 
                href="javascript:" @click="changeTab('create')">Postar Produto </a></li>

            <!-- <li :class="{'active' : tab === 'update'}"><a data-toggle="tab" 
                href="javascript:" @click="changeTab('update')">Update</a></li>
            
            <li :class="{'active' : tab === 'deletar'}"><a data-toggle="tab" 
                href="javascript:" @click="changeTab('deletar')">Delete</a></li> -->
        </ul>

        <div class="tab-content">
            <div id="list" class="tab-pane fade in" :class="{'active' : tab === 'list'}">
                <h3>Lista de Produtos</h3>
                <ListProduct />
            </div>
            <div id="create" class="tab-pane fade in" :class="{'active' : tab === 'create'}">
                <h3>Cadastre seu produto</h3>
                <CreateProduct />
            </div>
            <!-- <div id="update" class="tab-pane fade in" :class="{'active' : tab === 'update'}">
                <h3>Atualizar Produto</h3>
                <UpdateProduct />
            </div>
            <div id="deletar" class="tab-pane fade in" :class="{'active' : tab === 'deletar'}">
                <h3>Deletar Produto</h3>
                <DeleteProduct />
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Pagetitle from "../template/Pagetitle";
import CreateProduct from "./CreateProduct";
import ListProduct from "./ListProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

export default {
    components: { Pagetitle, CreateProduct, ListProduct, UpdateProduct, DeleteProduct },

    computed: mapState(['tab']),

    methods: {
        changeTab(menu){
            this.$store.commit('tabSelected', menu)  
        }
    },

    mounted(){
        this.$store.commit('tabSelected', 'list')
        document.title = 'Ciclos de Produtos'
    }
}
</script>

<style>

</style>
