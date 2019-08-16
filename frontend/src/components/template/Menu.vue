<template>
    
    <aside class="aside" v-if="visivel" :class="!menuVisible ? 'aside-mini' : ''">  

            <router-link class="link" :class="{linkSelecionado : menuSelecionado === 'dashboard'}" to="/dashboard">
                <i class="fa fa-dashboard"></i>
                {{menuVisible ? 'Dashboard' : ''}}
            </router-link>
            <router-link class="link" :class="{linkSelecionado : menuSelecionado === 'venda'}" to="/venda">
                <i class="fa fa-shopping-cart"></i>
                {{menuVisible ? 'Vender' : ''}}
            </router-link>
            <a class="link" :class="{linkSelecionado : menuSelecionado === 'ciclos_de_produtos'}" href  @click.prevent="ciclosProdutos()">
                <i class="fa fa-list-alt"></i>
                {{menuVisible ? 'Ciclos Produtos' : ''}}
            </a>
            <router-link class="link" :class="{linkSelecionado : menuSelecionado === 'sumario_venda'}" to="/status_venda">
                <i class="fa fa-industry"></i>
                {{menuVisible ? 'Sumário Vendas' : ''}}
            </router-link>
            <router-link class="link" :class="{linkSelecionado : menuSelecionado === 'usuario'}" to="/usuario">
                <i class="fa fa-user"></i>
                {{menuVisible ? 'Usuário' : ''}}
            </router-link>
            <router-link class="link" :class="{linkSelecionado : menuSelecionado === 'anotacao'}" to="/anotacao">
                <i class="fa fa-edit"></i>
                {{menuVisible ? 'Anotações' : ''}}
            </router-link>
         
    </aside>
    
</template>

<script>
import { mapState } from "vuex";

export default {
    props: { visivel: Boolean },
    computed: mapState(['menuSelecionado', 'menuVisible']),
    methods: {
        ciclosProdutos(){
            this.$router.push({path: '/load_produto'})
        }
    }
}

</script>

<style>

    .visivel {
        display: none;
    }

    .aside {
        
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        background: linear-gradient(to right, #232526, #414345);
        grid-area: menu;
        
    }

    .aside-mini .link {
        text-align: center;
    }  

    .link{
        padding: 10px 10px;
        color: #f4f4f4;
        font-size: 1.2em;
        border-bottom: 1px solid #fff2;
        width: 100%;
        text-align: start;
        font-weight: 400;
        letter-spacing: 1px;
        /* padding: 10px; */
    }

    .link:hover {
        background-color: #FFF2; 
        color: #f4f4f4;
        text-decoration: none;
    }

    .link:enabled {
        text-decoration: none;
        color: #f4f4f4;
    }

    .linkSelecionado {
        background-color: #FFF2; 
        color: #f4f4f4;
        text-decoration: none;
    }

</style>
