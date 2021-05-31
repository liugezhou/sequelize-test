const Sequeslize = require('sequelize')

const config = {
    host:'localhost',
    dialect:'mysql'
}

// 线上环境，使用连接池
// config.pool = {
//     max:5, // 连接池中最大的连数量
//     min:0,
//     idle:10000 // 如果一个连接池10s之内没有被使用，则释放
// }
const seq = new  Sequeslize('koa2_weibo_db','root','liugezhou1205',config)


module.exports = seq
