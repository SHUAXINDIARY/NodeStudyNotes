# express改造TODO
- 使用官方的express脚手架完成前后端分离的TODO
- 页面通过自带的静态加载中间件返回，所以不用设置跨域相关

# 配置环境
>通过配置全局变量来区分生产/开发环境
```js
/** 
 * 原生写法
 * const env = process.env.NODE_ENV
*/
// express提供的api
const env = app.get('env')
if (env === 'development') {
  // 开发环境 开启日志
  console.log('开发环境');
  app.use(logger('dev'));
} else {
  // 生产环境 
  console.log('生产环境');
}
```

> 配置完成后
```shell
# 先执行(windows)
# UNIX系 NODE_ENV=development
set NODE_ENV=development
# 然后启动文件
node xxx.js
```
>集成在package.json中
- 注意&&前不能有空格,不然也会算在NODE_ENV的内容里
```json
...
"scripts": {
    "start": "set NODE_ENV=development&& nodemon ./bin/www",
    "build": "set NODE_ENV=production&& nodemon ./bin/www"
  }
...
```

# 运行
```shell
# 进入该目录
# 安装依赖
npm i
# 运行
npm start
```