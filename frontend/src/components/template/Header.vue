<template>
    <header class="header" v-if="visivel"> 
        <div class="brand">
            <a href="javascript:;">iPet</a>
        </div>

        <span class=" header-email">O Melhor PetShop</span>

        <a href="javascript:;" class="btn-logout" @click="sair()">
            Sair <i class="fa fa-sign-out"></i>
        </a>
    </header>
</template>

<script>

import { showError, userKey, baseApiURL } from "../../config/global";

export default {
    props: {
        title: String,
        visivel: Boolean
    },

    methods: {
        sair() {
            this.$store.commit("setUser", null);
            localStorage.removeItem(userKey);
            this.$router.push({ path: "/" });
        },
    }
}
</script>

<style>

    .visivel {
        display: none;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        background: linear-gradient(to right, #1e469a, #49a7c1);
        padding: 0px 10px;
        /* border-radius: 3px;  */
        grid-area: header;
    }    

    .brand > a{
        font-size: 23px;
        color: #fff;
    }

    .brand > a:hover {
        color: #fff;
        text-decoration: none;
    }

    .brand > a:enabled {
        color: #fff;
        text-decoration: none;
    }

    .header-email{
        font-size: 19px;
    }

    .btn-logout{
        background: none;
        border: none;
        outline: none;
        color: rgb(238, 229, 229);
        font-size: 18px;
    }

    .btn-logout:hover {
        font-size: 18px;
        color: #fff;
        text-decoration: none;
    }

    .btn-logout:disabled {
        font-size: 18px;
        color: #fff;
        text-decoration: none;
    }

    .btn-logout:enabled {
        font-size: 18px;
        color: #fff;
        text-decoration: none;
    }


    .header {
        font-size: 16px;
        color: #fff;
    }

    .header:hover {
        font-size: 18px;
        color: #fff;
        text-decoration: none;
    }

    .header:disabled, .btn-logout:disabled {
        font-size: 18px;
        color: #fff;
        text-decoration: none;
    }

</style>
