## 语法

- 连接MySQL
`mysql -P 数据库端口 -h 主机地址 -u 用户名 －p 用户密码`

- 创建数据表

```mysql
CREATE TABLE My(
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30),
  date TIMESTAMP
)
```

NOT NULL - 每一行都必须含有值（不能为空），null 值是不允许的。

DEFAULT value - 设置默认值

UNSIGNED - 使用无符号数值类型，0 及正数

AUTO INCREMENT - 设置 MySQL 字段的值在新增记录时每次自动增长 1

PRIMARY KEY - 设置数据表中每条记录的唯一标识。 通常列的 PRIMARY KEY 设置为 ID 数值，与 AUTO_INCREMENT 一起使用。

- 插入

```mysql
INSERT INTO My(name,email)
VALUES('w','w@email.com');
INSERT INTO My(name,email)
VALUES('y','y@email.com');
```

- 读取

```mysql
SELECT id name email FROM My;

SELECT * FROM My WHERE name='w';

SELECT * FROM My ORDER BY name;
// SELECT column_name(s)
//FROM table_name
//ORDER BY column_name(s) ASC|DESC

```

- Update

```mysql
UPDATE My SET name='q', email='q@email.com' WHERE name='w' AND email='w@email.com';


//UPDATE table_name
//SET column1=value, column2=value2,...
//WHERE some_column=some_value

```

- 删除

```mysql
DELETE FROM My WHERE name='w';


//DELETE FROM table_name
//WHERE some_column = some_value

delete

1、delete是DML，执行delete操作时，每次从表中删除一行，并且同时将该行的的删除操作记录在redo和undo表空间中以便进行回滚（rollback）和重做操作，但要注意表空间要足够大，需要手动提交（commit）操作才能生效，可以通过rollback撤消操作。
2、delete可根据条件删除表中满足条件的数据，如果不指定where子句，那么删除表中所有记录。
3、delete语句不影响表所占用的extent，高水线(high watermark)保持原位置不变。

truncate

1、truncate是DDL，会隐式提交，所以，不能回滚，不会触发触发器。
2、truncate会删除表中所有记录，并且将重新设置高水线和所有的索引，缺省情况下将空间释放到minextents个extent，除非使用reuse storage。不会记录日志，所以执行速度很快，但不能通过rollback撤消操作（如果一不小心把一个表truncate掉，也是可以恢复的，只是不能通过rollback来恢复）。
3、对于外键（foreignkey ）约束引用的表，不能使用 truncate table，而应使用不带 where 子句的 delete 语句。
4、truncatetable不能用于参与了索引视图的表。

drop

1、drop是DDL，会隐式提交，所以，不能回滚，不会触发触发器。
2、drop语句删除表结构及所有数据，并将表所占用的空间全部释放。
3、drop语句将删除表的结构所依赖的约束，触发器，索引，依赖于该表的存储过程/函数将保留,但是变为invalid状态。

```

- 修改密码
`mysqladmin -u用户名 -p旧密码 password 新密码`
- 增加新用户

增加一个用户test1密码为abc，让他可以在任何主机上登录，并对所有数据库有查询、插入、修改、删除的权限

`grant select,insert,update,
delete on *.* to test2@localhost identified by \"abc\";`
- 创建数据库

`create database name`
- 选择数据库
`use databasename;`
- 直接删除数据库
`drop database name`
-  显示表
`show tables;`
- 表的详细描述
`describe tablename;`
- 去除重复字段
`select 中加上distinct`
- 删除数据库
`mysqladmin drop database name`
- 显示当前mysql版本和当前日期
`select version(),current_date;`
- 修改mysql中root的密码
```
mysql> update user set password=password(”xueok654123″) where user=’root’;
mysql> flush privileges //刷新数据库
mysql>use dbname； 打开数据库：
mysql>show databases; 显示所有数据库
mysql>show tables; 显示数据库mysql中所有的表：先use mysq
mysql>describe user; 显示表mysql数据库中user表的列信息）
```
- 备份数据库
`mysqldump -h host -u root -p dbname >dbname_backup.sql`

- 恢复数据库
`mysqldump -h host -u root -p dbname < dbname_backup.sql`

- 重命名表
`alter table t1 rename t2;`

- 想卸出建表
`mysqladmin -u root -p -d databasename > a.sql`
- 卸出插入数据的sql命令，而不需要建表命令
`mysqladmin -u root -p -t databasename > a.sql`
- 只想要数据，不想要sql命令
`mysqldump -T./ phptest driver`
- 将建表语句提前写在sql.txt中
`mysql -h myhost -u root -p database < sql.txt`
- 重启
`net stop mysql` `net start mysql`
- 删除表
`drop table tablename;`

- 修改表结构
```
#表position增加列test
alter table position add(test char(10));
#表position修改列test
alter table position modify test char(20) not null;
#表position修改列test默认值
alter table position alter test set default 'system';
#表position去掉test默认值
alter table position alter test drop default;
#表position去掉列test
alter table position drop column test;
#表depart_pos删除主键
alter table depart_pos drop primary key;
#表depart_pos增加主键
alter table depart_pos add primary key PK_depart_pos (department_id,position_id);
```

- 插入表
`insert into department(name,description) values('系统部','系统部');`

- 显示表的结构
`DESCRIBE MYTABLE;`

- 清空表
`delete from MYTABLE;`

- 查询时间
`select now();`

- 查询当前用户
`select user();`

- 查询数据库版本
`select version();`
- 查询当前使用的数据库
`select database();`
- 删除student_course数据库中的students数据表
`rm -f student_course/students.*`
- 备份数据库：(将数据库test备份)
`mysqldump -u root -p test>c:\test.txt`
- 备份表格
`mysqldump -u root -p test mytable>c:\test.txt`
- 创建临时表
`create temporary table zengchao(name varchar(10));`
- 创建表是先判断表是否存在
`create table if not exists students(……);`
- 复制表
`create table table2 select * from table1;`
- 复制表的结构
`create table table2 select * from table1 where 1<>1;`
- 创建索引
```
alter table table1 add index ind_id (id);
create index ind_id on table1 (id);
create unique index ind_id on table1 (id);//建立唯一性索引
```
- 删除索引
```
drop index idx_id on table1;
alter table table1 drop index ind_id;
```
- 
``



``
- 
``
- 
``
- 

