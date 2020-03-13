# login
- 接受用户端表单输入，模拟登陆，依旧不接入数据库
- 简单起见，不做静态资源处理，后端设置一下允许跨域

>设置响应头，允许跨域
```js
...
let main=(req,res)=>{
    // 设置允许跨域的域名
    res.setHeader("Access-Control-Allow-Origin", "*")
    // 跨域允许的请求方式
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
    // 设置响应内容的类型
    res.setHeader("Content-Type", "text/json")
    res.end('ok)
}
...
```
>接受表单传递的数据
```js
const qs = require('querystring')
...
let main=(req,res)=>{
    let body = ''
    // 允许传递中文
    req.setEncoding('utf8')
    // 缓存数据
    req.on('data', chunk => {
        body += chunk
    })
    // 缓存结束
    req.on('end', () => {
        // 解析字符串成对象
        let obj = qs.parse(body)
        if (obj.name === 'shuaxin' && obj.psw === 'shuaxin') {
            res.end("成功")
        } else {
            res.end("检查账号密码是否正确")
        }
    })
}
...
```

# 效果图
![效果图](./img/one.png)

# 运行
```shell
# 进入根目录安装依赖
npm i
# 进入该项目目录运行项目
node index.js
# 打开html目录下的html文件即可
```