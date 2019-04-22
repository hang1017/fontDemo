# React 实际项目学习和代码规范的编写方式

## 广东移动大数据项目

### 一、数据操作

#### 1、获取对象的所有属性(循环)

```js
Object.keys(data[0]);
```

循环中可以使用如下代码：

```js
for(let i  in Object.keys(data))
```

#### 2、关于箭头函数的使用优化

尽量不要使用 `+` 来追加 `String` 字符串，可以使用如下方式：

```js
`${percent * 100}%`
```

箭头函数的优化： 

```js
tooltip={[
    'item*percent',
    (item, percent) => ({
        name: item,
        value: `${percent * 100}%`,
    }),
]}
```

#### 3、遍历优化

```js
Object.keys(res.data).forEach(key => {
    tableColumns.push({
        title: res.data[key],
        dataIndex: key,
    });
});
```

### 二、表格显示

#### 1、表头的操作

```js
if (success && pageInfoDTOList && pageInfoDTOList.length > 0) {
    pageInfoDTOList.forEach(item => {
        tableColumns.push({
            title: item.colDesc,
            dataIndex: item.colName,
        });
    });
}
```

### 2、数据的操作

```js
pagination.current = pageNum;
pagination.total = total;
pagination.pageSize = pageSize;

if (success && list && list.length > 0) {
    tableData = list;
}
this.setState({
    tableColumns,
    tableData,
    pagination,
});
```

下面的代码是公共组件的操作，只是个事例，可以有不同的修改。
```js
initData = params => {
    const { pagination, getSearch } = params;
    const tableData = {
      list: getSearch,
      pagination,
    };
    this.setState({
      tableData,
    });
};
```

### 3、日期的转化

```js
dValue = moment(dataValue, 'YYYYMMDD').format('YYYY-MM-DD');
```

### 4、外部操作公共组件

下面的代码比较便捷，灵活性高。

```js
onRef={v => (this.SearchBox = v)}
```



