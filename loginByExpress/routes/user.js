const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

let users = []

// 进行加密 参数为要加密的字符串
let hash = (obj) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(obj.psw, salt, (err, hash) => {
            users.push({
                name: obj.name,
                psw: hash
            })
        })
    })
}
// 检查 第一个为传递过来的密码,第二个为存储的hash后的密码
let check = (strPsw, hashPsw, res) => {
    console.log(`strPsw=${strPsw},hashPsw=${hashPsw}`)
    bcrypt.compare(strPsw, hashPsw, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            if (result) {
                res.json({
                    msg: 'login succ'
                })
            } else {
                res.json({
                    msg: '密码错误'
                })
            }
        }
    })
}



// 登陆
router.post('/login', (req, res, next) => {
    let obj = req.body
    console.log(obj)
    console.log(users)
    for (let i in users) {
        if (users[i].name === obj.name) {
            // 对比
            check(obj.psw, users[i].psw,res)
            break
        }
    }
})
// 注册
router.post('/register', (req, res, next) => {
    let obj = req.body
    console.log(obj)
    // 加密存储
    hash(obj)
    res.json({
        msg: 'register succ'
    })
})
module.exports = router