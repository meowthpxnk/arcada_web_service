<template lang="html">
  <div class="icon-circle" :class="{'active':isActive}">
    <!-- <svg>
      <img src="@/assets/svgs/categories/1.svg" alt="">
    </svg> -->
    <img :src="server_url + 'images/dish-icons/' + 'black_' +category.logo" v-if="isActive">
    <img :src="server_url + 'images/dish-icons/' + category.logo" alt="" v-else>
  </div>
  <p>{{category.title}}</p>
</template>

<script>
const settings = require('@/settings.js')
// const server_url = settings.proxy.url
export default {
  data(){
    return{
      server_url: settings.proxy.url
    }
  },
  props: {
    category: Object,
    active_category_id: Number,
  },
  computed:{
    isActive(){
      return this.category.id === this.active_category_id
    }
  }
}
</script>

<style lang="css" scoped>
</style>
