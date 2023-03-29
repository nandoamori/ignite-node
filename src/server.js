import http from 'node:http' //módulos internos do node, coloca node: na frente da importação
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

//método de importação CommonJS -> require
//ESModules -> import

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    
    })
    if (route) {
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups
        req.params = params

        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
      }
    
      return res.writeHead(404).end()


})

server.listen(3333)