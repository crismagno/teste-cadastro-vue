<template>
    <div class="">
        <Pagetitle title="Anotações" sub="Faça suas anotações" icon="fa fa-edit"/>

        <AnotacaoModal />
            
            <button class="add-nota btn btn-primary " data-toggle="modal" data-target="#myModal">
                Nova nota <i class="fa fa-plus"></i>
            </button>

        <div class="anotacoes">
            <div class="anotacao " v-for="nota in anotacoes" :key="nota._id" @click="notaVencimento(nota.vencimento)"
                :class="{ 
                    ' desabilitar ' : nota.done, 
                    ' notaDia ' : notaVencimento(nota.vencimento) === 1,
                    ' notaVencida ' : notaVencimento(nota.vencimento) === 2,
                    ' notaFutura ': notaVencimento(nota.vencimento) === 3,
                    }">
                <div class="title-nota">
                    <h4>{{nota.title}}</h4>
                    <img style="width:30px;height:20px;" v-if="notaVencimento(nota.vencimento) === 1 && !nota.done"
                        src="https://3.bp.blogspot.com/-L-2pZJfZceY/VzUSHQMU-tI/AAAAAAAAUlg/B2lXYsXhPskIBCZLTb5z0lSlLgjg2LKowCLcB/s1600/Gifs%2Banimados%2BSino%2B2.gif" >
                </div>
                <hr class="hr-nota">
                <div class="descricao-nota">
                    <p>{{nota.description}}</p>
                </div>
                <div class="vencimento" >
                    <span>Vencimento: {{dataVencimentoFormatada(nota.vencimento) }}</span>
                </div>
                <hr class="hr-nota">
                <div class="acoes">
                    <button class="btn " @click="notaLida(nota)" :class="nota.done ? 'btn-primary' : 'btn-success'">
                        <i class="fa " :class="nota.done ? 'fa-undo' : 'fa-check'"></i>
                    </button>
                    <button style="margin-left: 5px;" class="btn btn-danger" @click="deletarNota(nota)">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { showError, userKey, baseApiURL } from "../../config/global";
import Pagetitle from "../template/Pagetitle";
import AnotacaoModal from "./AnotacaoModal";
import axios from 'axios'
import { mapState } from "vuex";


export default {
    components: { Pagetitle, AnotacaoModal },
    data: function() {
        return {
            anotacoes: []
        }
    },

    methods: {
        getAnotacoes(){
            axios.get(`${baseApiURL}/api/anotacao?sort=-createdAt`)
                .then(resp => {
                    this.anotacoes = resp.data
                })
                .catch(e => showError(e))
        },

        deletarNota(nota) {
            axios.delete(`${baseApiURL}/api/anotacao/${nota._id}`)
                .then(resp => {
                    this.$toasted.global.defaultSuccess({msg: 'Anotação deletada!'})
                    this.getAnotacoes()
                })
                .catch(e => this.$toasted.global.defaultError({msg: 'Erro ao deletar Nota!'}))
        },

        notaLida(nota) {
            if (nota.done) {
                nota.done = false
            } else {
                nota.done = true
            }

            axios.put(`${baseApiURL}/api/anotacao/${nota._id}`, {...nota})
                .then(resp => {
                    if (nota.done){
                        this.$toasted.global.default({msg: 'Nota desabilitada!'})
                        
                    } else {
                        this.$toasted.global.defaultSuccess({msg: 'Nota habilitada!'})
                        
                    }
                    this.getAnotacoes()

                })
                .catch(e => this.$toasted.global.defaultError({msg: 'Error...!!!'}))
            
        },

        dataVencimentoFormatada(dataVencimento) {
            const data = new Date(dataVencimento)
            return `${data.getDate() + 1}/${data.getMonth() + 1}/${data.getFullYear()}`
        },

        notaVencimento(vencimento){
            const dataDia = new Date()
            const data = new Date(vencimento)
            const dataAtual = `${dataDia.getDate()}/${dataDia.getMonth() + 1}/${dataDia.getFullYear()}`
            const dataVencimento = `${data.getDate() + 1}/${data.getMonth() + 1}/${data.getFullYear()}`

            if (dataVencimento === dataAtual) {
                return 1 // nota do dia
            } else if (
                        dataDia.getDate() > data.getDate() + 1 ||
                        dataDia.getMonth() + 1 > data.getMonth() + 1 &&
                        dataDia.getFullYear() > data.getFullYear() 
                    ) {
                return 2 // nota venceu
            } else {
                return 3 // nota ainda vai vencer
            }
        },

        desabilitaSino(){
            const dataDia = new Date()
            const dataAtual = `${dataDia.getDate()}/${dataDia.getMonth() + 1}/${dataDia.getFullYear()}`
            
            const notasDia = this.anotacoes.filter(nota => {
                const data = new Date(nota.vencimento)
                const dataVencimento = `${data.getDate() + 1}/${data.getMonth() + 1}/${data.getFullYear()}`
                return dataVencimento === dataAtual
            }).filter(notasDiaDesabilitada => {
                return notasDiaDesabilitada.done === false
            })

            if (notasDia.length === 0) {
                this.$store.commit('showSino', false)
            } else {
               this.$store.commit('showSino', true) 
            }

        }

    },

    created(){
        this.$store.commit("setUser", JSON.parse(localStorage.getItem(userKey)));
        this.$store.commit('menuSelected', 'anotacao')
        this.getAnotacoes()
		document.title = "Anotações";
    },

    updated(){
        this.getAnotacoes()
        this.desabilitaSino()
    }

}
</script>

<style>

.info-notas {
    display: flex;
    justify-content: flex-start;
}

.info-notas div {
    margin: 10px 15px;
}

.info-notas :nth-child(1){
    color: green;
}
.info-notas :nth-child(2){
    color: blue;
}
.info-notas :nth-child(3){
    color: red;
}



.add-nota {
    position: absolute;
    top: 100px;
    right: 10px;
    /* right: 10px; */
    width: 230px;
    /* height: 50px; */
    /* margin-left:15x;  */
    font-size: 20px;
}

.anotacoes {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
}

.anotacao {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19) ;
    /* border-radius: 5px; */
    width: 220px;
    height: 250px;
    /* margin-right: 5px; */
    margin-bottom: 20px;
    padding: 0px 5px 5px 5px;
    
}

.desabilitar {
    background-color: black;
}

.notaDia {
    /* box-shadow: 1px 4px 8px 0px green; */
    border: 1px solid rgb(58, 238, 58);
}

.notaVencida {
    /* box-shadow: 1px 4px 8px 0px red; */
    border: 1px solid rgba(209, 63, 63,.7);
}

.notaFutura {
    /* box-shadow: 1px 4px 8px 0px blue; */
    border: 1px solid rgba(73, 108, 204,.7);
}

.anotacao > .title-nota {
    /* flex: 1; */
    overflow: hidden;
}

.anotacao > .descricao-nota {
    flex: 2;
    text-align: start;
    overflow-y: auto;
    
}

.anotacao > .vencimento {
    border-top: 1px solid #0003;
}

.anotacao > .acoes {
    display: flex;
    flex-direction: row;
    justify-content: flex-end; 

}   

.hr-nota {
    width: 100%;
    margin-bottom: 5px;
    margin-top: 5px;
    border: 0.5px solid #0002; 
}

/*======== scrollbar ============*/

/* width */
.anotacao > .descricao-nota::-webkit-scrollbar {
  width: 2px;
}

/* Track */
.anotacao > .descricao-nota::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgb(194, 193, 193); 
  border-radius: 0px;
}
 
/* Handle */
.anotacao > .descricao-nota::-webkit-scrollbar-thumb {
  background: rgb(106, 109, 110); 
  border-radius: 2px;
}

/* Handle on hover */
.anotacao > .descricao-notas::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}

/* .anotacao > .descricao-nota::-webkit-scrollbar-button {}; 

.anotacao > .descricao-nota::-webkit-scrollbar-track-piece {};

.anotacao > .descricao-nota::-webkit-scrollbar-corner {};  
     
.anotacao > .descricao-nota::-webkit-resizer {};  */


/* ===================== MEDIA QUERIES ======================= */


/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .anotacao {
        width: 47%;
    }
} 

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .anotacao {
        width: 47%;
    }
} 

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .anotacao {
        width: 35%;
    }
} 

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .anotacao {
        width: 30%;
        /* height: 330px; */
    }
} 

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .anotacao {
        width: 19%;
    }
}

</style>

