<template>
  <div class="container">
    <h1>Times</h1>
    <table class="table table-striped table-sm" >
      <thead>
      <tr>
        <th class="col text-center">Nome</th>
        <th class="col text-center" colspan="2">Opções</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(time, index) in times" :key="time.id">
        <td class="col">
          <router-link class="px-5" :to="{name:'jogadores', params:{ time_id: time.id}}">{{time.nome}}</router-link>
        </td>
        <td class="col">
          <button class="btn btn-primary" @click="editar(time)">Editar</button>
        </td>
        <td class="col">
          <button class="btn btn-primary" disabled v-if="carregando">Carregando</button>
          <button class="btn btn-danger" v-else @click="apagar(time, index)">Apagar</button>
        </td>
      </tr>
      </tbody>
    </table>
    <!--  <TabelaMarota :lista="times"></TabelaMarota>-->
  </div>

  <div class="container">
    <Campo tipo="text" nome="Nome" v-model="time.nome"></Campo>
    <button v-if="carregando" class="btn btn-lg btn-success" disabled>Carregando</button>
    <button class="btn btn-lg btn-success" v-else @click="salvar">Salvar</button>
  </div>

</template>

<script>
import {mapState, mapMutations} from 'vuex'

import axios from "axios";
import Campo from "../components/Campo.vue";
import CampoSeletor from "../components/CampoSeletor.vue";
import CampoTexto from "../components/CampoTexto.vue";
import TabelaMarota from "../components/TabelaMarota.vue";


let timeNovo = (max) => {
  let max_id = max || 0
  return{
    'id': max_id + 1,
    'nome': '',
  }
}

const URL = 'http://localhost:3500/times/'

export default {
  name: "Times",

  computed:{
    ...mapState(['times']),
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
      time: timeNovo(),
      carregando: false,
      editando: false
    }
  },

  // axios.post(URL,
  //     { ...this.time })
  //     .then(() => {
  //       this.times.push(this.time)
  //       this.time = timeNovo(Math.max(...this.times.map(t => t.id)));
  //       this.carregando = false;
  //       this.timeCriado = true;
  //     })
  methods:{
    ...mapMutations(['times_adicionar']),
    salvar() {
      this.carregando = true
      if(this.editando){
        axios.put(
            `${URL}/${this.time.id}`,
            {...this.time}
        ).then(({data}) => {
          // Object.assign(this.editando, time)
          this.editando.nome = this.time.nome
          this.time = timeNovo()
          this.carregando = false
          this.editando = false
        })
      }else{
        axios.post(
            `${URL}`,
            {...this.time}
        ).then(() => {
          this.times_adicionar(this.time)
          this.time = timeNovo(Math.max(...this.times.map(t => t.id)))
          this.carregando = false
        })
      }
    },
    apagar(time, index) {
      this.carregando = true
      axios.delete(`${URL}${time.id}`).then(() => {
        let index = this.times.indexOf(time)
        this.times.splice(index, 1)
        this.carregando = false
      })
    },
    editar(time){
      this.editando = time
      this.time = {...time}
    }
  },
  mounted(){
    this.time = timeNovo(Math.max(...this.times.map(t => t.id)))
    this.$store.dispatch('carregar')
  }
}
</script>

<style>
</style>


