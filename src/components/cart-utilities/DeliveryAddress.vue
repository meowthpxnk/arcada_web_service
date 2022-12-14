<template lang="html" >
  <div class="phone-number input">


    <input
      type="text"
      v-model="inputData"
      @input="validateAddress"
      @change="cangeInput"
      @focus="focusInput"
      @blur="blurInput"
    >


    <div class="error" :class="{'active' : showError}">
      <span>Incorrect address</span>
    </div>
  </div>

</template>

<script>
import {parseAddress} from "@/methods/address.js"
export default {
  emits: ["changeAddress"],
  data(){
    return{
      isError: true,
      inputData: '',
      id: 'address',
      showError: false,
    }
  },
  computed:{
    addressData(){
      return this.$store.getters.getUserData.address
    }
  },
  async mounted(){
    await this.$store.dispatch('fetchUserData')
    const address = await this.$store.getters.getUserData.address

    this.inputData = address
  },
  methods:{
    async blurInput(){

      const address = await parseAddress(this.inputData)

      if (address.result === "ERROR"){
        this.showError = true
        this.$store.commit("updateAddress", null)

      } else {
        this.$emit('changeAddress', address.coords)
        this.$store.commit("updateAddress", this.inputData)
      }
    },

    focusInput(){
      this.showError = false;
    },

    cangeInput(){
      this.$store.commit("updateAddress", null)
    },

    getPrefixNumber(str) {
        if (str === "7") {
            return "7 (";
        }
        if (str === "8") {
            return "8 (";
        }
        if (str === "9") {
            return "7 (9";
        }
        return "7 (";
    },

    async validateAddress() {
      this.showError = false
    },
  },
}
</script>

<style lang="css" scoped>
</style>
