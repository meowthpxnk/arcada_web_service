<template lang="html">
  <transition name="fade">
    <div v-if="isShownPreloader" class="modal-preloader">
      <preloader-component/>
    </div>
  </transition>
</template>

<script>
import PreloaderComponent from "@/components/mixins/PreloaderComponent.vue"

export default {
  components:{
    PreloaderComponent
  },
  props: {
    isShownPreloader: Boolean,
  }
}
</script>

<style lang="css" scoped>
/* .fade-enter-from{
  background-color: rgba(10, 10, 10, 1);
  backdrop-filter: blur(4px)
}
.fade-enter-to{
  background-color: rgba(10, 10, 10, 1);
  backdrop-filter: blur(4px)
}
.fade-enter-active{
  transition: all 1s ease;
}
.fade-leave-from{
  background-color: rgba(10, 10, 10, 1);
  backdrop-filter: blur(4px)
} */
.fade-leave-to{
  backdrop-filter: blur(0px);
  background-color: rgba(10, 10, 10, 0);
}
.fade-leave-active{
  transition: all .5s ease;
}
.fade-leave-to .bounce{
  opacity: 0%;
}
.fade-leave-active .bounce{
  transition: all .5s ease;
}
</style>
