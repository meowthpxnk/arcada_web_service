<template lang="html" >
  <div class="delivery-type">
    <button :class="{'active': isDeliveryType}" @click="setDeliveryType">
      <span>
        доставка
      </span>
    </button>
    <button :class="{'active': (isDeliveryType === false)}" @click="setPickupType">
      <span>
        самовывоз
      </span>
    </button>
  </div>

</template>

<script>
export default {
  computed:{
    isDeliveryType(){
      return this.$store.getters.isDelivery
    }
  },
  methods:{
    setDeliveryType(){
      this.$store.commit('setDeliveryType')
    },
    setPickupType(){
      this.$store.commit('setPickupType')
    },
  },
}
</script>

<style lang="css" scoped>
</style>
