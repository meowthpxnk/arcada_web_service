<template lang="html">
  <div></div>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  async mounted(){
    const route = useRoute()
    const desk_key = route.params.desk_key;
    console.log(desk_key)




    try {
      await this.$store.dispatch("getPrivateKey")
      console.log(desk_key)
      const restaurant_link = await this.$store.dispatch("fetchVerificationPrivateKey", desk_key)
      document.location.href = await "/restaurants/"+ restaurant_link + '/qr'
    } catch (e){
      console.error(e)
    }




    try {
      const restaurant_link = await this.$store.dispatch('fetchRegisterPrivateKey', desk_key)
      document.location.href = "/restaurants/"+ restaurant_link + '/qr'
    } catch(e){
      console.error(e)
      document.location.href = "/404"
    }
  }
}
</script>

<style lang="css" scoped>
</style>
