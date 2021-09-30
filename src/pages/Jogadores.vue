<template>
  <div class="container">
    <h1>id que vem do jogador novo {{this.jogador.id}}</h1>
    <h1>id que vem da rota {{this.time_id}}</h1>
    <small>id nome que vem do state filtrado {{this.time_jogadores}}</small>
    <table class="table table-striped table-sm" >
      <thead>
      <tr>
        <th class="col text-center">Nome</th>
        <th class="col text-center">Posição</th>
        <th class="col text-center">Camisa</th>
        <th class="col text-center">Salário</th>
        <th class="col text-center">Info</th>
        <th class="col text-center" colspan="2">Opções</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(jogador, index) in time_jogadores" :key="jogador.id">
        <td class="col">{{ jogador.nome }}</td>
        <td class="col">{{ jogador.posicao }}</td>
        <td class="col">{{ jogador.camisa }}</td>
        <td class="col">{{ jogador.salario }}</td>
        <td class="col">{{ jogador.info }}</td>
        <td class="col">
          <button class="btn btn-primary" @click="editar(jogador)">Editar</button>
        </td>
        <td class="col">
          <button class="btn btn-primary" disabled v-if="carregando">Carregando</button>
          <button class="btn btn-danger" v-else @click="apagar(jogador, index)">Apagar</button>
        </td>
      </tr>
      </tbody>
    </table>
    <!--  <TabelaMarota :lista="jogadores"></TabelaMarota>-->
  </div>

  <div class="container">
    <Campo tipo="text" nome="Nome" v-model="jogador.nome"></Campo>
    <CampoSeletor nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoSeletor>
    <Campo tipo="number" nome="Camisa" v-model="jogador.camisa"></Campo>
    <Campo tipo="number" nome="Salario" v-model="jogador.salario"></Campo>
    <CampoTexto tipo="text" nome="Info" v-model="jogador.info"></CampoTexto>
    <button v-if="carregando" class="btn btn-lg btn-success" disabled>Carregando</button>
    <button class="btn btn-lg btn-success" v-else @click="salvar">Salvar</button>
  </div>

</template>


<script>
import {mapMutations, mapState} from 'vuex'

import axios from "axios";
import Campo from "../components/Campo.vue";
import CampoSeletor from "../components/CampoSeletor.vue";
import CampoTexto from "../components/CampoTexto.vue";
import TabelaMarota from "../components/TabelaMarota.vue";


let jogadorNovo = (time_id) => {
  return{
    'id': '',
    'nome': '',
    'posicao': '',
    'time_id': time_id, // time id que vem da rota
    'camisa': '',
    'salario': '',
    'info': '',
  }
}

const URL = 'http://localhost:3500/jogadores/'

export default {
  name: "Jogadores",

  computed: {
    ...mapState(['jogadores']),
    // time_id(){
    //   return this.$route.params.time_id
    // },
    //não consegui fazer funcionar
    time_jogadores(){
      return this.jogadores.filter(p => p.time_id === this.$route.params.time_id)
    }
  },
  components:{ TabelaMarota, CampoTexto, CampoSeletor, Campo },
  data(){
    return {
      jogador: jogadorNovo(),
      carregando: false,
      editando: false,
      time_id: this.$route.params.time_id,
      posicao: [
        'Atacante',
        'Lateral',
        'Zagueiro',
        'Goleiro',
      ]
    }
  },
  methods:{
    ...mapMutations(['jogadores_adicionar']),
    salvar() {
      this.carregando = true
      if(this.editando){
        axios.put(
            `${URL}/${this.jogador.id}`,
            {...this.jogador}
        ).then(({data}) => {
          this.jogador.push(this.jogador)
          this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(...this.jogadores.map(j => j.id)));
          this.carregando = false
          this.editando = false
        })
      }else{
        axios.post(
            `${URL}`,
            {...this.jogador}
        ).then(() => {
          this.jogadores.push(this.jogador)
          // this.jogadores_adicionar(this.jogador)
          this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(...this.jogadores.map(j => j.id)));
          this.carregando = false
        })
      }
    },
    apagar(jogador, index) {
      this.carregando = true
      axios.delete(`${URL}/${jogador.id}`).then(() => {
        let index = this.jogadores.indexOf(jogador)
        this.jogadores.splice(index, 1)
        this.carregando = false
      })
    },
    editar(jogador){
      this.editando = jogador
      this.jogador = {...jogador}
    }
  },
  mounted(){
    this.jogador = jogadorNovo()
    this.$store.dispatch('carregar')
  }
}
</script>

<style scoped>

</style>
