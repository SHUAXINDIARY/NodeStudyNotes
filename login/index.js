const http = require('http')
const qs = require('querystring')
// 设置通用响应格式
let succ = (msg) => {
    return {
        code: 1,
        msg
    }
}
let err = (msg) => {
    return {
        code: 0,
        msg
    }
}
let allowOrigin = (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
}
let main = (req, res) => {
    res.setHeader("Content-Type", "text/json")
    // 设置跨域
    allowOrigin(res)
    if (req.url == '/login') {
        let conType = req.headers['content-type']
        // 检查提交格式是不是表单
        if (conType === 'application/x-www-form-urlencoded') {
            let body = ''
            req.setEncoding('utf8')
            req.on('data', chunk => {
                body += chunk
            })
            req.on('end', () => {
                // 解析表单传递的字符串成对象
                // let obj = qs.parse(body)
                // 通过json转换body传递的数据
                let obj = JSON.parse(body)
                if (obj.name === 'shuaxin' && obj.psw === 'shuaxin') {
                    res.end(JSON.stringify(succ('成功')))
                } else {
                    res.end(JSON.stringify(err('检查账号密码是否正确')))
                }
            })
        } else {
            res.end(JSON.stringify(err('提交格式错误')))
        }
    } else {
        res.end(JSON.stringify(err('格式错误')))
    }
}
const server = http.createServer((req, res) => {
    main(req, res)
})
server.listen('3000', () => {
    console.log('server started')
})