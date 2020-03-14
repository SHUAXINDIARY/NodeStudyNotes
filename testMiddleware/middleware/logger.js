/**创建负责日志的中间件 */

/**第一个版本 */
// let logger = (req, res, next) => {
//     // 做一些操作
//     console.log(`url=${req.url}`)
//     console.log(`method=${req.method}`)
//     console.log('日志中间件')
//     // 传递到下一个中间件
//     next()
// }
/** 改造后的可配置版本*/
let setup = (format) => {
    // 规定日志输出信息的格式
    let regexp = /:(\w+)/g
    return function logger(req, res, next) {
        let str = format.replace(regexp, (match, pro) => {
            return req[pro]
        })
        console.log(str)
        next()
    }
}
module.exports = setup