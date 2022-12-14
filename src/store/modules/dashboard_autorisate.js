
const settings = require('@/settings.js')
const url = settings.client.url

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default {
  actions: {
    async fetchApiKey(ctx, API_KEY){

      const method = "dashboard/checkApiKey"
      const requestURL = url + method

      const dump = {API_KEY: API_KEY}

      const responce = await fetch(requestURL,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dump),
      })
      const data = await responce.json()
      console.log(data)
      ctx.commit("updateApiKey", API_KEY)
      return data.result
    },
  },
  mutations: {
    updateApiKey(state, API_KEY){
      state.API_KEY = API_KEY
    },
  },
  state: {
    API_KEY: '',
  },
  getters: {
    getApiKey: (state) => {
      return state.API_KEY
    },
  },
}
