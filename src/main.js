import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
// import YmapPlugin from 'vue-yandex-maps'

// Vue

// const settings = {
//   apiKey: '6289737e-fefb-4767-908a-4b22aea5d3da',
//   lang: 'ru_RU',
//   coordorder: 'latlong',
//   enterprise: false,
//   version: '2.1'
// }

createApp(App).use(router).use(store).mount('#app')
