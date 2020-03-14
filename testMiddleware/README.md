# 学习node的connect
学习中间件机制，和中间件该如何使用

# 实例
```js
const connect = require('connect')
const app = connect()

// 响应请求的中间件
let hi=(req,res)=>{
    res.end('hi)
}
// 使用中间件
app.use(hi)

app.listen('3000',()=>{
    console.log('服务启动‘)
})
```

# 使用场景
>处理重复的操作
- resType函数-统一定义响应头
>记录日志
- logger文件:打印日志
>做程序的登陆认证
- checking文件:根据请求url判断----是，根路径，调用next继续执行后面的中间件；不是，阻止中间件执行，并返回对应信息

# 创建可配置的中间件组件
对logger中间件进行改造,通过闭包函数实现
```js
/**创建负责日志的中间件 */
// 接受需要输出的格式，
let setup = (format) => {
    // 优化中间件的逻辑
    let regexp = /:(\w+)/g
    return function logger(req, res, next) {
        // 真实调用的中间件
        let str = format.replace(regexp, (match, pro) => {
            return req[pro]
        })
        console.log(str)
        next()
    }
}
module.exports = setup
```

