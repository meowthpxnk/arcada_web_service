<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<script>
// import { loadYmap } from 'vue-yandex-maps';
import { loadYmap } from 'vue-yandex-maps'


// import { ymaps } from 'vue-yandex-maps'
let modifier;
export default {
  async mounted(){
    const settings = {
      apiKey: '6289737e-fefb-4767-908a-4b22aea5d3da',
      lang: 'ru_RU',
    }
    await loadYmap({...settings, debug: true});

    const api_url = require('@/settings.js').api_url
    // const requestURL = api_url + '/getUTCTime'
    // const res = await fetch(requestURL,{method: "GET"})
    // const gavno = await res.json()
    // console.log(res)
    // console.log(gavno)


  },
	created(){
		const appHeight = () => {
			const doc = document.documentElement
			doc.style.setProperty('--app-height', `${window.innerHeight}px`)
		}
		window.addEventListener('resize', appHeight)
		appHeight()
	}
}
</script>

<style>
@import "@/assets/style/style.css";

:root {
   --app-height: 100%;
}
</style>
