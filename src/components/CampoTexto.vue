<template>
  <div class="col-12 py-2">
    <label :for="nome" class="form-label">{{ nome }}</label>
    <textarea :type="tipo"
           class="form-control"
           :id="nome"
           :placeholder="nome"
           :value="modelValue"
              @input="$emit('update:modelValue', $event.target.value)">

    </textarea>
  </div>
</template>

<script>
export default {
  name: "CampoTexto",
  emits: ['update:modelValue'],
  props: ['nome','modelValue', 'tipo'],
  methods:{
    atualizar(){
      this.$emit('atualizado')
    }
  }
}
</script>

<style scoped>

</style>
