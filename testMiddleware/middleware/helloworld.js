// 创建一个负责响应请求的中间件
let helloWorld = (req, res) => {
    res.end('身份证验证通过')
}
module.exports = helloWorld
