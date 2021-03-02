import * as express from 'express'
import * as path from 'path'
// 解决tsc启动获取不到process.env问题
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()

// module.exports = app
export default app
import './main'

const resolve = dir => path.resolve(__dirname, dir)
// 代理admin静态资源
app.use('/admin/static', express.static(resolve('../admin/static')))
// 代理admin ico秃瓢
app.use('/admin/favicon.ico', express.static(resolve('../admin/favicon.ico')))

// 代理index 静态资源
app.use('/index/static', express.static(resolve('../index/static')))
// 代理index ico秃瓢
app.use('/index/favicon.ico', express.static(resolve('../index/favicon.ico')))
