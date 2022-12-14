<template lang="html">
  <div class="slider" v-if="isBanners">
    <!-- {{banners}} -->

    <div class="slider-items">
      <ul>
        <li
          v-for ="(item, idx) in banners.banners"
          :key ="item.link"
          :class="{'first': (idx=== 0)}"
          :style="[(idx===0) ? {'margin-left': '-' + (100 * active_item) + '%'} : {}]"
        >
          <slider-item
            :item="item"
            @clickPrev="clickPrev"
          />
        </li>
      </ul>
    </div>
    <div class="button-container" v-if="showButtons" @click="clickPrev">
      <button @click.stop="previousSlide">
        <img src="@/assets/icons/restaurant-icons/arrow.png" alt="">
      </button>
      <button @click.stop="nextSlide">
        <img src="@/assets/icons/restaurant-icons/arrow.png" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import SliderItem from "@/components/slider/SliderItem.vue"

export default {
  data(){
    return{
      active_item: 0,
    }
  },
  components:{
    SliderItem
  },
  methods:{
    nextSlide(){
      if (this.active_item >= this.banners.banners.length - 1){
        this.active_item = 0
      } else {
        this.active_item += 1;
      }
    },
    previousSlide(){
      if (this.active_item <= 0){
        this.active_item = this.banners.banners.length - 1
      } else {
        this.active_item -= 1;
      }
    },
    clickPrev(){
      const link = this.banners.banners[this.active_item].link
      this.$store.commit('showSliderItem', link)
    }
  },
  computed:{
    banners(){
      const banners = this.$store.getters.getBanners

      if (banners.length === 0){
        const main_banner = this.$store.getters.getRestaurant.banner
        if (main_banner !== null){
          return {code: "MAIN", banners: [{link: null, banner: main_banner}]}
        } else {
          return {code: "NONE", banners: []}
        }
      }
      return {code: "LINKS", banners: banners}
    },
    showButtons(){
      return (this.banners.banners.length > 1)
    },
    isBanners(){
      return this.banners.code !== "NONE"
    }
  },
}
</script>

<style lang="css" scoped>
</style>
