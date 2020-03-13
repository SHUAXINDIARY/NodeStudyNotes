const http = require('http')
const path = require('path')

const formidable = require('formidable')

// 允许跨域
let allowOrigin = (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
}

let main = (req, res) => {
    // 跨域
    allowOrigin(res)
    // 获取url
    let url = req.url
    // 匹配url
    if (url === '/upFile') {
        const form = new formidable.IncomingForm()
        // 设置输出目录
        form.uploadDir = path.join(__dirname, 'img')
        // 保持同样的扩展名
        form.keepExtensions = true
        // 获取上传进度
        form.on('progress', function (br, be) {
            let percent = Math.floor(br / be * 100)
            console.log(percent)
        })
        // 第二个参数为接收到的数据
        form.parse(req, function (err, fields, files) {
            console.log(fields)
            console.log(files)
            res.end(JSON.stringify({
                msg: 'ok'
            }))
        })
    } else {
        res.end(JSON.stringify({
            msg: 'err'
        }))
    }
}

const server = http.createServer((req, res) => {
    main(req, res)
})

server.listen('3000', () => {
    console.log('已启动')
})