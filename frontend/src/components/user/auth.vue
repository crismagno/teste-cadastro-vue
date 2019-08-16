<template>
    <div class="auth-content">
        <div class="auth-modal">
            <div class="row">
                <div class="col-xs-12">
                    <h1 style="text-align:center" >{{showSignUp ? 'Cadastro' : 'Login'}}</h1>
                </div>
                <!-- <hr> -->
                <div class="form-group col-xs-12">
                    <input class="form-control" v-if="showSignUp" v-model="user.name" @keyup.enter="showSignUp ? signUp() : ''"
                        type="text" name="nome" placeholder="Digite seu Nome" />
                </div>
                <div class="form-group col-xs-12">
                    <input class="form-control" v-model="user.email" @keyup.enter="showSignUp ? signUp() : signIn()"
                        type="email" name="email" placeholder="Digite seu E-mail" />
                </div>
                <div class="form-group col-xs-12">
                    <input style="width: 90%; display:inline;" class="form-control" v-model="user.password" @keyup.enter="showSignUp ? signUp() : signIn()"
                        :type="show ? 'password' : 'text'" name="password" placeholder="Digite sua senha" />

                    <a style="width:10%" class="btn btn-link" @click="showPassword()">
                        <i :class="show ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                    </a> 
                </div>
                <div class="form-group col-xs-12" v-if="showSignUp" :style="showSignUp ? 'margin-bottom: 15px' : 'margin-bottom: 0px'">
                    <input style="width: 90%; display:inline;" class="form-control" v-model="user.confirmPassword"  @keyup.enter="showSignUp ? signUp() : ''"
                        :type="show2 ? 'password' : 'text'" name="confirmPassword" placeholder="Confirme sua senha" />

                    <a style="width:10%" class="btn btn-link" @click="showPassword2()">
                        <i :class="show2 ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                    </a> 
                </div>
            </div>

            <div class="">
                <div style="display: inline" class="newSenha" v-if="!showSignUp">
                    <a style="font-size: 13px" href>Esqueceu Senha?</a>
                </div>
                
                <div style="float:right" class="btn-group " >
                    <button class="btn " :class="showSignUp ? 'btn-primary' : 'btn-success'"
                        @click="showSignUp ? signUp() : signIn()">
                        {{showSignUp ? 'Registrar' : 'Entrar'}}
                    </button>
                    <button style="margin-left: 5px" class="btn btn-default"  @click="clear">Cancelar</button>
                </div>
            </div>
            
            <div class="col-xs-12 btn-login-cad" style="margin-top: 20px;">
                <hr >
                <div class="btn-cadlog" style="text-align:center">
                    <a href @click.prevent="showSignUp = !showSignUp">
                        <span >{{showSignUp ? 'Login' : 'Cadastre-se'}}</span>
                        <!-- <span v-else>Cadastre-se</span> -->
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios"
import { mapState } from "vuex";
import { showError, baseApiURL, userKey } from "../../config/global";


export default {
    name: 'login',
    data: function(){
        return {
            showSignUp: false,
            user: {},
            show: true,
            show2: true
        }
    },
    computed: mapState(["visible"]),
    methods: {

        signIn(){
            axios.post(`${baseApiURL}/signin`, this.user)
                .then(resp => {
                    localStorage.setItem(userKey, JSON.stringify(resp.data))
                    this.$toasted.global.defaultSuccess({msg: `Acesso permitido a ${resp.data.name}!`})
                    this.$store.commit('setUser', resp.data)
                    this.$router.push({path: '/dashboard'})
                    this.$store.commit('show', true)
                })
                .catch(e => showError(e.response.data)) 
        },

        signUp(){
            axios.post( `${baseApiURL}/signup`, this.user )
                .then(resp => {
                    this.$toasted.global.defaultSuccess({msg: resp.data})
                    this.showSignUp = false
                    this.user = {}
                })
                .catch(e => showError(e.response.data))
        },

        clear(){
            this.user = {}
        },
        
        showPassword(){
            this.show = this.show ? false : true
        },

        showPassword2(){
            this.show2 = this.show2 ? false : true
        }
    }, 
    created(){
        localStorage.removeItem(userKey)
        this.$store.commit('setUser', null)
        this.$store.commit('show', false)
        document.title = 'Auth'
    }
}
</script>

<style>

    .auth-content{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal{
        background-color: #FFF;
        width: 320px;
        padding: 10px;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, .3);
        border-radius: 2px;

        /* display: flex;
        flex-direction: column;
        align-items: center; */
        /* justify-content: center; */
    }

    .btn-login-cad > hr {
        height: 1px;
        width: 100%;
        background-color: rgba(0, 0, 0,.2);
        margin-top: 40px;
    }

    .btn-cadlog {
        margin-bottom: 10px;
    }

    .btn-cadlog > a {
        color: rgba(0, 0, 0,.5);
        font-size: 17px;
        font-weight: bold;
        text-decoration: none;
    }
    
    .btn-cadlog > a:hover {
        color: rgba(0, 0, 0,.9);
        text-decoration: none;
        
    }    

</style>
