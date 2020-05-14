const http = require('http')

// const until = require('./until/resStatic')
const router = require('./route/router').router
const server = http.createServer((req, res) => {
    const url = req.url
    // if (url.includes('.')) {
    //     // 响应静态文件
    //     until.resFile(req, res)
    // } else {
        // 处理请求
        router(req, res)
    // }
})
server.listen('3000', () => {
    console.log('server started')
})