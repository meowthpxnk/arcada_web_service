<template lang="html">
  <div class="error-dashboard-modal-container">
    <div class="error-dashboard-modal">
      <ul>
        <li v-for="error in errors_list" :key="error">
          <div class="error-title">
            <span>{{error.title}} :</span>
          </div>
          <div class="error-description">
            <span>{{error.code}}</span>
          </div>
        </li>
      </ul>
      <div class="button" @click="close_error_modal">
        <button>
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default {
  methods:{
    close_error_modal(){
      this.$store.commit("disableDashboardErrorPopup")
    }
  },
  computed:{
    errors_list(){
      const errors_list = this.$store.getters.getDashboardErrorsList
      const errors_keys = Object.keys(errors_list)
      const dump_errors = []
      for (const error of errors_keys){
        dump_errors.push({title: capitalizeFirstLetter(error), code: errors_list[error]})
      }

      return dump_errors
    }
  }
}
</script>

<style lang="css" scoped>
</style>
