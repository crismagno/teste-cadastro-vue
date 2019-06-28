<template>
    
    <aside class="aside" v-if="visivel" >
        
        <router-link class="link" :class="{'dash' : dash}"
            @click="changeLink('dash')" to="/dashboard">Dashboard</router-link>
        <router-link class="link" :class="{'user' : user}"
            @click="changeLink('user')" to="/usuarios">Usuários</router-link>
        <router-link class="link" :class="{'prod' : prod}"
            @click="changeLink('prod')" to="/ciclos_produtos">Ciclos Produtos</router-link>
    </aside>
    
</template>

<script>
export default {
    props: { visivel: Boolean },
    data: function(){
        return {
            dash: false,
            user: false,
            prod: false,
        }
    },

    methods: {
        changeLink(nome){
            if (nome === 'dash') {
                this.dash = true
                this.user = false
                this.prod = false
            }
            if (nome === 'user') {
                this.dash = false
                this.user = true
                this.prod = false
            }
            if (nome === 'prod') {
                this.dash = false
                this.user = false
                this.prod = true
            }
        }
    },

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

    .link{
        padding: 10px 5px;
        color: #f4f4f4;
        font-size: 1.2em;
        border-bottom: 1px solid #fff2;
        width: 100%;
        text-align: center;
        font-weight: 400;
        letter-spacing: 1px;
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

    .dash, .user, .prod {
        border-left: 2px solid #fff;
    }

</style>
