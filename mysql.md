## 语法

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
