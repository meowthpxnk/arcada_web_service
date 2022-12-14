<template lang="html">
  <div class="bounce">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.bounce {
   /* margin: 100px auto 0; */
   /* width: 70px; */
   /* text-align: center; */
   width: 70px;
   height: 70px;
   display: -webkit-flex;
   display: -ms-flex;
   display: flex;
   /* gap: 6px; */
   -ms-align-items: center;
   align-items: center;
   justify-content: space-between;
  }

  .bounce>div {
   width: 18px;
   height: 18px;
   background-color: #fff;
   border-radius: 100%;
   display: inline-block;
   animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .bounce .bounce1 {
   animation-delay: -0.32s;
  }

  .bounce .bounce2 {
   animation-delay: -0.16s;
  }

  @keyframes sk-bouncedelay {
   0%,
   80%,
   100% {
    transform: scale(0);
   }
   40% {
    transform: scale(1.0);
   }
  }
</style>
