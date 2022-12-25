<template lang="html">
  <nav class="tabs">
    <ul>
      <li :class="{'active': block==='MENU'}" @click="setMenu">
        <div class="tab">
          <div class="logo">
            <img src="@/assets/icons/admin-icons/menu.png" alt="">
          </div>
          <span>MENU</span>
        </div>
      </li>
      <span class="dash"/>
      <li :class="{'active': block==='CATEGORIES'}" @click="setCategory">
        <div class="tab">
          <div class="logo">
            <img src="@/assets/icons/admin-icons/categories.png" alt="">
          </div>
          <span>CATEGORIES</span>
        </div>
      </li>
      <span class="dash"/>
      <li :class="{'active': block==='QR_MENU'}" @click="setQR">
        <div class="tab">
          <div class="logo">
            <img src="@/assets/icons/admin-icons/qr.png" alt="">
          </div>
          <span>QR MENU</span>
        </div>
      </li>
      <span class="dash"/>
      <li :class="{'active': block==='SETTINGS'}" @click="setSettings">
        <div class="tab">
          <div class="logo">
            <img src="@/assets/icons/admin-icons/settings.png" alt="">
          </div>
          <span>SETTINGS</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props:{
    block: String,
  },
  methods:{
    setMenu(){
      this.$emit('changeBlock', 'MENU')
    },
    setCategory(){
      this.$emit('changeBlock', 'CATEGORIES')
    },
    setSettings(){
      this.$emit('changeBlock', 'SETTINGS')
    },
    setQR(){
      this.$emit('changeBlock', 'QR_MENU')
    }
  },
  // data(){
  //   return{
  //     menu: true,
  //     category: false,
  //     settings: false,
  //   }
  // },
}
</script>

<style lang="css" scoped>
</style>
