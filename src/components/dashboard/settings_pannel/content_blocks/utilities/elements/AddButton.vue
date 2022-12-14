<template lang="html">
  <div class="utils add-button admin-box">
    <div class="title-cont">
      <div class="title">
        <span>{{text}}</span>
      </div>
      <div class="ico">
        <img src="@/assets/icons/admin-icons/plus.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    text: String,
  }
}
</script>

<style lang="css" scoped>
</style>
