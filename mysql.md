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
//SELECT column_name(s)
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

```
