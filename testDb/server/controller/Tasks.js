const Tasks = require('../models/Tasks').Tasks

let all = []
// 返回所有数据
const getAll = () => {
    return all
}
// 查找所有数据
const findAll = async () => {
    let items = await Tasks.find()
    all = items
    console.log('查找完成');
}
// 插入数据
const insert = async (str) => {
    let item = {
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