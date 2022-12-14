<template lang="html" >
  <div class="your-name input">

    <input
      type="text"
      v-model="inputData"
      @input="validatePhone"
      @change="cangeInput"
      @focus="focusInput"
      @blur="blurInput"
    >
  </div>
</template>

<script>
export default {
  data(){
    return{
      inputData: ''
    }
  },
  async mounted(){
    await this.$store.dispatch('fetchUserData')
    const name = await this.$store.getters.getUserData.name
    this.inputData = name
  },
  computed:{
    isDeliveryType(){
      return this.$store.getters.isDelivery
    }
  },
  methods:{
    blurInput(){
      if (this.inputData !== ''){
        this.$store.commit("updateName", this.inputData)
      } else {
        this.$store.commit("updateName", null)
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>
