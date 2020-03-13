# 完成文件上传
使用formidable完成一个上传文件的功能

# 注意
- 上传文件时，表单的enctype要设置为multipart/form-data
- 不涉及文件上传使用application/x-www-form-urlencoded

# formidable使用
```js
// 先安装
const formidable = require('formidable')
...
let main=(req,res)=>{
    // 创建from对象
    const form = new formidable.IncomingForm()
    // 设置输出目录
    form.uploadDir = path.join(__dirname, 'img')
    // 存储时保持和上传的文件一样的扩展
    form.keepExtensions = true
    // 获取上传进度
    form.on('progress', function (br, be) {
        let percent = Math.floor(br / be * 100)
        console.log(percent)
    })
    // 接受上传的数据
    form.parse(req, function (err, fields, files) {
        // 获取到的文件内容
        console.log(files)
        res.end(JSON.stringify({
            msg: 'ok'
        }))
    })
}
...
```