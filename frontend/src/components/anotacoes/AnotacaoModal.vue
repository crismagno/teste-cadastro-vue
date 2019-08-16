<template>

    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content modal-md">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h2>Nova Anotação
                        <span class="fa fa-pencil"></span>
                    </h2>
                    <h4>Crie sua anotação:</h4>
                </div>

                <div class="modal-body" >
                    <form class="form">
                        <div class="form-group">
                            <label for="name">Nome da Anotação</label>
                            <input type="text" class="form-control" maxlength="20" v-model="anotacao.title" 
                                id="name" autofocus >
                        </div>
                        <div class="form-group">
                            <label for="descricao">Descreva sua Anotação</label>
                            <textarea type="text" class="form-control" v-model="anotacao.description" 
                                 cols="5" rows="5" id="descricao" />
                        </div>
                        <div class="form-group">
                            <label for="vencimento">Vencimento</label>
                            <input type="date" class="form-control" v-model="anotacao.vencimento" 
                                id="vencimento" >
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <div class="btn-group">
                        <button style="margin:2px" class="btn btn-primary" @click="postarAnotacao()"
                            data-dismiss="modal">
                            Anotar <i class="fa fa-plus"></i>
                        </button>
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

    data: function() {
        return {
            anotacao: {}
        }
    },

    methods: {


        postarAnotacao(){
            axios.post(`${baseApiURL}/api/anotacao`, this.anotacao)
                .then(resp => {
                    this.$toasted.global.defaultSuccess({msg: 'Anotação concluída!'})
                })
                .catch(e => {
                    const errors = e.response.data.errors
                        for (let i = errors.length-1; i >= 0 ; i--) {
                            this.$toasted.global.defaultError({msg: errors[i]});
                        }
                })
        }
    }
}
</script>

<style>

</style>
