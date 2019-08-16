<template>
    
    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h3 class="modal-title">{{produto.name}}</h3>
                    <strong>Descrição: </strong><span>{{produto.description}}</span>
                </div>

                <div class="modal-body">
                    <h4 >Código: </h4><strong>{{produto.cod}}</strong>
                    <br>
                    <h4 >Preço: </h4><strong ><span >R$ {{(produto.preco === undefined ? 0 : produto.preco).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}}</span></strong>
                    <span style="color: red" v-if="produto.desconto"> - {{produto.desconto}}%</span>
                    <br>
                    <h4>Quantidade que tem: </h4><strong>{{produto.quantity - quantidade}}</strong>
                    <br>
                    
                    <div class="">
                        <h4>Quantidade a vender: </h4>
                        <input v-model="quantidade" style="width: 90px; display: inline-block"
                            class="form-control" type="number" min="0" :max="produto.quantity">
                    </div>
                    <h4>Descrição da venda:</h4>
                    <textarea class="form-control" v-model="description_venda" style="width: 47.5%;"
                         cols="5" rows="4" maxlength="200" placeholder="Dê uma descrição da venda..."></textarea>

                    <div class="calculo">
                        <span>Calculo</span>
                        <br>
                        <span > {{produto.preco}}</span>
                        <br>
                        <span >x  {{quantidade}}</span>
                        <hr class="hr-modal">
                        <div class="resultado" :style="quantidade > 0 ? 'color: green' : 'color: red'">
                            R$: {{((produto.preco - (produto.preco * this.produto.desconto / 100)) * quantidade).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}}
                        </div>
                    </div>
                    
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal" 
                        @click="efetuarVenda()">Concluir Venda</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import axios from "axios";
import { baseApiURL, userKey } from '../../config/global'

export default {
    props: {
        produto: {},
    },

    data: function(){
        return {
            quantidade: 0,
            statusVenda: {},
            description_venda: '' 
        }
    },

    methods: {

        efetuarVenda(){
            if (this.quantidade > 0) {
                this.produto.quantity = this.produto.quantity - this.quantidade
                axios.put(`${baseApiURL}/api/products/${this.produto._id}`, this.produto)
                    .then(resp => {
                        this.$router.push({path: '/status_venda'})
                        this.$toasted.global.defaultSuccess({msg: 'venda concluída com sucesso!'})
                    })

                this.statusVenda = {
                    name: this.produto.name,
                    preco: this.produto.preco,
                    desconto: this.produto.desconto,
                    cod: this.produto.cod,
                    quantity: this.quantidade,
                    valorVenda: (this.produto.preco - (this.produto.preco * this.produto.desconto / 100)) * this.quantidade,
                    description: this.description_venda
                }
                
                axios.post(`${baseApiURL}/api/status-venda`, this.statusVenda)
                    
            } else {
                this.$toasted.global.defaultError({msg: 'Não foi possivel concluir a venda.'})
            }
        }
    },


}
</script>

<style>
    h4 {
        display: inline-block; 
        margin-right: 5px;

    }

    .calculo {
        position: absolute;
        width: 150px;
        height: 100px;
        /* border: 1px solid rgb(216, 215, 215); */
        border-radius: 5px;
        top: 5px;
        right: 30px;
        text-align: center;
        
    }

    .calculo span {
        font-size: 15px; 
        font-weight: bold;
    }

    hr.hr-modal{ 
        display: block;
        margin-top: 2px;
        margin-bottom: 0px;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        border-style: inset;
        border-width: 1px;
    }


</style>
