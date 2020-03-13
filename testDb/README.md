# todo-数据库版本
- 改进之前todo项目，将数据存储到mongodb
- 简化操作，去除静态服务功能，node设置响应头，域解决跨域问题
- 使用[mongoose](http://www.mongoosejs.net/)来操作 [mongodb](https://www.mongodb.com/)
# 目录
- client-前端项目
- server-后端项目

# 细节
- 设置跨域
```js
...
let main=(req,res)=>{
    // 允许访问的域名
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 允许的方法
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
}
...
```
- 做了跨域后，注意预请求

# 关于预请求
>什么是预请求
- options请求，是浏览器在我们要发送的请求之前自动发送的一个请求，为了判断服务器是否允许接下来的我们的请求
>特征
- 跨域请求的时候
- 请求方法类型为options
>什么时候会出现
- 请求类型为PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH
- 请求内容类型不为application/x-www-form-urlencoded、multipart/form-data、text/plain时
- 设置了Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width之外的头部