let app = new Vue({
    el: '#app',
    data() {
        return {
            name: 'todo',
            items: [],
            input: "",
            update: {
                index: 0,
                text: ''
            },
            toggle: false,
            showAdd: false
        }
    },
    methods: {
        hint() {
            let res = confirm('确定吗?')
            console.log(res)
            return res
        },
        // 修改
        updateItem() {
            if (this.hint) {
                let _this = this
                fetch('http://localhost:3000/updateData', {
                    method: 'PUT',
                    body: JSON.stringify(_this.update)
                })
                    .then((res) => {
                        // 解析接收到的json格式数据 转换成对象
                        return res.json()
                    })
                    .then(data => {
                        alert('修改完成')
                        _this.initData()
                        _this.toggle = false
                    })
            }
        },
        // 删除数据
        del(item) {
            if (this.hint()) {
                let _this = this
                fetch('http://localhost:3000/delData', {
                    method: 'DELETE',
                    body: item.index
                })
                    .then((res) => {
                        // 解析接收到的json格式数据 转换成对象
                        return res.json()
                    })
                    .then(data => {
                        alert('删除成功')
                        _this.initData()
                    })
            }
        },
        // 添加数据
        addItem() {
            let _this = this
            console.log(_this.input)
            fetch('http://localhost:3000/addData', {
                method: 'POST',
                body: _this.input
            })
                .then((res) => {
                    // 解析接收到的json格式数据 转换成对象
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    alert('添加成功')
                    _this.initData()
                    _this.input = ''
                    _this.showAdd = false
                })
        },
        // 初始化数据
        initData() {
            fetch('http://localhost:3000/getData', {
                method: 'GET'
            })
                .then((res) => {
                    // 解析接收到的json格式数据 转换成对象
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    this.items = data
                })
        }
    },
    mounted() {
        this.initData()
    }
})