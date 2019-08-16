<template>
    <div class="status-venda">
        
        <PageTitle title="Sumário de Vendas" sub="Todas as Vendas" icon="fa fa-industry"/>
        <StatusModal :vendas="vendas" :title="title" :description="description"/>
        
        <a class="apagar btn "  
            @click="showVendas = showVendas ? false : true" :title="showVendas ? 'ocultar vendas' : 'visualizar vendas'">
            <i :class="showVendas ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </a>

        <div class="col-xs-12" v-if="showVendas">
            
            <div class="totais  col-xs-12 col-sm-6"  >
                <a class="venda-total btn" @click="inserirVendasModal('dia')" :class=" vendaPorDia === '0,00' ? 'btn-danger' : 'btn-info'"
                    data-toggle="modal" data-target="#myModalStatus">
                    Valor Dia: R$ {{vendaPorDia}}
                </a>
                <a  class="venda-total  btn btn-success" @click="inserirVendasModal('mes')" :class=" vendaPorMes === '0,00' ? 'btn-danger' : 'btn-success'"
                    data-toggle="modal" data-target="#myModalStatus">
                    Valor Mês: R$ {{vendaPorMes}}
                </a>
                <a class="venda-total  btn btn-warning " @click="inserirVendasModal('ano')" :class=" vendaPorAno === '0,00' ? 'btn-danger' : 'btn-warning'"
                    data-toggle="modal" data-target="#myModalStatus">
                    Valor Ano: R$ {{vendaPorAno}}
                </a>
                <a class="venda-total  btn btn-dark " @click="inserirVendasModal('todas')"
                    data-toggle="modal" data-target="#myModalStatus">
                    Valor Total: R$ {{vendaTotal}}
                </a>
                <a class="venda-total  btn btn-primary "  @click="inserirVendasModal('vendas-sugeridas')" 
                    :class=" vendasDeAte === '0,00' ? 'btn-danger' : 'btn-primary'"
                    data-toggle="modal" data-target="#myModalStatus">
                    Total Sugerido: R$ {{vendasDeAte}}
                </a>
            </div>
            <div class=" total-sugerido col-xs-12 col-sm-6 bg-success"  >
                <div class="form" >
                    <div class="form-group col-xs-6">
                        <label for="dia">Dia</label>
                        <input type="number" class="form-control" v-model="dia"
                            id="dia" name="dia" min="1" max="31">
                    </div>
                    <div class="form-group col-xs-6">
                        <label for="mes">Mês</label>
                        <input type="number" class="form-control" v-model="mes"
                            id="mes" name="mes" min="1" max="12">
                    </div>
                    <div class="form-group col-xs-12">
                        <label for="ano">Ano</label>
                        <input type="number" class="form-control" v-model="ano"
                            id="ano" name="ano" min="1" max="3000">
                    </div>
                    <!-- <hr> -->
                    <div class="form-group col-xs-12">
                        <label for="de" >De</label>
                        <input type="date" id="de" class="form-control" v-model="dataDe">

                        <label for="ate">Até</label>
                        <input type="date" id="ate" class="form-control " v-model="dataAte">
                    </div>  
                    
                </div>
                
            </div>
            <hr class="hr-status-venda"> 
        </div>

        <div class="search col-xs-12">
            <div class="col-xs-8 ">
                <div class="form-group">
                    <input type="text" class="form-control" @keyup.enter="getStatusVenda"
                        placeholder="Pesquise por código..." v-model="statusVenda" >
                </div>
            </div>

            <div class="col-xs-4  ">
                <button class="btn btn-info" @click="getStatusVenda" title="pesquisar ">
                    <i class="fa fa-search" ></i>
                </button>
                <button style="margin-left: 5px;" class="btn btn-dark" @click="clearSearch" title="limpar pesquisa">
                    <i class="fa fa-close"></i>
                </button>
            </div>
        
        </div>
            
        <div class="listar-vendas ">
            <table class="table "> 
                <thead >
                    <th>Código</th>
                    <th>Nome</th>
                    <!-- <th>Slug</th> -->
                    <th>Preço</th>
                    <!-- <th>Desconto</th> -->
                    <th>Qtd</th>
                    <th>Venda</th>
                    <th>Data</th>
                </thead>
                <tbody >
                    <tr v-for="(status) in listaStatusVenda" :key="status._id" >
                        <td>{{ status.cod }}</td>
                        <td>{{ status.name }}</td>
                        <td >
                            R$ {{ status.preco.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.') }} 
                            <span style="color:red" v-if="status.desconto">- {{status.desconto}}%</span>
                        </td>
                        <!-- <td>{{status.desconto}}%</td> -->
                        <td>{{ status.quantity }}</td>
                        <td v-money="'R$'">{{ status.valorVenda }}</td>
                        <td>
                            {{ new Date(status.createdAt).toLocaleDateString('pt-BR') }}
                            <br/>
                            {{ new Date(status.createdAt).toLocaleTimeString() }}  
                        </td>

                        <!-- <td>
                            <button class="btn btn-danger" @click="deletar(status)" >
                                <i class="fa fa-trash-o"></i>
                            </button>
                        </td> -->
                    </tr>
                </tbody>
                
            </table>
        </div>            
        
    </div>
</template>

<script>
import axios from "axios";
import { baseApiURL, userKey } from '../../config/global'
import Vue from 'vue'

import PageTitle from "../template/Pagetitle";
import StatusModal from "./StatusModal";

Vue.directive('money', {
    inserted(el, binding){
        const amount =parseFloat(el.innerHTML).toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
        el.innerHTML = `${binding.value} ${amount}`
    }
})
export default {

    components: { PageTitle, StatusModal },

    data: function(){
        return {
            listaStatusVenda: [],
            statusVenda: '',
            dia: new Date().getDate(),
            mes: new Date().getMonth() + 1,
            ano: new Date().getFullYear(),
            vendas: {},
            vendasDia: {},
            vendasMes: {},
            vendasAno: {},
            vendasSugeridas: {},
            title: '',
            description: '',
            showVendas: true,
            dataDe: null,
            dataAte: null,
        }
    },

    computed: {
        vendaTotal(){
            return this.listaStatusVenda.reduce((total, status) => {
                
                return total += status.valorVenda
            }, 0).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
        },

        vendaPorDia(){
            const vendaDia = this.listaStatusVenda.filter(status => {
                const data = new Date(status.createdAt)
                const dataDia = data.getDate()
                const dataMes = data.getMonth()
                const dataAno = data.getFullYear()
                return dataDia === +this.dia  && dataMes === this.mes - 1 && dataAno === +this.ano 
            })

            this.vendasDia = vendaDia

            return vendaDia.reduce((total, status) => {
                return total += status.valorVenda
            }, 0).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
            
        },

        vendaPorMes(){
            const vendaMes = this.listaStatusVenda.filter(status => {
                const data = new Date(status.createdAt)
                const dataMes = data.getMonth()
                const dataAno = data.getFullYear()
                return dataMes === this.mes - 1 && dataAno === +this.ano 
            })
            this.vendasMes = vendaMes

            return vendaMes.reduce((total, status) => {
                return total += status.valorVenda
            }, 0).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
        },

        vendaPorAno(){
            const vendaAno = this.listaStatusVenda.filter(status => {
                const dataAno = new Date(status.createdAt).getFullYear()
                return dataAno === +this.ano 
            })
            this.vendasAno = vendaAno

            return vendaAno.reduce((total, status) => {
                return total += status.valorVenda
            }, 0).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
        },

        vendasDeAte(){
            
            const novaDataDe = new Date(this.dataDe)
            const novaDataAte = new Date(this.dataAte)

            const totalSugeridoFiltrado = this.listaStatusVenda.filter(status => {
                const dataStatus = new Date(status.createdAt)

                return (dataStatus >= novaDataDe && dataStatus <=novaDataAte) 
                
            })

            this.vendasSugeridas = totalSugeridoFiltrado

            const valorTotalStatusSugerido = totalSugeridoFiltrado.reduce((total,ts) => {
                return total += ts.valorVenda
            }, 0).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')

            return valorTotalStatusSugerido
        },


    },

    watch: {
        
    },

    methods: {

        //=========================
        getStatusVenda(){ 
            
            const search = this.statusVenda ? `&cod__regex=/${this.statusVenda}/` : '' 
            axios.get(`${baseApiURL}/api/status-venda?sort=-createdAt${search}`)
                .then(resp => {
                    this.listaStatusVenda = resp.data
                })
        },

        deletar(status) {
            axios.delete(`${baseApiURL}/api/status-venda/${status._id}`)
                .then(resp => {
                    this.getStatusVenda()
                    this.$toasted.global.defaultSuccess({msg: `venda de código: ${status.cod} deletada!`})
                })
        },

        inserirVendasModal(dma){
            if (dma === 'dia') {
                this.vendas = this.vendasDia
                this.title = "Dia"
                this.description = "Vendas do dia"
            } 
            if (dma === 'mes') {
                this.vendas = this.vendasMes
                this.title = "Mês"
                this.description = "Vendas do Mês"
            } 
            if (dma === 'ano') {
                this.vendas = this.vendasAno
                this.title = "Ano"
                this.description = "Vendas do ano"
            }
            if (dma === 'todas') {
                this.vendas = this.listaStatusVenda
                this.title = "Todas"
                this.description = "Todas as vendas"
            }

            if(dma === 'vendas-sugeridas') {
                this.vendas = this.vendasSugeridas
                this.title = "Vendas Sugeridas"
                this.description = "Todas as vendas sugeridas"
            }
        },

        clearSearch(){
            this.statusVenda = ''
            this.getStatusVenda()
        },

    },

    created(){
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getStatusVenda()
        this.$store.commit('menuSelected', 'sumario_venda')
        document.title = 'Sumário de Vendas'
    }
}

</script>

<style>

.apagar {
    position: absolute;
    right: 30px;
    top: 110px;
    /* float: right; */
    color: #fff;
    background-color: #000;
    border-color: #0008;
}
.apagar:hover {
    color: #fff;
    background-color: #0008;
    border-color: #000;
}

.venda-total {
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 100%; */
    height: 50px;
    border: 1px solid rgb(194, 193, 193);
    border-radius: 5px;
    /* background-color: #3282cd; */
    font-size: 17px;
    /* color: #fff; */
    margin: 10px 0px;
    font-size: 20px;
}


.total-sugerido {
    /* width: 300px; */
    height: 290px;
    border: 1px solid #0001;
    border-radius: 5px;
    margin: 10px 0px 10px 0px;
    padding: 10px;
}

.listar-vendas{
    height: 500px;
    overflow-x: hidden;
    border: 1px solid #0001;
    padding: 10px 5px;
    margin: 10px 0px;
    border-radius: 5px;
}

hr.hr-status-venda{ 
        display: block;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        border-style: ridge;
        border-width: 0.8px;
    }

</style>
