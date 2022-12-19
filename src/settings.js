const set = "set"

const client = {
  host: '127.0.0.1',
  port: 8080,
}
const server = {
  host: 'api.arcadakms.ru',
  port: 5000,
}


module.exports = {
  client: {
    host: client.host,
    port: client.port,
    url: "http://" + client.host + ':' + client.port + "/"
  },
  proxy:{
    host: server.host,
    port: server.port,
    url: "http://" + server.host + "/"
  },

  api_url: "http://api.arcadakms.ru/",
}
