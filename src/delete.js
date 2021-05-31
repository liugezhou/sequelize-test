const { User } = require('./model')

!(async function(){
    const user = await User.destroy({
        where:{
            id:1
        }
    })
    console.log(user)
})()