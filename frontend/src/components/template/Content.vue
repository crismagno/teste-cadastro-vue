<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { userKey, baseApiURL } from "../../config/global";

export default {

    methods: {
        async validateToken() {
            this.validatingToken = true;

            const json = localStorage.getItem(userKey);
            const userData = JSON.parse(json);
            this.$store.commit("setUser", null);

            if (!userData) {
                this.validatingToken = false;
                this.$router.push({ name: "auth" });
                return;
            }

            const res = await axios.post(`${baseApiURL}/validateToken`, userData);

            if (res.data) {
                this.$store.commit("setUser", userData);
            } else {
                localStorage.removeItem(userKey);
                this.$router.push({ name: "auth" });
            }

            this.validatingToken = false;
        },

        getAnotacoes(){
            axios.get(`${baseApiURL}/api/anotacao?sort=-createdAt`)
                .then(resp => {
                    const dataAtual = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
                    const notaVencimento = resp.data.filter(nota => {
                        const vencimento = new Date(nota.vencimento)
                        const vencimentoFormatado = `${vencimento.getDate() + 1}/${vencimento.getMonth() + 1}/${vencimento.getFullYear()}`     
                        return vencimentoFormatado === dataAtual && nota.done === false
                    })
                    // console.log(notaVencimento)
                    const sinoAlerta = notaVencimento.length === 0 ? false : true
                    this.$store.commit("showSino", sinoAlerta);
                })
                .catch(e => showError(e))   
        },

        

    },

    created() {
        this.validateToken();  
        this.$store.commit('setUser', JSON.parse(localStorage.getItem(userKey)))
        this.getAnotacoes()   
    },
}
</script>

<style>

    .content {
        grid-area: content;
        padding: 15px;
        /* width:100%; */
    }

</style>
