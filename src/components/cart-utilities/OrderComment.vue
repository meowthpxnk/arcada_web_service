<template lang="html" >

  <div class="order-comment">
    <textarea name="" @blur="blurInput" v-model="inputData"></textarea>
  </div>

</template>

<script>
export default {
  async mounted(){
    this.$store.commit('updateComment', this.inputData);
  },
  data(){
    return{
      inputData: ""
    }
  },
  methods:{
    blurInput(){
      this.$store.commit('updateComment', this.inputData);
    }
  }

}
</script>

<style lang="css" scoped>
</style>
