const http = require('http')

const router = require('./route/router').router
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
    // 设置避免预请求
    // res.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER,x-requested-with,Content-Type')
    console.log(req.method)
    // 处理请求
    router(req, res)
})
server.listen('3000', () => {
    console.log('server started')
})