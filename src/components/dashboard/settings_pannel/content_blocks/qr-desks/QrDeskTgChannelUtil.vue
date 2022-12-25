<template lang="html">
  <div class="title">
    Telegram channel
  </div>
  <div class="number">
    <input type="text" placeholder="enter ur channel" v-model="telegram_channel">
  </div>
  <div class="submit-button" @click="clickSubmit" v-if="isSubmit"><button>submit</button></div>
</template>

<script>
export default {
  async mounted(){
    this.old_telegram_channel = this.$store.getters.getTelegramChannel
    this.telegram_channel = this.$store.getters.getTelegramChannel
  },
  data(){
    return{
      old_telegram_channel: "",
      telegram_channel: "",
      preload_status: true,
    }
  },
  computed:{
    isSubmit(){
      return this.telegram_channel !== this.old_telegram_channel
    }
  },
  methods:{
    async clickSubmit(){
      if (this.preload_status){
        this.preload_status = false
        try {
          await this.$store.dispatch("fetchChangeTelegramChannel", this.telegram_channel)
          this.old_telegram_channel = await this.telegram_channel
        } catch(e){
          console.error(e)
        }
        this.preload_status = true
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>
