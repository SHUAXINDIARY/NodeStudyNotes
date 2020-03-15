const connect = require('connect')

const bodyParser = require('body-parser')
const app = connect()

app
    .use(bodyParser.json({ 'Content-Type': 'application/json' }))
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
        res.setHeader('Access-Control-Allow-Headers', "Content-Type")
        console.log(req.method);
        next()
    })
    .use((req, res, next) => {
        console.log(req.body)
        next()
        // let str = ''
        // req.on('data', (chunk) => {
        //     str += chunk
        // })
        // req.on('end', () => {
        //     console.log( str)
        //     next()
        // })
    })
    .use((req, res) => {
        res.end(JSON.stringify({
            msg: 'succ'
        }))
    })

app.listen('3000', () => {
    console.log('服务启动')
})