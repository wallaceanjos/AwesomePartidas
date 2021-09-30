<template>
  <div class="container">
    <h1>Partidas</h1>
    <table class="table table-striped table-sm" >
      <thead>
      <tr>
        <th class="col text-center">Nome</th>
        <th class="col text-center" colspan="2">Opções</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(partida, index) in partidas" :key="partida.id">
        <td class="col">{{ partida.time_casa }}</td>
        <td class="col">
          <button class="btn btn-primary" @click="editar(partida)">Editar</button>
        </td>
        <td class="col">
          <button class="btn btn-primary" disabled v-if="carregando">Carregando</button>
          <button class="btn btn-danger" v-else @click="apagar(partida, index)">Apagar</button>
        </td>
      </tr>
      </tbody>
    </table>
    <!--  <TabelaMarota :lista="partidas"></TabelaMarota>-->
  </div>

  <div class="container">
    <Campo tipo="text" nome="Nome" v-model="partida.nome"></Campo>
    <button v-if="carregando" class="btn btn-lg btn-success" disabled>Carregando</button>
    <button class="btn btn-lg btn-success" v-else @click="salvar">Salvar</button>
  </div>

</template>

<script>

import {mapState} from 'vuex'

import axios from "axios";
import Campo from "../components/Campo.vue";
import CampoSeletor from "../components/CampoSeletor.vue";
import CampoTexto from "../components/CampoTexto.vue";
import TabelaMarota from "../components/TabelaMarota.vue";


let partidaNovo = (max) => {
  let max_id = max || 0
  return{
    'id': max_id + 1,
    'nome': '',
  }
}

const URL = 'http://localhost:3500/partidas/'

export default {
  name: "partidas",

  computed:{
    ...mapState(['partidas']),
    query(){
      return this.$route.query
    },
    params(){
      return this.$route.params
    }
  },
  components:{ TabelaMarota, CampoTexto, CampoSeletor, Campo },
  data(){
    return {
      partida: partidaNovo(),
      partidas:[],
      carregando: true,
      editando: false
    }
  },

  // axios.post(URL,
  //     { ...this.partida })
  //     .then(() => {
  //       this.partidas.push(this.partida)
  //       this.partida = partidaNovo(Math.max(...this.partidas.map(t => t.id)));
  //       this.carregando = false;
  //       this.partidaCriado = true;
  //     })

  methods:{
    salvar() {
      this.carregando = true
      if(this.editando){
        axios.put(
            `${URL}/${this.partida.id}`,
            {...this.partida}
        ).then(() => {
          // Object.assign(this.editando, partida)
          this.partida.push(this.partida)
          this.partida = partidaNovo()
          this.carregando = false
          this.editando = false
        })
      }else{
        axios.post(
            `${URL}`,
            {...this.partida}
        ).then(() => {
          this.partidas.push(this.partida)
          this.partida = partidaNovo(Math.max(...this.partidas.map(t => t.id)))
          this.carregando = false
        })
      }
    },
    apagar(partida, index) {
      this.carregando = true
      axios.delete(`${URL}${partida.id}`).then(() => {
        let index = this.partidas.indexOf(partida)
        this.partidas.splice(index, 1)
        this.carregando = false
      })
    },
    editar(partida){
      this.editando = partida
      this.partida = {...partida}
    }
  },
  mounted(){
    this.carregando = true
    axios.get(`${URL}`).then(({data}) => {
      this.partidas = data
      this.carregando = false
      this.partida = partidaNovo(Math.max(...this.partidas.map(t => t.id)))
    })
    this.$store.dispatch('carregar')
  }
}
</script>

<style>
</style>


