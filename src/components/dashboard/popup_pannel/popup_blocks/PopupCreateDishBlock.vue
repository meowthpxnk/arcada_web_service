<template lang="html">
  <div class="title">
    Создание блюда
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
              Основное
            </span>
          </button>
        </div>
      </li>
      <li>
        <div class="title">
          <span>Название</span>
        </div>
        <div class="content">
          <input
            type="text"
            class="set-box"
            placeholder="Введите название"
            v-model="title"
            ref="title"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Категория</span>
        </div>
        <div class="content category">
          <div
            class="set-box"
            :class="[isSelectedCategory ? 'active' : 'inactive']"
            @click="closeCategoriesList"
          >
            <span v-if="isSelectedCategory">{{selectedCategoryTitle}}</span>
            <span v-else>Выберете категорию</span>
            <div class="buttons">
              <button v-if="isSelectedCategory" class="close" @click.stop="category_id = null">
                <img src="@/assets/icons/admin-icons/close.png" alt="">
              </button>
              <button class="arrow"
                @click="closeCategoriesList"
              >
                <img src="@/assets/icons/admin-icons/arrow.png" alt="">
              </button>
            </div>
          </div>
          <div class="categories-list" v-if="isOpenedCategoriesList">
            <ul>
              <li v-for="category in categories" :key="category.id" @click="setCategoryId(category.id)">
                {{category.title}}
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <div class="title">
          <span>Цена</span>
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
          <span>Фотография</span>
        </div>
        <div class="content photo">
          <div class="photo">
            <img :src="selFile.url" alt="" v-show="isExistedFilePng">
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
          <span>Грамовка / Порция</span>
        </div>
        <div class="content">
          <input
            type="text"
            class="set-box"
            placeholder="Введите порцию / грамовку"
            v-model="portion"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Описание</span>
        </div>
        <div class="content">
          <textarea
            type="text"
            class="set-box area"
            placeholder="Введите описане блюда"
            v-model="description"
          />
        </div>
      </li>
      <li>
        <div class="title">
          <span>Состав блюда</span>
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
            <input type="text" placeholder="Введите игредиент"
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
import {isFileExtentionAllowed} from "@/methods/additional.js"
export default {
  emits: ["closePopup"],
  data(){
    return{
      title: '',
      price: 0,
      portion: '',
      description: '',
      ingredients: [],
      ingredients_input: '',
      is_full_menu: true,
      selFile: {url: null, file: null},

      category_id: null,

      isOpenedCategoriesList: false,
      submitting_status: false,
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
    }
  },
  methods:{
    onFileSelected(event){
      const file = event.target.files[0]
      this.selFile.url = URL.createObjectURL(file)
      this.selFile.file = file
      console.log(this.selFile)
    },
    deleteFromIngredientList(id){
      this.ingredients.splice(id, 1)
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
        }
        const dump = {dish: dish, file: this.selFile.file}
        const data = await this.$store.dispatch('postDashboardCreateDish', dump)
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
