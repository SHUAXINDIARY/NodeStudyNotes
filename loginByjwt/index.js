const express = require('express')
const path = require('path');
const app = express()

// 引入路由文件
const userRouter = require("./routes/user")
const user2Router = require("./routes/user2")




app
    // 加载静态资源
    .use(express.static(path.join(__dirname, 'public')))
    // 解析表单
    .use(express.urlencoded({ extended: false }))
    // 解析json格式
    .use(express.json())
    // 路由
    .use('/user', userRouter)
    .use('/user2', user2Router)

app.listen('3000', () => {
    console.log('服务启动')
})