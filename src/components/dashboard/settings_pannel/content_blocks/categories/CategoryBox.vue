<template lang="html">
  <div class="category admin-box">
    <div class="main-info">
      <div class="logo">
        <img v-if="getIcon" :src="getIcon" alt="">
      </div>
      <div class="title">
        {{category.title}}
      </div>
    </div>
    <div class="add-info">
      <!-- <div class="adds">
        <div class="hint">
          <span>!</span>
        </div>
        <div class="alert">
          <span>12</span>
        </div>
      </div> -->
      <button class="edit-button">
        <img src="@/assets/icons/admin-icons/edit.png" alt="">
      </button>
    </div>
  </div>
</template>

<script>
const settings = require('@/settings.js')
const server_url = settings.proxy.url
export default {
  props:{
    category: Object,
  },
  computed:{
    getIcon(){
      if(this.category.logo !== null){
        return server_url + 'images/dish-icons/' + this.category.logo
      }
      return null;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
