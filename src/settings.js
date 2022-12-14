const set = "set"

const client = {
  host: '193.124.115.173',
  port: 8080,
}
const server = {
  host: '193.124.115.173',
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
}
