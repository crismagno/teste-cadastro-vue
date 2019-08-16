<template>
	<div class="conteudo">
		<Pagetitle title="Usuário" sub="Dados do Usuário" icon="fa fa-user"/>
		<UserModal :user="this.user" />

		<div class="form dados-usuario ">
			<div class="form-group">
				<label for="nome">Nome</label>
				<input type="text" class="form-control " id="nome" @keyup.enter="readonly === false ? confirmarAlteracao() : null"
					v-model="user.name" :readonly="readonly" >
			</div>
			<div class="form-group">
				<label for="email">E-mail</label>
				<input type="text" class="form-control " id="email" @keyup.enter="readonly === false ? confirmarAlteracao() : null"
					v-model="user.email" :readonly="readonly">
			</div>
			<div class="form-group">
				<label for="senha">Password</label>
				<input type="password" class="form-control " id="senha" 
					v-model="user.password" readonly>
			</div>
			<!-- <div class="form-group">
				<label for="password">password</label>
				<input :type="show ? 'password' : 'text'" class="form-control " id="password"
					v-model="pass" >
				<button @click="showPassword()">show</button>
			</div> -->
			<div style="float: right" class="acoes" >
				<div class="btn-group">
					<button class="btn " :class="readonly ? 'btn-primary' : 'btn-success'"
						@click="readonly ? alterarDados() : confirmarAlteracao()" >
						<i class="fa fa-pencil" v-if="readonly"></i>
						<i class="fa fa-check" v-if="!readonly"></i>
					</button>

					<button class="btn btn-danger"
						data-toggle="modal" data-target="#myModal">
						<i class="fa fa-trash-o"></i>	
					</button>
				</div>
				<button style="margin:4px" class="btn" @click="cancel()">Cancelar</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { showError, userKey, baseApiURL } from "../../config/global";
import Pagetitle from "../template/Pagetitle";
import UserModal from "./UserModal";

export default {
	data: function() {
		return {
			readonly: true,
			show: true,
			pass: ''
		}
	},
	components: { Pagetitle, UserModal },
	computed: mapState(["user"]),

	methods: {
		alterarDados(){
			this.readonly = false
		},

		confirmarAlteracao(){
			axios.put(`${baseApiURL}/api/users/${this.user.id}`, this.user)
				.then(resp => {
					localStorage.setItem(userKey, JSON.stringify(this.user))
					this.$toasted.global.defaultSuccess({msg: 'Usuário Atualizado!'})
					this.readonly = true
				})
				.catch(e => {
					const errors = e.response.data.errors
                    for (let i = errors.length-1; i >= 0 ; i--) {
                        this.$toasted.global.defaultError({msg: errors[i]});
                    }
				})
		},

		cancel(){
			this.readonly = true
		},

		showPassword(){
			this.show = this.show ? false : true
		}
	},

	created() {
		this.$store.commit("setUser", JSON.parse(localStorage.getItem(userKey)));
		this.$store.commit('menuSelected', 'usuario')
		document.title = "Usuário";
	}
};
</script>

<style>

.dados-usuario {
	width: 50%;
	margin:  auto;
}

</style>
