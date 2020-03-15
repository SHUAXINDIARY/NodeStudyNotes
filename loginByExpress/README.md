# 登录/注册
- 使用express完成前后端分离的登陆
- 使用JWT完成身份认证
- 使用bcrypt进行用户密码的加密

## 使用bcrypt进行用户密码的加密
目的：1.职业操守，开发人员不能获取用户的隐私；2.为了安全，防止被攻击拿到用户密码导致损失

### [bcrypt使用文档](https://github.com/kelektiv/node.bcrypt.js)
>工作流程
- 注册时:先根据一个(开发定义的)规则生成一个salt，然后在将这个salt和用户注册的密码进行hash后得到一个字符串并存储
- 登陆时:将之前存储的字符串和用户传递过来的密码进行对比,结果一致允许登陆，否则返回密码不对
>简单使用
```js
// 安装后
const bcrypt = require('bcrypt')
// 类似加密等级
const saltRounds=10
// 封装一下 参数为要加密的密码
// psw:string
let hash=(psw)=>{
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(psw, salt, (err, hash) => {
            // hash就是加密过后的结果
            console.log(`hash=${hash}`)
        })
    })
}
// 对比 第一个是用户输入的密码,第二个是数据库存储的加密过的密码
// psw:string hash:string
let check=(psw,hash)=>{
    bcrypt.compare(psw, hash, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // result:boolean 
            console.log(result)
        }
    })
}
```

>异步写法
参考routes的user2.js文件

## [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)完成身份验证
- 主流的身份验证机制,服务端生成token令牌,客户端保存,在之后每次请求服务端数据时,携带该令牌，服务端在收到请求后,会验证该令牌是否有效:有效?返回数据:返回提示
- 该模块就是用来生成token令牌
>简单使用
```js
const jwt = require('jsonwebtoken')
...
// 生成token
// 参数列表:(加密数据,私钥,过期时间)
let token=let token = jwt.sign({name:'shuaxin'}, 'shuaxin', { expiresIn: 10 });
// 过期后会抛出异常
try{
    // 校验token是否有效
    var decoded = jwt.verify(token, 'shuaxin');
    if (decoded) {
        res.json({
            code: 1,
            msg: '有效的token'
        })
    } else {
        res.json({
            code: -1,
            msg: 'token无效'
        })
    }
}catch(err){
// 返回过期提示
}
...
```

