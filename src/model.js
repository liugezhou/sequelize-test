const Sequeslize = require('sequelize')
const seq = require('./seq')

// 创建User模型，表名为Users
const User = seq.define('user',{
    //id自动创建且主键盘、自
    userName:{
        type:Sequeslize.STRING,//varvchar(255)
        allowNull:false
    },
    password:{
        type:Sequeslize.STRING,
        allowNull:false
    },
    nickName:{
        type:Sequeslize.STRING,
        comment:'昵称'
    }
    //自动创建 createdAt 和 updateAt
},{
    tableName:'person'
})

// 创建Blog类型
// 创建User模型，表名为Users
const Blog = seq.define('blog',{
    //id自动创建且主键盘、自
    title:{
        type:Sequeslize.STRING,//varvchar(255)
        allowNull:false
    },
    content:{
        type:Sequeslize.TEXT,
        allowNull:false
    },
    userId:{
        type:Sequeslize.INTEGER,
        comment:'user的id'
    }
    //自动创建 createdAt 和 updateAt
},{
    tableName:'articles'
})

Blog.belongsTo(User,{
    foreignKey: 'userId'
})

User.hasMany(Blog,{
    foreignKey: 'userId'
})


// Blog.belongsTo(User)


module.exports = {
    User,
    Blog
}