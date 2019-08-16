<template>
    <div class="ciclos-produtos">

        <Pagetitle title="Ciclos de Produtos"   
            sub="Meus Produtos" icon="fa fa-list-alt" />

        <ul class="nav nav-tabs">
            <li :class="{'active' : tab === 'list'}" v-if="tab === 'list' || tab === 'create'">
                <a data-toggle="tab" 
                    href @click="changeTab('list')">Listar </a>
            </li>

            <li :class="{'active' : tab === 'create'}" v-if="tab === 'create' || tab === 'list'">
                <a data-toggle="tab"  
                    href @click="changeTab('create')">Postar</a>
            </li>

            <li :class="{'active' : tab === 'update'}" v-if="tab === 'update'">
                <a data-toggle="tab" 
                    href @click="changeTab('update')">Atualizar </a>
            </li>
            
            <li :class="{'active' : tab === 'deletar'}" v-if="tab === 'deletar'">
                <a data-toggle="tab" 
                    href @click="changeTab('deletar')">Deletar </a>
            </li>
        </ul>

        <div class="tab-content">
            <div id="list" class="tab-pane fade in" :class="{'active' : tab === 'list'}" v-if="tab === 'list'">
                <h3>Lista de Produtos</h3>
                <ListProduct />
            </div>
            <div id="create" class="tab-pane fade in" :class="{'active' : tab === 'create'}" v-if="tab === 'create'">
                <h3>Cadastre seu produto</h3>
                <CreateProduct />
            </div>
            <div id="update" class="tab-pane fade in" :class="{'active' : tab === 'update'}" v-if="tab === 'update'">
                <h3>Atualizar Produto</h3>
                <UpdateProduct />
            </div>
            <div id="deletar" class="tab-pane fade in" :class="{'active' : tab === 'deletar'}" v-if="tab === 'deletar'">
                <h3>Deletar Produto</h3>
                <DeleteProduct />
            </div>
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

    created(){
        this.$store.commit('tabSelected', 'list')
        this.$store.commit('menuSelected', 'ciclos_de_produtos')
        document.title = 'Ciclos de Produtos'
    }
}
</script>

<style>

</style>
