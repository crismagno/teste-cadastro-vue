<template>
    <div class="auth-content">
        <div class="auth-modal">
            <h1>{{showSignUp ? 'Cadastro' : 'Login'}}</h1>
            <!-- <hr> -->
            <div class="form-group">
                <input class="form-control" v-if="showSignUp" v-model="user.name"
                    type="text" placeholder="Digite seu Nome" />
            </div>
            <div class="form-group">
                <input class="form-control" v-model="user.email"
                    type="email" placeholder="Digite seu E-mail" />
            </div>
            <div class="form-group">
                <input class="form-control" v-model="user.password"
                    type="password" placeholder="Digite sua senha" />
            </div>
            <div class="form-group">
                <input class="form-control" v-model="user.confirmPassword" v-if="showSignUp"
                    type="password" placeholder="Confirme sua senha" />
            </div>

            <div class="btn-group">
                <button class="btn btn-primary" v-if="showSignUp" @click="signUp">Registrar</button>
                <button class="btn btn-success"  @click="signIn()" v-else>
                    Entrar
                </button>
                
                <button class="btn btn-default"  @click="clear">Cancelar</button>
            </div>
            
            <hr >
            <div class="btn-cadlog">
                <a href @click.prevent="showSignUp = !showSignUp">
                    <span v-if="showSignUp">Login</span>
                    <span v-else>Cadastre-se</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios"

const URL = 'http://localhost:3005'

export default {
    name: 'login',
    data: function(){
        return {
            showSignUp: false,
            user: {},
        }
    },
    methods: {
        signIn(){
            axios.post(`${URL}/auth`, this.user)
                .then(resp => {
                        localStorage.setItem('userKey', JSON.stringify(resp.data))
                        this.$router.push({path: '/home'})
                    
                })
                .catch(e => alert(e.response.data))
        },

        signUp(){
            axios.post( `${URL}/signup`, this.user )
                .then(resp => {
                    alert(resp.data)
                    this.showSignUp = false
                    this.user = {}
                })
                .catch(e => alert(e.response.data))
            
        },

        clear(){
            this.user = {}
        }
    }
}
</script>

<style>

    .auth-content{
        margin-top: 100px;
        /* width: 500px; */
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal{
        background-color: #FFF;
        width: 350px;
        padding: 0px;
        /* margin: 50px; */
        box-shadow: 0px 1px 5px rgba(0, 0, 0, .3);
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .auth-modal > h1 {
        margin-bottom: 30px;
    }

    .auth-modal input {
        width: 300px;
    }

    .auth-modal > hr {
        height: 1px;
        width: 100%;
        background-color: rgba(0, 0, 0,.2);
        margin-top: 40px;
    }

    .btn-cadlog {
        margin-bottom: 20px;
    }

    .btn-cadlog > a {
        color: rgba(0, 0, 0,.6);
        font-size: 17px;
        font-weight: bold;
        text-decoration: none;
    }
    
    .btn-cadlog > a:hover {
        color: rgba(0, 0, 0,.9);
        text-decoration: none;
        
    }    

</style>
