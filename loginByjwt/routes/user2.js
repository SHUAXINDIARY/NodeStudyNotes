const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const sk = 'shuaxin'
const bcrypt = require('bcrypt')
const saltRounds = 10


let users = []

// 检测token是否有效
router.post('/testToken', (req, res, next) => {
    let obj = req.body
    // 过期后会抛异常
    try {
        // 校验token
        var decoded = jwt.verify(obj.token, sk);
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
    } catch (error) {
        res.json({
            code: -1,
            msg: 'token过期'
        })
    }

})
// 登陆
router.post('/login', (req, res, next) => {
    let obj = req.body
    for (let index in users) {
        if (users[index].name === obj.name) {
            let result = bcrypt.compareSync(obj.psw, users[index].psw)
            // 生成token  参数:(要加密的内容,秘钥,时间(s为单位))
            let token = jwt.sign(users[index], sk, { expiresIn: 10 });
            if (result) {
                res.json({
                    code: 1,
                    msg: '登陆成功',
                    token
                })
            } else {
                res.json({
                    code: -1,
                    msg: '检查账号密码是否匹配'
                })
            }
            break
        }
    }
})
// 注册
router.post('/register', (req, res, next) => {
    let obj = req.body
    // 生成salt
    const salt = bcrypt.genSaltSync(saltRounds)
    // 生成hash字符串
    const hash = bcrypt.hashSync(obj.psw, salt)
    // 检查账号是否存在
    for (let index in users) {
        if (users[index].name === obj.name) {
            res.json({
                msg: '该账号已存在'
            })
            break;
        }
    }
    // 不存在保存
    users.push({
        name: obj.name,
        psw: hash
    })
    res.json({
        msg: 'register succ'
    })
})
module.exports = router