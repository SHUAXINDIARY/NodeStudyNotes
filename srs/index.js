const http = require('http')
// 解析URL
const parase = require('url').parse
// 截取路径片段
const join = require('path').join
const fs = require('fs')

// 静态文件的根路径
const root = __dirname
const resFile = (req, res) => {
    if (req.url !== "/favicon.ico") {
        // 获取访问文件的尾缀 设置响应类型
        let arr = req.url.split('.')
        let type = arr[arr.length - 1]
        // 获取访问路径 
        const url = parase(req.url)
        // 获取本地路径
        const path = join(root, url.pathname)
        // 检查文件是否存在
        fs.stat(path, (err, stat) => {
            if (err) {
                if ('ENOENT' == err.code) {
                    // 文件不粗才能在
                    res.statusCode = 404
                    res.end('Not Found')
                } else {
                    // 其他错误
                    res.statusCode = 500
                    res.end('internal server error')
                }
            } else {
                // 设置响应文件类型
                res.setHeader('Content-Type', `text/${type}`)
                // 设置响应文件大小
                res.setHeader('Content-Length', stat.size)
                // 创建fs.ReadStream
                const stream = fs.createReadStream(path)
                // 管道优化数据传递 把读取的数据发送到另一个地方 内部自动结束响应  req也可以接
                stream.pipe(res)
                // 处理错误  不存在的文件或者访问路径错误
                stream.on('error', err => {
                    res.statusCode = 500
                    res.end('internal server error')
                })
            }
        })
    }
}
const server = http.createServer((req, res) => {
    resFile(req, res)
})
server.listen('3000', () => {
    console.log('server started')
})