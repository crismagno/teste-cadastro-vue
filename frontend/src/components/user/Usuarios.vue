<template>
    <div class="conteudo">   

        <Pagetitle title="Usuários"   
            sub="Busca de usuários" icon="fa fa-users" />

        <!-- <h4>Pesquise: </h4> -->
        <div class="search">
          <div class="col-xs-8 col-sm-8 col-md-8 ">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Pesquise..." v-model="nome">
            </div>
          </div>

          <div class="col-xs-4 col-sm-4 col-md-4 ">
            <button class="btn btn-info" @click="getUsers">
              <i class="fa fa-search"></i>
            </button>
            <button style="margin-left: 5px;" class="btn btn-dark" @click="clear">
              <i class="fa fa-close"></i>
            </button>
          </div>

        </div>

        <div class="div-update col-xs-12" v-if="visibleUpdate">
          
          <hr>
          <div class="form-group col-xs-5">
            Nome
            <input type="text" class="form-control" v-model="userUpdate.name">
          </div>
          <div class="form-group col-xs-5">
            Email
            <input type="text" class="form-control" v-model="userUpdate.email">
          </div>
          <div class="form-group col-xs-2" >
            <br>
            <input type="button" class="btn btn-success" value="atualizar" @click="update">
          </div>
        </div>

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
                  <button @click="selectUpdate(user)" class="btn btn-warning">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button style="margin-left: 5px;" @click="deletar(user._id)" class="btn btn-danger">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { showError, userKey, baseApiURL } from "../../config/global";
import Pagetitle from "../template/Pagetitle";

export default {
    
    data: function() {
        return {
        nome: '',
        users: [],
        userUpdate: null,
        visibleUpdate: false
        };
    },
    components: { Pagetitle },
    computed: mapState(["user"]),
    methods: {

        clear(){
          this.nome = ''
          this.getUsers()
        },

        async getUsers() {
          const search = this.nome ? `&name__regex=/${this.nome}/` : '' 
              await axios
                .get(`${baseApiURL}/api/users?sort=-createdAt${search}`)
                .then(res => {
                  this.users = res.data
                  
                  })
                .catch(e => {
                  showError(e.response.data)
                  // this.getUsers()
                  });

        },

        deletar(id) {
          axios
            .delete(`${baseApiURL}/api/users/${id}`)
              .then(resp => this.getUsers());
            this.userUpdate = {};
            this.visibleUpdate = false;
        },

        selectUpdate(user) {
          this.userUpdate = { ...user };
          this.visibleUpdate = true;
        },

        update() {
          axios
            .put(`${baseApiURL}/api/users/${this.userUpdate._id}`, this.userUpdate)
            .then(resp => {
            this.getUsers();
            this.userUpdate = {};
            this.visibleUpdate = false;
              });
        },

        sair() {
          this.$store.commit("setUser", null);
          localStorage.removeItem(userKey);
          this.$router.push({ path: "/" });
        }
    },

    created() {
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getUsers();    
        document.title = 'Usuários'
    }
}
</script>

<style>

/*======configurações da tabela=======*/
.div-table {
  height: 200px;
  /* background-color: aqua;  */
  overflow-x: hidden;
  margin: 0px 0px 10px 10px;
  border: 1px solid #0001;
   border-radius: 5px;
}

.table {
  margin: 0px;
}

hr{
  margin: 10px 0px;
}

</style>
