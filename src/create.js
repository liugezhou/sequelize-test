const {Blog,User} = require('./model')

!(async function(){
    // 创建用户
    const zhangsan = await User.create({
        userName:'liuyilan',
        password:'123456',
        nickName:'六游览'
    })
    console.log(zhangsan.toJSON())
    console.log(JSON.stringify(zhangsan,null,4))
    // const zhangsanId = zhangsan.dataValues.id
    // console.log('zhangsanId:',zhangsanId)
    // const lisi = await User.create({
    //     userName:'lisi',
    //     password:'123',
    //     nickName:'李四'
    // })
    // const lisiId = lisi.dataValues.id
    // console.log('lisiId:',lisiId)

    // const blog1 = Blog.create({
    //     title:'博客1',
    //     content:'内容1',
    //     userId:zhangsanId
    // })
    // const blog2 = Blog.create({
    //     title:'博客2',
    //     content:'内容2',
    //     userId:zhangsanId
    // })
    // const blog3 = Blog.create({
    //     title:'博客3',
    //     content:'内容3',
    //     userId:lisiId
    // })
    // const blog4 = Blog.create({
    //     title:'博客4',
    //     content:'内容4',
    //     userId:lisiId
    // })
})()