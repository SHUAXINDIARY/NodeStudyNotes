const until = require('../until/resStatic')

let items = [{
    index: 0,
    text: '写作业',
}, {
    index: 1,
    text: '复习'
}]
let succ = {
    code: '1',
    msg: '操作成功'
}
const router = (...rest) => {
    let req = rest[0]
    let res = rest[1]
    let method = req.method
    switch (method) {
        // 获取数据
        case 'GET':
            if (req.url === '/getData') {
                let data = JSON.stringify(items)
                res.setHeader('Content-Type', 'text/json')
                res.end(data)
            } else {
                until.resErr(res)
            }
            break;
        // 添加数据
        case 'POST':
            if (req.url === '/addData') {
                req.setEncoding('utf8')
                let str = ''
                // 获取传递的数据
                req.on('data', chunk => {
                    str += chunk
                })
                req.on('end', () => {
                    let item = {
                        index: items.length,
                        text: str
                    }
                    items.push(item)
                    res.end(JSON.stringify(succ))
                })
            } else {
                until.resErr(res)
            }
            break;
        // 修改数据
        case 'PUT':
            if (req.url === '/updateData') {
                req.setEncoding('utf8')
                let str = ''
                req.on('data', chunk => {
                    str += chunk
                })
                req.on('end', () => {
                    let obj = JSON.parse(str)
                    for (let i in items) {
                        if (obj.index == items[i].index) {
                            items[i] = obj
                        }
                    }
                    res.end(JSON.stringify(succ))
                })
            } else {
                until.resErr(res)
            }
            break;
        // 删除数据
        case 'DELETE':
            if (req.url === '/delData') {
                req.setEncoding('utf8')
                let str = ''
                req.on('data', chunk => {
                    str += chunk
                })
                req.on('end', () => {
                    let num = -1
                    items.forEach((e, index) => {
                        if (e.index == Number(str)) {
                            num = index
                        }
                    })
                    if (num == -1) {
                        let obj = {
                            code: -1,
                            msg: '不存在该数据'
                        }
                        res.end(JSON.stringify(obj))
                    } else {
                        items.splice(num, 1)
                        res.end(JSON.stringify(succ))
                    }
                })
            } else {
                until.resErr(res)
            }
            break;
        default:
            break;
    }
}
module.exports = {
    router
}