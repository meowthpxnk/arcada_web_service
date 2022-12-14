const { defineConfig } = require('@vue/cli-service')
const settings = require('./src/settings.js')
// const proxy = "http://" + settings.proxy.url + '/'
// console.log(proxy)
module.exports = defineConfig({
	transpileDependencies: true,

	devServer: {
		host: settings.client.host,
		port: settings.client.port,
		proxy: settings.proxy.url,
	},
})
