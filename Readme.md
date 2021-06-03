### Introduce
> 本deomo项目主要为sequlize操作mysql数据库基本操作，以及redis的简单配置操作。

### Initial
> npm init -y 
> npm i sequelize mysql2 redis -s

### Content
> src下文件为sequlize操作mysql数据库的基础代码演示。  
> src/seq.js:通过mysql地址、用户名、密码等配置生成一个sequelize实例，供其他模块调用。 
> src/model.js:创建表模型，通过sequelize实例、以数据库表为基创建模型(model)，模型(model)用来数据库增删改查的操作。  
> src/sync.js: 引入创建的model，直接在数据库中生成相应的表。  
> src/create.js：添加数据-[Model].create 
> src/delete.js: 删除数据-[Model].destroy
> src/update.js: 删除数据-[Model].update 
> src/select.js: 删除数据-[Model].findOne | findAll | findAndCountAll 

> src/conf/dn.js: redis 地址与port常量。
> src/cache/_redis.js :创建客户端，封装set与get

### 笔记
#### 介绍
> Sequelize是 一个基于promise的Node.js ORM(Object Relation Mapping),目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。   
>  支持 Node v10 及更高版本以便使用 ES6 功能。

#### 入门
> 安装： npm i --save sequelize 
> npm i --save mysql2

#### 连接到数据库
```
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
```

#### 测试连接
```
const seq = require('./seq')

// 测试链接
seq.authenticate().then(()=>{
    console.log('auth ok')
}).catch(()=>{
    console.log('auth err')
})
```

#### 新建数据库
> + ./model.js  
> + ./sync.js

#### 模型基础
>  模型是Sequelize的本质，模型是代表数据库中表的抽象，在Sequelize中，它是一个Model的扩展类。    
> Sequelize中的模型有一个名称，此名称不必与它在数据库中表的名称相同，通常，模型具有单数名称(例如，User)，而表具有复数名称(Users),当然这是完全可配置的。 

#### 模型定义
> 在Sequlize中 可以用两种等效的方式定义模型
> + 调用sequelize.define('modelName,attributes,options)  
> + 直接告诉sequelize表名称 ：sequelize.define('user',{},{tableName:'Employees'})

#### 模型同步
> 通过model.sync(options)调用，Sequelize将自动对数据库执行SQL查询   
> + User.sync() -- 如果表不存在，则创建该表(如果存在，不执行任何操作)
> + User.sync({force:true}) -- 将创建表，如果已经存在，则将其删除再创建 
> + User.sync({alter:true}) -- 检查数据库中表的当前状态，在表中进行必要的更改以使其与模型匹配。 
> + seq.sync({force:true}) --   一次性自动同步所有模型。

#### 删除表
> + await User.drop() 
> + await sequelize.drop()

#### 创建实例
> 尽管模型是一个类,但是你不应直接使用 new 运算符来创建实例. 相反,应该使用 build 方法。  
> build方法仅创建一个对象，该对象表示可以映射到数据库的数据。   
> 为了将这个实例真正保存在数据库中，应使用save方法。    

> Sequelize提供了create方法，该方法将上述的build和save方法合并为一个方法。

#### 删除实例
> const user = await User.detroy({where:{id:1}})

#### 简单的insert操作
> conse liugezhou = User.create({firstName:'Liu',lastName:'zhou'})

#### 简单的select查询
```
const users = await User.findAll();
console.log(users.every(user => user instanceof User)); // true
console.log("All users:", JSON.stringify(users, null, 2));
```

#### select查询特定属性
> 选择某些特定属性，可以使用attributes参数
>
> + Model.findAll({attributes:['foo', [ 'bar','baz'], 'qux']})    
> SELECT foo, bar AS baz, qux FROM ...  
>
> + Model.findAll({attributes:{exclude: ['baz']}})  
>  SELECT id, foo, bar, qux FROM ...

#### 应用where语句
> const { Op } = require('sequelize)
> where 参数用于过滤查询,where子句有很多运算符，可以从`Op`中以Symbols的形式使用。
> + Model.findAll({where:{id:1,name:'liugezhou'}})  
> + Model.findAll({where:{[Op.or]:{id:2,username:'liugezhou'}}})    
> + Model.findAll({where:{[Op.or]:{level:2,level:3}}})   => Model.findAll({where:{level:{[Op.or]:[2,3]}}})

#### 操作符
> Sequelize提供了多种运算符。
> + [Op.and]: [{a:3},{b:6}]   //(a = 3) AND (b = 6)
> + [Op.or] : [ {a:3}, {b:2}]  // (a = 3) OR (b = 2)
> someaAttribute:
> + [Op.eq] : 3                  // =3
> + [Op.ne] : 20                //!=20
> + [Op.is] :null                 // IS NULL
> + [Op.not]: true              // IS NOT TRUE
> + [Op.or] :[5,6]               // (someAttribute = 5) OR (someAttribute = 6)   
> + [Op.gt] :6                   // >6   
> + [Op.gte] : 6                // >=6  
> + [Op.lt] : 6                   // < 6
> + [Op.lte] : 6                 // <=6 
> + [Op.between] : [6,10]   // BETWEEn 6 AND 10
> + [Op.notBetween] : [6,10]   // NOT BETWEEn 6 AND 10  
> + [Op.in] : [1,2]               // IN [1,2]      简写：where : {id:[2,3]}
> + [Op.notIn] : [1,2]          // NOT in [1,2] 
> + [Op.like] : '%hat'          // LIKE '%hat'  
> + [Op.notLike] : '%hat'          // NOT LIKE '%hat'  

#### 排序
> Sequelize提供了 order 和 group参数，来与 ORDER BY 和 GROUP BY 一起使用。

```
Subtask.findAll({
  order: [
    // 将转义 title 并针对有效方向列表进行降序排列
    ['title', 'DESC'],

    // 将按最大年龄进行升序排序
    sequelize.fn('max', sequelize.col('age')),

    // 将按最大年龄进行降序排序
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],

    // 将按 otherfunction(`col1`, 12, 'lalala') 进行降序排序
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],

    // 将使用模型名称作为关联名称按关联模型的 createdAt 排序.
    [Task, 'createdAt', 'DESC'],

    // 将使用模型名称作为关联名称通过关联模型的 createdAt 排序.
    [Task, Project, 'createdAt', 'DESC'],

    // 将使用关联名称按关联模型的 createdAt 排序.
    ['Task', 'createdAt', 'DESC'],

    // 将使用关联的名称按嵌套的关联模型的 createdAt 排序.
    ['Task', 'Project', 'createdAt', 'DESC'],

    // 将使用关联对象按关联模型的 createdAt 排序. (首选方法)
    [Subtask.associations.Task, 'createdAt', 'DESC'],

    // 将使用关联对象按嵌套关联模型的 createdAt 排序. (首选方法)
    [Subtask.associations.Task, Task.associations.Project, 'createdAt', 'DESC'],

    // 将使用简单的关联对象按关联模型的 createdAt 排序.
    [{model: Task, as: 'Task'}, 'createdAt', 'DESC'],

    // 将由嵌套关联模型的 createdAt 简单关联对象排序.
    [{model: Task, as: 'Task'}, {model: Project, as: 'Project'}, 'createdAt', 'DESC']
  ],

  // 将按最大年龄降序排列
  order: sequelize.literal('max(age) DESC'),

  // 如果忽略方向,则默认升序,将按最大年龄升序排序
  order: sequelize.fn('max', sequelize.col('age')),

  // 如果省略方向,则默认升序, 将按年龄升序排列
  order: sequelize.col('age'),

  // 将根据方言随机排序(但不是 fn('RAND') 或 fn('RANDOM'))
  order: sequelize.random()
});

Foo.findOne({
  order: [
    // 将返回 `name`
    ['name'],
    // 将返回 `username` DESC
    ['username', 'DESC'],
    // 将返回 max(`age`)
    sequelize.fn('max', sequelize.col('age')),
    // 将返回 max(`age`) DESC
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],
    // 将返回 otherfunction(`col1`, 12, 'lalala') DESC
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],
    // 将返回 otherfunction(awesomefunction(`col`)) DESC, 这种嵌套可能是无限的!
    [sequelize.fn('otherfunction', sequelize.fn('awesomefunction', sequelize.col('col'))), 'DESC']
  ]
});
```

#### 分组
> Project.findAll({ group: 'name' });  // 生成 'GROUP BY name'

#### 限制和分页
> 使用limit和offset参数可以进行限制/分页

#### 实用方法
> count  | max | min | sum

#### 模型查询(查找器)   
> + findAll  
> + findbyPk    
> + findOne 
> + findOrCreate
> + findAndCountAll