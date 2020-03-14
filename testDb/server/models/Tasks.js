const mongoose = require('mongoose')

const Schema = mongoose.Schema

// 定义文档的数据结构
const tasksSchema = new Schema({
    index: Number,
    text: String
})
// 定义id增长格式
// tasksSchema.index({ id: 1 })

const Tasks = mongoose.model('Tasks', tasksSchema)

module.exports = {
    Tasks
}