let checking = (req, res, next) => {
    if (req.url === '/') {
        next()
    } else {
        res.end('身份验证失败')
    }
}
module.exports =checking
