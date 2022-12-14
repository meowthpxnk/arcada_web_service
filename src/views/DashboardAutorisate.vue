<template lang="html">
  <div class="dashboard-autorisate-container">
    <div class="dashboard-autorisate">
      <div class="title">
        <span>Введите API ключ</span>
      </div>
      <input type="text" placeholder="API Ключ" v-model="API_KEY">
      <div class="error" v-if="api_error">Неправильный ключ</div>
      <button @click="setApiKey">
        Войти
      </button>
    </div>
  </div>

  <modal-preloader-screen
    :isShownPreloader="preloader"
  />
  <modal-preload-screen-answer
    :isShownPreloader="preloader_answ"
  />
</template>

<script>
import ModalPreloaderScreen from "@/components/client-popups/ModalPreloaderScreen.vue"
import ModalPreloadScreenAnswer from "@/components/client-popups/ModalPreloadScreenAnswer.vue"

export default {
  components:{
    ModalPreloaderScreen,
    ModalPreloadScreenAnswer
  },
  data(){
    return{
      API_KEY: '',
      submitting_status: false,
      preloader: true,
      preloader_answ: false,
      api_error: false,
    }
  },
  async mounted(){
    document.title = "Dashboard - Autorisation"
    const API_KEY = localStorage.getItem('dashboard-API_KEY')

    if(API_KEY){
      const result = await this.$store.dispatch("fetchApiKey", API_KEY)
      if(result){
        document.location.href = "/dashboard"
      } else {
        this.api_error = true
      }
    }
    this.preloader = false
  },
  methods:{
    async setApiKey(){
      if(this.submitting_status === false){
        this.preloader_answ = true
        this.submitting_status = true
        const result = await this.$store.dispatch("fetchApiKey", this.API_KEY)
        if (result){
          await localStorage.setItem('dashboard-API_KEY', this.API_KEY)
          document.location.href = "/dashboard"
        } else {
          this.api_error = true
        }

        this.preloader_answ = false
        this.submitting_status = false
      }
      // localStorage.setItem('dashboard-API_KEY', this.API_KEY)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
