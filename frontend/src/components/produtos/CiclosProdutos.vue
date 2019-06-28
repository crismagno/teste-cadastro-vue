<template>
    <div class="ciclos-produtos">

        <Pagetitle title="Ciclos de Produtos"   
            sub="Meus Produtos" icon="fa fa-industry" />

        <ul class="nav nav-tabs">
            <li :class="{'active' : tab === 'list'}"><a data-toggle="tab" 
                href="javascript:" @click="changeTab('list')">List </a></li>

            <li :class="{'active' : tab === 'create'}"><a data-toggle="tab" 
                href="javascript:" @click="changeTab('create')">Create </a></li>

            <li :class="{'active' : tab === 'update'}"><a data-toggle="tab" 
                href="javascript:" @click="changeTab('update')">Update</a></li>
            
            <li :class="{'active' : tab === 'deletar'}"><a data-toggle="tab" 
                href="javascript:" @click="changeTab('deletar')">Delete</a></li>
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
            <div id="update" class="tab-pane fade in" :class="{'active' : tab === 'update'}">
                <h3>Menu 3</h3>
                <p>Some content in menu 3.</p>
            </div>
            <div id="deletar" class="tab-pane fade in" :class="{'active' : tab === 'deletar'}">
                <h3>Menu 4</h3>
                <p>Some content in menu 4.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Pagetitle from "../template/Pagetitle";
import CreateProduct from "./createProduct";
import ListProduct from "./ListProduct";

export default {
    components: { Pagetitle, CreateProduct, ListProduct },
    data: function(){
        return {
    
        }
    },

    computed: mapState(['tab']),
    methods: {
        changeTab(menu){
            this.$store.commit('tabSelected', menu)   
        }
    },

    mounted(){
        this.$store.commit('tabSelected', 'list')
    }
}
</script>

<style>

</style>
