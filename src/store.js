import { createStore } from 'vuex'
import axios from "axios";

const TIMEDB = 'http://localhost:3500/times/'
const JOGADORDB = 'http://localhost:3500/jogadores/'
const PARTIDADB = 'http://localhost:3500/partidas/'

// Create a new store instance.
const store = createStore({
  state: {
    times:[],
    jogadores:[],
    partidas:[]
  },

  getters: { // equivalente ao computed de um componente
  },

  mutations: { // altera o state
    times_carregado(state, times){
     state.times = times
    },

    times_adicionar(state, time){
      state.times.push(time)
    },

    jogadores_carregado(state, jogadores){
      state.jogadores = jogadores
    },

    jogadores_adicionar(state, jogador){
      state.jogadores.push(jogador)
    },


    partidas_carregado(state, partidas){
      state.partidas = partidas
    }
  },
  actions:{ // equivalente ao methods de um componente
    carregar({commit}){
      axios.get(`${TIMEDB}`).then(({data}) => {
        commit("times_carregado", data)
      })

      axios.get(`${JOGADORDB}`).then(({data}) => {
        commit("jogadores_carregado", data)
      })

      axios.get(`${PARTIDADB}`).then(({data}) => {
        commit("partidas_carregado", data)
      })
    },
  }
})


export default store
