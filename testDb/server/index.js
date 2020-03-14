const http = require('http')

const router = require('./route/router').router
const db = require('./database/db')
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
    res.setHeader('Content-Type', 'text/json')
    // 简易路由
    router(req, res)
    // 链接数据库
    db.start()
})
server.listen('3000', () => {
    console.log('server started')
})