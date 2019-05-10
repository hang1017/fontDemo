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
import moment from 'moment';

dValue = moment(dataValue, 'YYYYMMDD').format('YYYY-MM-DD');
```

### 4、外部操作公共组件

下面的代码比较便捷，灵活性高。

```js
onRef={v => (this.SearchBox = v)}
```

### 5、导出 BizCharts 图表

```js
<Chart
    height={chartHeight}
    scale={scale}
    forceFit
    data={data}
    onGetG2Instance={chartIns => {      //这才是重点
        this.chartIns = chartIns;       //可以直接参考官网-常见问题
    }}
>
```

点击导出图表事件

```js
handleSaveImg = () => {
    const { canvasWidth } = this.props;     //父组件传来的宽度
    const canvas = document.createElement('canvas');
    canvas.height = 500;
    canvas.width = canvasWidth || innerWidth;
    const ctx = canvas.getContext('2d');       //设置图表为 2D
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);    //设置填充画布的大小
    ctx.drawImage(this.chartIns.get('canvas')._cfg.el, 0, 0);   //
    var image = canvas.toDataURL('image/jpeg');     //图片路径
    var $a = document.createElement('a');           
    $a.setAttribute('href', image);
    $a.setAttribute('download', this.props.title);
    $a.click();
  };
```

## 四川全球通俱乐部

### 一、样式设置

#### 1、设置边框不同弧度

```css
border-radius:左上，右上，右下，左下
```

#### 2、颜色渐变

```css
background:linear-gradient(
    to right,
    #D3AF72 0%,
    #ECD2A0 100%,
)
```

#### 3、背景不居中、大小不合适

```css
background:url('') no-repeat center center;
background-size:100% 100%;
```

#### 4、修改底层的样式

```css
global: {
    选中className: {
        min-width: 316px!important;     //设置优先级或者替换底层代码
    }
}
```

### 二、格式设置

#### 1、图片显示

```html
<img src={require('路径')} />
```

### 三、增加文字样式包

在全局样式 `global.less` 中,添加下面的代码：

```js
@font-face 
{
    font-family:'Happy-Font',
    src:url('./assets/font/third-happy.ttf'),
}
```

之后即可在 `css` 中使用它。

### 四、React 组件间触发方法操作

#### 1、第一种方法

使用 `refs`.

在父组件上编写如下代码：

```js
onRef = (ref) => {  
    this.child=ref;
}
```

将这个方法传递给子组件，如下代码：

```js
<Collapse onRef={this.onRef}></Collapse>
```

父组件中的事件代码编写：

```js
this.child.emptyAll();  //emptyAll() 为子组件的方法，这样调用就可以直接触发子组件的方法
```

子组件的编写方式如下：

```js
componentDidMount() {
    this.props.onRef(this);
}
```

#### 2、第二种方法

子组件只需编写方法即可。

父组件：

`ref`:传递的参数代码如下：

```js
ref={(child2) => {this.child2 = child2}}>
```

在点击事件中，定义两个变量

```js
emptyAll = () => {
    this.child2.emptyAll();
    this.child1.emptyAll();
}
```













