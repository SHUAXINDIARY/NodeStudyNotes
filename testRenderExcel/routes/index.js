var express = require('express');
const path = require("path")
const xlsx = require('node-xlsx')
const fs = require('fs')
const formidable = require('formidable')
var router = express.Router();

// 读取文件内容
let readFIle = (fileName) => {
  try {
    var obj = xlsx.parse(path.join(__dirname, `../public/files/${fileName}`));
    console.log(obj)
    var excelObj = obj[0].data
    console.log(excelObj)
  } catch (err) {
    console.log('不是Excel文件哦')
  }

}
// 存储文件
let saveFile = (req, res) => {
  const form = new formidable.IncomingForm()
  // 设置输出目录
  form.uploadDir = path.join(__dirname, '../public/files')
  // 保持同样的扩展名
  form.keepExtensions = true
  // 获取上传进度
  // form.on('progress', function (br, be) {
  //   let percent = Math.floor(br / be * 100)
  //   console.log(percent)
  // })
  // 第二个参数为接收到的数据
  form.parse(req, function (err, fields, files) {
    console.log(fields)
    console.log(files.file.path)
    let fileName = files.file.path
    let arr = fileName.split('\\')
    console.log(arr)
    readFIle(arr[arr.length - 1])
    res.send('ok')
  })
}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("ok")
});
// 获取文件
router.post('/file', (req, res, next) => {
  saveFile(req, res)
})

module.exports = router;
