const taskCon = require('../controller/Tasks')

const resErr = (res) => {
    // 其他错误
    res.statusCode = 500
    res.end('internal server error')
}
let succ = {
    code: '1',
    msg: 'success'
}
const router = (...rest) => {
    let req = rest[0]
    let res = rest[1]
    let method = req.method
    switch (method) {
        // 获取数据
        case 'GET':
            if (req.url === '/getData') {
                taskCon.findAll(res)
            } else {
                resErr(res)
            }
            break;
        // 添加数据
        case 'POST':
            if (req.url === '/addData') {
                let str = ''
                // 获取传递的数据
                req.on('data', chunk => {
                    str += chunk
                })
                req.on('end', () => {
                    taskCon.insert(str)
                    res.end(JSON.stringify(succ))
                })
            } else {
                resErr(res)
            }
            break;
        // 修改数据
        case 'PUT':
            if (req.url === '/updateData') {
                let str = ''
                req.on('data', chunk => {
                    str += chunk
                })
                req.on('end', () => {
                    let obj = JSON.parse(str)
                    taskCon.update(obj)
                    res.end(JSON.stringify(succ))
                })
            } else {
                resErr(res)
            }
            break;
        // 删除数据
        case 'DELETE':
            if (req.url === '/delData') {
                let str = ''
                req.on('data', chunk => {
                    str += chunk
                })
                req.on('end', () => {
                    taskCon.del(str)
                    res.end(JSON.stringify(succ))
                })
            } else {
                resErr(res)
            }
            break;
        default:
            res.end('ok')
            break;
    }
}
module.exports = {
    router
}