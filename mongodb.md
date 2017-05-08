## 配置

- 安装（windows需要将bin目录配到环境变量）

- 启动mongodb`mongod --dbpath d:/MongoDB/Server/3.4/data/db`（将地址换成自己的，作用是配置数据库存储的地方并启动）

## 命令

- `mongo` 进入命令行模式

- `show dbs` 显示数据库列表

- `show collections` 显示当前数据库中的集合
- `show users` 显示用户
- `use <db name>` 切换当前数据库（db.createCollection('user')，就可以创建一个名叫“myTest”的数据库）
- `db.foo.find()` 对于当前数据库中的foo集合进行数据查找
- `db.foo.find( { a : 1 } )` 对于当前数据库中的foo集合进行查找，条件是数据中有一个属性叫a，且a的值为1
- `db.userInfo.find({age: {$gt: 22}});` 查询age > 22的记录
- `db.userInfo.find({age: {$lt: 22}});` 查询age < 22的记录
- `db.userInfo.find({age: {$gte: 25}});` 查询age >= 25的记录
- `db.userInfo.find({age: {$lte: 25}});` 查询age <= 25的记录
- `db.userInfo.find({age: {$gte: 23, $lte: 26}});`查询age >= 23 并且 age <= 26

- `db.userInfo.find({name: /mongo/});`查询name中包含 mongo的数据

- `db.userInfo.find({name: /^mongo/});`查询name中以mongo开头的

- `db.userInfo.find({}, {name: 1, age: 1});`查询指定列name、age数据，当然name也可以用true或false,当用ture的情况下河name:1效果一样，如果用false就是排除name，显示name以外的列信息。

- `db.userInfo.find({age: {$gt: 25}}, {name: 1, age: 1});`查询指定列name、age数据, age > 25

- `db.userInfo.find().sort({age: 1});`按照年龄排序（升序），小于0为降序

- `db.userInfo.find().limit(5);`查询前5条数据

- `db.userInfo.find().skip(10);`查询10条以后的数据

- `db.userInfo.find().limit(10).skip(5);`查询在5-10之间的数据

- `db.userInfo.find({$or: [{age: 22}, {age: 25}]});`or 查询

- `db.userInfo.findOne();`查询第一条数据

- `db.userInfo.find({age: {$gte: 25}}).count();`查询某个结果集的记录条数

- `db.userInfo.find({sex: {$exists: true}}).count();`按照某列进行排序

- `db.dropDatabase()` 删除当前使用数据库
- `db.cloneDatabase(“127.0.0.1”)` 将指定机器上的数据库的数据克隆到当前数据库
- `db.copyDatabase("mydb", "temp", "127.0.0.1")` 将本机的mydb的数据复制到temp数据库中
- `db.repairDatabase();` 修复当前数据库
- `db.getName();`查看当前使用的数据库 
- `db.stats();` 显示当前db状态
- `db.version();` 当前db版本
- `db.getMongo();` 查看当前db的链接机器地址
- `db.createCollection(“collName”, {size: 20, capped: 5, max: 100});` 创建一个聚集集合（table）
- `db.getCollection("account");` 得到指定名称的聚集集合（table）
- `db.getCollectionNames();` 得到当前db的所有聚集集合
- `db.printCollectionStats();` 显示当前db所有聚集索引的状态
- `db.addUser("userName", "pwd123", true); ` 添加一个用户，添加用户、设置密码、是否只读
- `db.auth("userName", "123123");` 数据库认证、安全模式
- `db.removeUser("userName");` 删除用户
- `db.getPrevError();` 查询之前的错误信息
- `db.resetError();` 清除错误记录
- `db.yourColl.count();` 查询当前集合的数据条数
- `db.userInfo.dataSize();` 查看数据空间大小
- `db.userInfo.getDB();` 得到当前聚集集合所在的db
- `db.userInfo.stats();` 得到当前聚集的状态
- `db.userInfo.totalSize();` 得到聚集集合总大小
- ` db.userInfo.storageSize();` 聚集集合储存空间大小
- ` db.userInfo.getShardVersion()` Shard版本信息
- `db.userInfo.renameCollection("users");` 将userInfo重命名为users
- `db.userInfo.drop();` 删除当前聚集集合
- `db.userInfo.distinct("name");` 查询去掉后的当前聚集集合中的某列的重复数据

- `db.userInfo.ensureIndex({name: 1}); db.userInfo.ensureIndex({name: 1, ts: -1});` 创建索引
- `db.userInfo.getIndexes();` 查询当前聚集集合所有索引
- `db.userInfo.totalIndexSize();` 查看总索引记录大小
- `db.users.reIndex();` 读取当前集合的所有index信息
- `db.users.dropIndex("name_1");` 删除指定索引
- `db.users.dropIndexes();`删除所有索引索引 
- `db.users.save({name: ‘zhangsan’, age: 25, sex: true});` 修改、添加、删除集合数据
- `db.collection.update(criteria, objNew, upsert, multi )` 
```
criteria:update的查询条件，类似sql update查询内where后面的

objNew:update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的。

upsert : 如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。

multi : mongodb默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
```
- `db.users.update({age: 25}, {$set: {name: 'changeName'}}, false, true);` update users set name = ‘changeName’ where age = 25;
- `db.users.update({name: 'Lisi'}, {$inc: {age: 50}}, false, true);`update users set age = age + 50 where name = ‘Lisi’;

- `db.users.update({name: 'Lisi'}, {$inc: {age: 50}, $set: {name: 'hoho'}}, false, true);`update users set age = age + 50, name = ‘hoho’ where name = ‘Lisi’;
- `db.users.remove({age: 132});`删除age=132的数据

- 查询修改删除
```
db.users.findAndModify({

    query: {age: {$gte: 25}},

    sort: {age: -1},

    update: {$set: {name: 'a2'}, $inc: {age: 2}},

    remove: true
})
```
```
db.runCommand({ findandmodify : "users",

    query: {age: {$gte: 25}},

    sort: {age: -1},

    update: {$set: {name: 'a2'}, $inc: {age: 2}},

    remove: true
})
```
