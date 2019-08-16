<template>
    <!-- Modal -->
    <div id="myModalStatus" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" :class="corTitle">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h3 class="modal-title">{{title}}</h3>
                    <strong>Descrição: </strong><span>{{description}}</span>
                </div>

                <div class="modal-body" >
                    <div class="table-vendas">
                        <table class="table">
                            <thead>
                                <th>cod</th>
                                <th>Name</th>
                                <th>Venda</th>
                                <th>Data</th>
                            </thead>
                            <tbody>
                                <tr v-for="v in vendas" :key="v._id">
                                    <td>{{v.cod}}</td>
                                    <td>{{v.name}}</td>
                                    <td>R${{v.valorVenda.toFixed(2)
                                            .replace('.', ',')
                                            .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}}</td>
                                    <td>
                                        {{ new Date(v.createdAt).toLocaleDateString() }}
                                        <br/>
                                        {{ new Date(v.createdAt).toLocaleTimeString() }}  
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>

                <div class="modal-footer" :class="corTitle">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        vendas: {},
        title: String,
        description: String
    },

    computed: {
        corTitle(){
            if (this.title === 'Dia') return 'bg-info'
            if (this.title === 'Mês') return 'bg-success'
            if (this.title === 'Ano') return 'bg-warning'
            if (this.title === 'Todas') return 'bg-default'
            if (this.title === 'Vendas Sugeridas') return 'bg-primary'
        }
    }
}
</script>

<style>

.table-vendas {
    max-height: 300px;
    overflow-x: hidden;
}
</style>
