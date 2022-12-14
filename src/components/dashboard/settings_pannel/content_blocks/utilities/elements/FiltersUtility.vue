<template lang="html">
  <div class="utils filters-button admin-box" :class="{'opened' : is_opened}">
    <div class="title-cont" @click="openFilters">
      <div class="title">
        <span>FILTERS</span>
      </div>
      <div class="ico">
        <img src="@/assets/icons/admin-icons/filters.png" alt="">
      </div>
    </div>
    <div class="filters-cont" v-if="is_opened">
      <ul>
        <li class="filter-item" v-for="i in 1" :key="i">
          <div class="filter-info-container">
            <div class="title">
              category
            </div>
            <div class="buttons">
              <button class="close-ico">
                <img src="@/assets/icons/admin-icons/close.png" alt="">
              </button>
              <button class="arrow-ico">
                <img src="@/assets/icons/admin-icons/arrow.png" alt="">
              </button>
            </div>
          </div>
        </li>
        <li class="filter-item opened">
          <div class="filter-info-container">
            <div class="title">
              sort by
            </div>
            <div class="buttons">
              <button class="close-ico">
                <img src="@/assets/icons/admin-icons/close.png" alt="">
              </button>
              <button class="arrow-ico">
                <img src="@/assets/icons/admin-icons/arrow.png" alt="">
              </button>
            </div>
          </div>
          <div class="filter-content-container">
            <ul>
              <li>
                <div class="filt-dash">
                  <img src="@/assets/icons/admin-icons/filter-dash.png" alt="">
                </div>
                <div class="text">
                  <span>A-Z</span>
                </div>
              </li>
              <li>
                <div class="filt-dash">
                  <img src="@/assets/icons/admin-icons/filter-dash-end.png" alt="">
                </div>
                <div class="text">
                  <span>A-Z</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      is_opened: false,
    }
  },
  methods:{
    openFilters(){
      this.is_opened = !this.is_opened;
    }
  },
}
</script>

<style lang="css" scoped>
</style>
