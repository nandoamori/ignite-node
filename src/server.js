import http from 'node:http' //módulos internos do node, coloca node: na frente da importação
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

//método de importação CommonJS -> require
//ESModules -> import

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path === url
    
    })
    if (route) {
        return route.handler(req, res)
      }
    
      return res.writeHead(404).end()


})

server.listen(3333)