const mongoose = require('mongoose')
const url = 'mongodb://localhost/todo'

const start = () => {
    // 后面的配置不配会报waring，作用大概就是使用mongoose最新的解析语法一类
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    const db = mongoose.connection
    // 链接数据库
    db.once('open', () => {
        console.log('链接成功')
    })
    // 连接失败  重新连接
    db.on('error', (err) => {
        console.log('连接失败')
        mongoose.disconnect()
    })
    // 断开链接 自动重连
    db.on('close', () => {
        mongoose.connect(url, { server: { useUnifiedTopology: true } })
    })
}

module.exports = {
    start
}