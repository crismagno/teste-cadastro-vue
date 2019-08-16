<template>
    <header class="header" v-if="visivel"> 
        <div class="brand">
            <a href @click.prevent="hideMenu()">
                <!-- iPet -->
                <i class="fa fa-bars"></i>
            </a>

            <router-link to="/anotacao" class="sino" v-if="sinoAlerta" >
                <img src="https://3.bp.blogspot.com/-L-2pZJfZceY/VzUSHQMU-tI/AAAAAAAAUlg/B2lXYsXhPskIBCZLTb5z0lSlLgjg2LKowCLcB/s1600/Gifs%2Banimados%2BSino%2B2.gif" />
                <span style="font-size: 15px;">Anotações do dia</span>
                
            </router-link>
            <!-- <button @click="tocar()">click</button> -->
        </div>

        <span class=" header-email">iPet</span>

        <a href class="btn-logout" @click.prevent="sair()">
            Sair <i class="fa fa-sign-out"></i>
        </a>

    </header>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { showError, userKey, baseApiURL } from "../../config/global";


// var myTrack = new Audio('./musica.mp3')
export default {
    props: {
        title: String,
        visivel: Boolean
    },

    data: function(){
        return {
            tocarAlerta: false
        }
    },

    computed: mapState(['menuVisible', 'sinoAlerta']),

    methods: {
        // tocar() {
        //     if (this.tocarAlerta === false) {
        //         myTrack.play()
        //         this.tocarAlerta = true
        //     } else {
        //         myTrack.pause()
        //         // myTrack.currentTime = 3
        //         this.tocarAlerta = false
        //     }
        // },

        hideMenu(){
            const hide = this.menuVisible ? false : true
            this.$store.commit("showMenu", hide);
        },

        sair() {
            this.$store.commit("setUser", null);
            localStorage.removeItem(userKey);
            this.$router.push({ path: "/" });
        },

        
    },

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
        height: 45px;
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

    .sino {
        /* position: absolute; */
        margin-left: 20px;
        
    }

    .sino > img {
        width: 70px;
        height: 40px;
    }

</style>
