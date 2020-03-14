const app = require('connect')()
const router = require('./middleware/router')

let main = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
    res.setHeader('Content-Type', 'text/json')
    next()
}

const routes = {
    'GET': {
        '/users': (req, res) => {
            res.end(JSON.stringify({
                msg: 'get'
            }))
        }
    },
    'POST': {
        '/users': (req, res) => {
            res.end(JSON.stringify({
                msg: 'post'
            }))
        }
    }
}

app
    .use(main)
    .use(router(routes))

app.listen('3000', () => {
    console.log('服务启动')
})