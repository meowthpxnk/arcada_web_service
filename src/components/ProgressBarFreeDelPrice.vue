<template lang="html">
  <div class="progress-bar">
    <div class="bar" :style="{width: calcPercents + '%'}"></div>
  </div>
  <div class="free-delivery-counter" v-if="calculateWithDelPrice">
    <span class="title">1500Р FOR FREE DELIVERY</span>
    <span class="counter">{{calculateWithDelPrice}}P MORE</span>
    <!-- <span class="counter">{{calcPercents}}P MORE</span> -->
  </div>
</template>

<script>
export default {
  props:{
    calcPercents: Number,
    calculateWithDelPrice: String,
  },
  mounted(){
    console.log("calcPercents");
    // console.log(calcPercents);
    console.log("calculateWithDelPrice");
    // console.log(calculateWithDelPrice);
  }
}
</script>

<style lang="css" scoped>
</style>
