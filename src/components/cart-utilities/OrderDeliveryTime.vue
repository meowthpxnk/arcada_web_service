<template lang="html" >
  <div class="phone-number delivery-time input" v-if="isDeliveryTimeModified">


    <input
      type="nubmer"
      v-model="inputData"
      @input="validateTime"
      @change="cangeInput"
      @focus="focusInput"
      @blur="blurInput"
      placeholder="ЧЧ:ММ"
      maxlength="5"
    >
    <div class="button-wrapper">
      <button class="change-delivery-time" @click="defaultDeliveryTime">
        <img src="@/assets/icons/admin-icons/close.png" alt="">
      </button>
    </div>

    <div class="error" :class="{'active' : showError}">
      <span>Неправильное время доставки</span>
    </div>
  </div>


  <div class="phone-number delivery-time input" v-else>


    <div class="input-text">
      <span>Ближайшее</span>
    </div>
    <div class="button-wrapper">
      <button class="change-delivery-time" @click="modifyDeliveryTime">
        <img src="@/assets/icons/admin-icons/settings.png" alt="">
      </button>
    </div>
  </div>

</template>

<script>
export default {
  async mounted(){
    // await this.$store.dispatch('fetchUserData')
    // const phone = await this.$store.getters.getUserData.phone
    // this.inputData = phone
  },
  emits: ["changePhone"],
  data(){
    return{
      isError: false,
      inputData: '',
      id: 'phone',
      showError: false,
      isDeliveryTimeModified: false,
      parsed_time: null,
    }
  },
  computed:{

  },
  methods:{
    blurInput(){
      if (this.isError){
        this.showError = true
        // this.$store.commit("updatePhone", null)
        // this.$store.commit("updatePhone", this.inputData)
      }
    },

    modifyDeliveryTime(){
      this.$emit('changeDeliveryTime', this.parsed_time, this.isError)
      this.isDeliveryTimeModified = true
    },
    defaultDeliveryTime(){
      this.$emit('changeDeliveryTime', "DEFAULT", false)
      this.isDeliveryTimeModified = false
    },

    focusInput(){
      this.showError = false;
    },

    cangeInput(){
      if (this.isDeliveryTimeModified){
        this.$emit('changeDeliveryTime', this.parsed_time, this.isError)
      } else {
        this.$emit('changeDeliveryTime', "DEFAULT", false)
      }
    },

    getPrefixNumber(str) {
        if (str === "7") {
            return "7 (";
        }
        if (str === "8") {
            return "8 (";
        }
        if (str === "9") {
            return "7 (9";
        }
        return "0";
    },

    validateTime() {
        let value = this.inputData.replace(/\D+/g, "");
        const numberLength = 4;

        let result = "";
        // if (this.inputData.includes("+8") || this.inputData[0] === "8") {
        //     result = "";
        // } else {
        //     result = "+";
        // }

        for (let i = 0; i < value.length && i < numberLength; i++) {
            switch (i) {
                case 2:
                    result += ":";
                    break;
                // case 7:
                //     result += "-";
                //     break;
                // case 9:
                //     result += "-";
                //     break;
                default:
                    break;
            }
            result += value[i];
        }
        // let new_value = ""
        // if (value > 4) {
        //   for (let idx = 0; idx < 4; idx++){
        //     new_value += value[idx];
        //   }
        // }
        this.inputData = result;

        const minutes = value%100
        const hours = (value - minutes) /100
        const parsed_time = hours * 60 + minutes

        this.isError = !(
            (value.length >= 4
            || this.inputData === '')
            && parsed_time < 1440
            && parsed_time >= 0
            && minutes < 60
            && hours < 60
        );

        this.parsed_time = parsed_time

        console.log(value)

        // console.log(parsed_time < 1440)
        // console.log(parsed_time >= 0)
    },
  },
}
</script>

<style lang="css" scoped>
</style>
