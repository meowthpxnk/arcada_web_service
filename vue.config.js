const { defineConfig } = require('@vue/cli-service')
const settings = require('./src/settings.js')
// const proxy = "http://" + settings.proxy.url + '/'
// console.log(proxy)
module.exports = defineConfig({
	transpileDependencies: true,

	devServer: {
		host: '127.0.0.1',
		port: 8080,
	},
})
