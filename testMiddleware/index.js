// 处理中间件的组件
const connect = require('connect')
const app = connect()

// 引入中间件
const logger = require('./middleware/logger')
const checking = require('./middleware/checking')
const hw = require('./middleware/helloworld')
// 定义响应头
let resType = (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain;charset=utf8')
    next()
}
// 使用中间件 注意顺序 逐级调用
app
    //挂载: 当第一个参数为str时，只有url前缀匹配该字符串，才会调用该中间件 
    // 中间内部会去掉这个挂载的字符串
    .use('/test', logger(':method:url'))
    .use(resType)
    .use('/test', checking)
    // 如果路径为根路径会调用hw 否则不会
    .use(hw)

app.listen('3000', () => {
    console.log('服务启动')
})