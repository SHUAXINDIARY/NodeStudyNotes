const Tasks = require('../models/Tasks').Tasks

let all = []
// 返回所有数据
const getAll = () => {
    return all
}
// 查找所有数据
const findAll = async (res) => {
    let items = await Tasks.find()
    // 本地保存一份
    all = items
    let data = JSON.stringify(items)
    res.end(data)
    console.log('查找完成');
}
// 插入数据
const insert = async (str) => {
    let item = {
        _id: all.length == 0 ? 0 : all[all.length - 1].index + 1,
        // 第一条文档?index为0:index为上一条文档的index+1
        index: all.length == 0 ? 0 : all[all.length - 1].index + 1,
        text: str
    }
    await Tasks.insertMany([item])
    console.log('插入完成')
}

// 修改数据
const update = async (obj) => {
    // 先删除
    del(obj.index)
    // 在插入
    await Tasks.insertMany([obj])
    // target.text = obj.text
    console.log('更新完成')
}
// 删除一条数据
const del = async (num) => {
    Tasks.deleteOne({ index: num }, (err) => {
        if (err) {
            console.log(err)
        }
    })
    console.log('删除完成')
}
module.exports = {
    getAll,
    update,
    insert,
    del,
    findAll
}