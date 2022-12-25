<template lang="html">
  <div>
    Enable
  </div>
  <div class="button-switcher">
    <button
      @click="clickSwitcher"
      class="switcher"
      :class = "[$store.getters.getIsEnabledQrMenu ? 'active' : 'inactive']"
    >
      <div
        class="circle"
      />
    </button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      preload_status: true,
    }
  },
  methods:{
    async clickSwitcher(){
      console.log(123)
      if(this.preload_status){
        this.preload_status = false
        try {
          await this.$store.dispatch("fetchChangeIsEnabledQrMenu")
        } catch(e){
          console.error(e)
        }
        this.preload_status = await true
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
