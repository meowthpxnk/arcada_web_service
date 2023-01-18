<template lang="html">
  <div class="title">
    <!-- Creating Dish -->
    {{active_dish.title}}
  </div>
  <div class="utilities">
    <ul>
      <li>
        <div class="title">
          <span>Тип меню</span>
        </div>
        <div class="content menu-type-button">
          <button :class="{'active':!(is_full_menu)}" @click="setNotFullMenu">
            <span>
              Доставка
            </span>
          </button>
          <button :class="{'active':is_full_menu}" @click="setFullMenu">
            <span>
              Кафе
            </span>
          </button>
        </div>
      </li>
      <li>
        <div class="title">
          <span>Dish title</span>
        </div>
        <div class="content">
          <input
            type="text"
            class="set-box"
            placeholder="Enter the dish title"
            v-model="title"
            ref="title"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Dish price</span>
        </div>
        <div class="content">
          <input
            type="number"
            class="set-box"
            placeholder="Enter price of dish"
            v-model="price"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Dish photo</span>
        </div>
        <div class="content photo">
          <div class="photo">
            <img :src="selFile.url" alt="" v-if="isExistedFilePng">
            <img :src="server_url + file_image" alt="" v-else-if="file_image">
          </div>

          <label>
            <img src="@/assets/icons/admin-icons/upload.png" alt="">
            <input type="file" accept="image/png" @change="onFileSelected">
          </label>


          <!-- <button>
            <img src="@/assets/icons/admin-icons/upload.png" alt="">
          </button> -->
          <button>
            <img src="@/assets/icons/admin-icons/trash.png" alt="">
          </button>
          <!-- <button></button> -->
        </div>
      </li>
      <li>
        <div class="title">
          <span>Dish portion</span>
        </div>
        <div class="content">
          <input
            type="text"
            class="set-box"
            placeholder="Enter the dish portion"
            v-model="portion"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Dish description</span>
        </div>
        <div class="content">
          <textarea
            type="text"
            class="set-box area"
            placeholder="Enter the description of dish"
            v-model="description"
          />
        </div>
      </li>
      <li>
        <div class="title">
          <span>Dish ingredients</span>
        </div>
        <div class="content ingredients">
          <div class="ingredients-list">
            <ul>
              <li v-for="ingredient, index in ingredients" :key="index">
                <span>{{ingredient}}</span>
                <button @click="deleteFromIngredientList(index)">
                  <img src="@/assets/icons/admin-icons/close.png" alt="">
                </button>
              </li>
            </ul>
          </div>
          <div class="dash"/>
          <div class="ingredients-input">
            <input type="text" placeholder="Enter ingredient"
              @keyup.enter="addToIngredientList"
              v-model="ingredients_input"
              ref="ingredient_input"
            >
            <button @click="addToIngredientList">
              <img src="@/assets/icons/admin-icons/plus-black.png" alt="">
            </button>
          </div>

        </div>
      </li>
      <li>
        <div class="delete-button">
          <button class="util-box" @click="deleteClicked">Delete dish</button>
        </div>
      </li>
    </ul>
    <div class="bg-test" :class="{'active' : submitting_status}">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
  <div class="submit-button" @click="submitClicked">
    <button>
      Submit
    </button>
  </div>
</template>

<script>
const api_url = require('@/settings.js').api_url
import {isFileExtentionAllowed, parsePrice} from "@/methods/additional.js"
export default {
  emits: ["closePopup"],

  mounted(){
    const active_dish = this.$store.getters.getActiveDish
    this.title = active_dish.title
    this.price = parseFloat(parsePrice(active_dish.price))
    this.portion = active_dish.portion
    this.description = active_dish.description
    this.ingredients = active_dish.ingredients
    this.category_id = active_dish.category_id
    this.selFile = {url: null, file: null}
    this.file_image = active_dish.photo
    this.is_full_menu = active_dish.is_full_menu
    this.id = active_dish.id
    console.log(active_dish)

  },
  data(){
    return{
      title: '',
      price: 0,
      portion: '',
      description: '',
      ingredients: [],
      ingredients_input: '',
      selFile: {url: null, file: null},
      is_full_menu: false,
      id: null,

      category_id: null,

      isOpenedCategoriesList: false,
      submitting_status: false,
      file_image: null,
      server_url: api_url,
    }
  },
  computed:{
    isExistedFilePng(){
      if (this.selFile.url == null){
        return false
      }
      return isFileExtentionAllowed(this.selFile.file.name, 'png')
    },
    categories(){return this.$store.getters.getDashboardCategories},
    isSelectedCategory(){return this.category_id !== null},
    selectedCategoryTitle(){
      if (this.isSelectedCategory){
        return this.categories.filter(category => category.id === this.category_id)[0].title
      }
      return ''
    },
    active_dish(){
      return this.$store.getters.getActiveDish
    },
  },
  methods:{
    onFileSelected(event){
      const file = event.target.files[0]
      this.selFile.url = URL.createObjectURL(file)
      this.selFile.file = file
      // console.log(this.selFile)
      console.log(this.selFile)
    },
    deleteFromIngredientList(id){
      this.ingredients.splice(id, 1)
      // console.log(id)
    },
    addToIngredientList(){
      const isExisted = this.ingredients
        .filter(ingredient => ingredient.toLowerCase() == this.ingredients_input.toLowerCase())[0] == null
      if(isExisted){
        this.ingredients.push(this.ingredients_input)
        this.ingredients_input = ''
      }
      this.$refs.ingredient_input.focus()
    },

    async deleteClicked(){
      if (this.submitting_status === false){
        const dump = {
          category_id: this.category_id,
          id: this.id,
        }
        const data = await this.$store.dispatch('postDashboardDeleteDish', dump)
        if (data.result === 'SUCCES'){
          this.$emit('closePopup')
        }
        this.submitting_status = false
      }

    },

    async submitClicked(){

      if (this.submitting_status === false){
        this.submitting_status = true
        const dish = {
          title: this.title,
          category_id: this.category_id,
          price: this.price*100,
          portion: this.portion,
          ingredients: this.ingredients,
          description: this.description,
          is_full_menu: this.is_full_menu,
          id: this.id,
        }
        const dump = {dish: dish, file: this.selFile.file}
        console.log(dish)



        const data = await this.$store.dispatch('postDashboardEditDish', dump)
        console.log(data)
        if (data.result === 'SUCCES'){
          this.$emit('closePopup')
        }
        this.submitting_status = false
      }
    },
    closeCategoriesList(){
      console.log(this.isOpenedCategoriesList)
      this.isOpenedCategoriesList = !this.isOpenedCategoriesList
    },
    setCategoryId(id){
      this.category_id = id
      this.isOpenedCategoriesList = false
    },
    setFullMenu(){
      this.is_full_menu = true
    },
    setNotFullMenu(){
      this.is_full_menu = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
