<template>
  <div class="col-12 py-2">
    <label :for="nome" class="form-label">{{ nome }}</label>
    <select
            class="form-control"
            :id="nome"
            :placeholder="nome"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">
      <option v-for="item in itens" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "CampoSeletor",
  emits: ['update:modelValue'],
  props: ['nome','modelValue', 'itens'],
  methods:{
    atualizar(){
      this.$emit('atualizado')
    }
  }
}
</script>

<style scoped>

</style>
