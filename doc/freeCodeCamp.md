# HTML

## 一、img

    所有img元素都必须具有alt属性。alt属性内的文本用于屏幕阅读器以提高可访问性，并在图像无法加载时显示。    

    如果图像纯粹是装饰性的，则使用空alt属性是最佳做法。

## 二、a

    跳转到某个内部地方<a href="#id"></a>

## 三、radio

    <label for="indoor">
        <input id="indoor" type="radio" name="indoor-outdoor"> Indoor
    </label>

## 四、checkbox

    <label>
        <input type="checkbox" name="personality"> Energetic
    </label>

# CSS

## 一、font-family 设置字体样式:

    font-family: sans-serif;

## 二、导入谷歌字体：	

    	//放在style上面
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">

        font-family: FAMILY_NAME, GENERIC_NAME;	    //第二个为后背选项
        font-family:"Open Sans";    //如果选项中间有空格，应用“”起来

## 三、设置图像边框

    .thin-red-border {
        border-color: red;	//颜色
        border-width: 5px;	//宽度
        border-style: solid;	//样式
 	 	border-radius:10px or 50%;		//边角的弧度
    }

## 四、padding,margin

    padding:调整内边距    控制元素内容与其内容之间的空间量
    
    padding: 10px 20px 10px 20px	//上、右、下、左

    margin:调整外边距        其边框与周围元素之间的距离    可以设为负值    元素将变大

    margin: 10px 20px 10px 20px	//上、右、下、左

## 五、属性选择器设置边距

    [type='checkbox']{
        margin:10px 0px 15px 0px;
    }

## 六、em、rem、in、mm

    em和rem：相对单位，相对于父项
    in和mm：绝对单位，英寸，毫米，接近屏幕的实际测量值

## 七、！important

```
    .pink-text {
        color: pink !important; //最为重要，覆盖掉所有的声明
    }
```

## 八、创建和使用自定义变量
```
        --penguin-skin: gray;   //要创建变量，只需要在变量名前加--

        background: var(--penguin-skin);    //你可以在任何一个样式类里使用该变量  

        background: var(--penguin-skin，black); //可以设置颜色
```

## 九、text-algin:

    justify:除最后一行之外的所有文本行都与行框的左右相交
    center：使文本居中
    right:右对齐
    left:左对齐

## 十、字体加粗

    1、可以使用属性：font-weight: bold;
    2、可以是用strong标签

## 十一、字体下划线

    1、可以使用属性：text-decoration: underline
    2、可以使用u标签

## 十二、字体倾斜：

    1、可以使用属性：font-style: italic
    2、可以使用标签em

## 十三、删除线：

    1、可以使用属性font-style: italic
    2、可以使用s标签
## 十四、盒子阴影

    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    外阴影：box-shadow: X轴  Y轴  Rpx  color;

    属性说明（顺序依次对应）： 阴影的X轴(可以使用负值)    阴影的Y轴(可以使用负值)    阴影模糊值（大小）    阴影的颜色

    内阴影：box-shadow: X轴  Y轴  Rpx  color  inset;

## 十五、透明度

    opacity:~~

    值1是不透明的，根本不透明。
    值0.5是半透明的。
    值0完全透明。

## 十六、设置英文格式

    text-transform：~

    lowercase	小写
    uppercase	大写
    capitalize	不懂
    initial	    使用默认值
    inherit	    使用text-transform父元素中的值
    none	    默认值：使用原始文本

## 十七、段落行高

    line-height:~

## 十八、鼠标覆盖样式

    a:hover{~}

## 十九、position操作：

    static: HTML元素的默认定位方式

    absolute: 将对象从文档流中拖出，使用left，right，top，bottom等属性进行绝对定位。而其层叠通过z-index属性定义。绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>
    
    relative: 对象不可层叠，但将依据left，right，top，bottom等属性在正常文档流中偏移位置
    
    fixed: 元素的位置相对于浏览器窗口是固定位置, 即使窗口是滚动的它也不会移动

    口诀：

        绝对定位（absolute）位置是相对最近已经定位的父元素
        如果父元素本身没有使用position定位，则相对于文档（html）定位
    
        对定位使用通常是父级定义position:relative定位
        子级定义position:absolute绝对定位属性
        并且子级使用left或right和top或bottom进行绝对定位

## 20、改变重叠前后位置

    z-index：~










