let setup = (obj) => {
    return function router(req, res, next) {
        let method = req.method
        let url = req.url
        let target = {}
        // 判断请求类型
        for (let key in obj) {
            if (key === method) {
                target = obj[key]
                break
            }
        }
        // 调用请求方法
        for (let key in target) {
            if (url === key) {
                target[key](req, res)
                break
            }
        }
    }
}

module.exports = setup