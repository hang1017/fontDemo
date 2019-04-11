# mui 

## 一、上拉加载、下拉刷新

导入 `dropload.css`、`dropload.js`、`mui.min.js`、`common.js` 文件

```js
ApTool.dropload($('.content'),window,function(me){
    setTimeout(function(){
        me.resetload();

    },1000)
    console.log("上啦");
},function(me){
    console.log("下拉");
    setTimeout(function(){
        me.noData(true);  //无数据重置下
        me.resetload();
    },1000)
})
```

已封装好的代码。在 `common.js` 下 `ApTool.dropload` 方法中。

有时间自己尝试写一下。

## 二、搜索框取消黑色的边框

```css
outline: none;
border: none;
```

并且 input 标签中加上 `type = 'text'`

## 三、打叉按钮的样式图片路径

```html
<img src="static/img/cancel_black.png" id="close_btn" class="close-img" />
```







