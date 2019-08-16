<template>

    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content modal-md">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h3>Deletar Usuário</h3>
                </div>

                <div class="modal-body" >
                    <h4>Nome: </h4> <strong>{{user.name}}</strong>
                    <br>
                    <h4>Email: </h4> <strong>{{user.email}}</strong>
                </div>

                <div class="modal-footer">
                    <div class="btn-group">
                        <button style="margin:2px" class="btn btn-danger" @click="deletar()"
                            data-dismiss="modal">Deletar Usuário</button>
                        <button style="margin:2px" class="btn" 
                            data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { showError, userKey, baseApiURL } from '../../config/global';
import axios from "axios";

export default {
    props: {
        user: {},
    },

    methods: {
        deletar(){
            axios.delete(`${baseApiURL}/api/users/${this.user.id}`)
                .then(res => {
                    this.$toasted.global.defaultSuccess({msg: `${this.user.name} foi excluído!!!!`})
                    localStorage.removeItem(userKey)
                    this.$router.push({path: '/'})
                })
                .catch(e => showError(e))
        }
    }
}
</script>

<style>

</style>
