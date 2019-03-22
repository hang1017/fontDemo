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


