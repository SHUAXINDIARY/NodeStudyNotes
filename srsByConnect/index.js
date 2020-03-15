const connect = require('connect')
const serStatic = require('serve-static')
const bodyParser = require('body-parser')
const compression = require('compression')
const router = require('./route/router').router

const app = connect()
app
    .use(compression())
    .use(bodyParser.json({ 'Content-Type': 'application/json' }))
    .use(serStatic(__dirname + '/public/', { '/': 'home.html' }))
    .use((req, res) => {
        // 处理请求
        res.setHeader('Content-Type', 'application/json')
        router(req, res)
    })

app.listen('3000', () => {
    console.log('服务启动')
})