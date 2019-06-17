<template>
    <div class="container home">
        <button style="margin-top: 5px;" class="btn tbn-default" @click="sair">sair</button>
        <h1 >Usuários</h1>
        <hr>
        <div class="div-table col-xs-12">
            <table class="table" >
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody v-for="(user, i) in users">
                    <tr :key="user._id">
                        <td>{{i+1}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>
                            <button @click="deletar(user._id)" class="btn btn-danger ">
                                <i class="fa fa-trash-o"></i>
                            </button>
                            <button style="margin-left: 5px;" @click="selectUpdate(user)" 
                                class="btn btn-warning ">
                                    <i class="fa fa-pencil"></i>
                                </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="div-update col-12"  v-if="visibleUpdate">
            <h2>Atualizar</h2>
            <hr>
            <div class="form-group col-md-4">
                Nome
                <input type="text" class="form-control" v-model="user.name">
            </div>
            <div class="form-group col-md-4">
                Email
                <input type="text" class="form-control" v-model="user.email">
            </div>
            <div class="form-group col-xs-12 col-md-4">
                <br>
                <input class="btn btn-success" value="atualizar" @click="update"/>
            </div>
            
        </div>
    </div>
</template>

<script>

import axios from "axios";

const URL = 'http://localhost:3005/api'

export default {
    data: function(){
        return {
            users: [],
            user: {},
            visibleUpdate: false
        }
    },
    methods: {
        getUsers(){
            axios.get(`${URL}/users`)
                .then(res => this.users = res.data)
        }, 

        deletar(id){
            axios.delete(`${URL}/users/${id}`)
                .then(resp => this.getUsers())
            this.user = {}
            this.visibleUpdate = false
        },

        selectUpdate(user){
            this.user = {...user} 
            this.visibleUpdate = true
        },

        update(){
            axios.put(`${URL}/users/${this.user._id}`, this.user)
                .then(resp => this.getUsers())
            this.user = {}
        },

        sair(){
            this.$router.push({path: '/'})
        }
    },

    mounted: function() {
        this.getUsers()
    }
}

</script>

<style>
    .div-table{
        height: 200px;
        /* background-color: aqua; */
        overflow-x: hidden;
        margin-bottom: 30px;
        border: 1px solid #0002;
        border-radius: 5px;
    }

    .table{
        margin: 5px 20px 5px 10px;
    }

</style>
