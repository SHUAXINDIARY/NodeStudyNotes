var express = require('express');
var router = express.Router();

let items = [{
  index: 0,
  text: '写作业',
}, {
  index: 1,
  text: '复习'
}]
let succ = {
  code: '1',
  msg: '操作成功'
}
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 更新数据
router.put('/updateData', (req, res, next) => {
  let obj = req.body
  for (let i in items) {
    if (items[i].index === obj.index) {
      items[i].text = obj.text
    }
  }
  res.json(succ)
})
// 删除数据
router.delete('/delData', (req, res, next) => {
  let str = ''
  req.on('data', chunk => {
    str += chunk
  })
  req.on('end', () => {
    let num = -1
    items.forEach((e, index) => {
      if (e.index == Number(str)) {
        num = index
      }
    })
    if (num == -1) {
      let obj = {
        code: -1,
        msg: '不存在该数据'
      }
      res.json(obj)
    } else {
      items.splice(num, 1)
      res.json(succ)
    }
  })
})
// 添加数据
router.post('/addData', (req, res, next) => {
  let str = ''
  req.on('data', chunk => {
    str += chunk
  })
  req.on('end', () => {
    let item = {
      index: items.length,
      text: str
    }
    items.push(item)
    res.json(succ)
  })
})
// 获取所有数据
router.get('/getData', (req, res, next) => {
  res.json(items)
})
module.exports = router;
