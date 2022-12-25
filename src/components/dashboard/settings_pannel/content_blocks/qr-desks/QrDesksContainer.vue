<template lang="html">
  <div class="main dish-adm">
    <ul>
      <!-- aaa -->
      <!-- {{desks}} -->
      <li v-for="desk in desks" :key="desk.number" @click="editDesk(desk.number)">
        <qr-desk-box :desk = "desk"/>
      </li>
    </ul>
  </div>
</template>

<script>
import QrDeskBox from "@/components/dashboard/settings_pannel/content_blocks/qr-desks/QrDeskBox.vue"

export default {
  components:{
    QrDeskBox
  },
  computed:{
    desks(){
      return this.$store.getters.getDashboardQrDesks
    },
  },
  methods:{
    editDesk(desk_number){
      this.$emit('editDesk')
      this.$store.commit('setActiveDesk', desk_number)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
