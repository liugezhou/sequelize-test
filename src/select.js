const {Blog,User} = require('./model')

!(async function(){
    // 查询一条记录
    const user = await User.findOne({
        where:{
            userName:'zhangsan'
        }
    })
    // console.log('find the User is :',user.dataValues)

    // 查询特定的列
    const sepecilaCloumn = await User.findOne({
        attributes:['nickName'],
        where:{
            userName:'zhangsan'
        }
    })
    // console.log('find the User is :',sepecilaCloumn.dataValues)

    //查询一个列表
    const zhangsanBlogList = await Blog.findAll({
        where:{
            userId:2
        },
        order:[
            ['id','desc']
        ]
    })
    // console.log('zhangsanBlogList:', zhangsanBlogList.map(blog=>blog.dataValues))

    // 查询总数
    const blogListAndCount = await Blog.findAndCountAll({
        limit:2, //限制本次查询 2 条
        offset:1, // 跳过多少条
        order:[
            ['id','desc']
        ]
    })
    // console.log(
        // 'blogListAndCount:',
        // blogListAndCount.count, //所有总数
        // blogListAndCount.rows.map(blog=>blog.dataValues))

    //链表查询1
    const blogListWithUser = await Blog.findAndCountAll({
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:User,
                attributes:['userName','nickName'],
                where:{
                    userName:'lisi'
                }
            }
        ]
    })

    blogListWithUser.rows.map(blog=>{
        const blogVal = blog.dataValues
        blogVal.user = blogVal.user.dataValues
        console.log('=======',blogVal)
    })

    //链表查询2
    const userListWithBlog = await User.findAndCountAll({
        attributes:['userName','nickName'],
        include:[
            {
                model: Blog
            }
        ]
    })
    console.log(
        'userListWithBlog',
        userListWithBlog.count,
        userListWithBlog.rows.map(user =>{
            const userVal = user.dataValues
            userVal.blogs = userVal.blogs.map(blog =>blog.dataValues)
            return userVal
        })
    )
})()
