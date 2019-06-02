# 登录页全流程教学文档

## 介绍

本教程介绍的是用 React 实现：登录页获取验证码，并对验证码页做倒数计时，不可点击。

倒数一到，切换为可点击状态。

## 画出静态页面

这个可以很简单，就不做教学。

## 流程

- 1、点击获取验证码
- 2、若获取验证码成功则，按钮显示倒计时的文字
- 3、并且设置按钮不可点击
- 4、等倒计时结束后，切换按钮文字，并且按钮可以点击
- 5、若验证码获取失败，则不进去倒计时状态

### 一、验证码点击事件

可以先做个正则判断，此正则为百度获取的，若有更好的，可以改变。

```js
getCheckNum = () => {
    const { phoneNum } = this.state;
    if((/^1[3|4|5|8][0-9]\d{4,8}$/.test(phoneNum))){
        this.props.dispatch({
            type:'login/getCheckNum',
            payload:{
                phoneNum,
            },
        })
    }else {
        Toast.info('手机号输入错啦！请重新输入！', 1);
    }
}
```

正则判断成功后，就走后台接口，获取验证码。

### 二、`model` 层异步操作

#### 1、`state` 初始化数据

```js
namespace: 'login',

state:{
    verificationBtn:10,
}
```

#### 2、`effects` 调取接口

一般我们调取接口后，后台会传递一个获取成功与否的判断。这里以 `result === 0` 为例

```js
let login = yield select(_ => _.login);

if(result !== '0') {
    Toast.info('验证码获取失败~',100);
    setTimeout(() => {
        Toast.hide();
    }, 1000);
    }else{
    login.verificationBtn = 1;
    yield put({
        type:'save',
        payload:{login}
    })
}
```

#### 3、`reducers` 同步数据

```js
save(state, action) {
    return {
    ...state,
    ...action.payload,
    };
},
```

至此，我们就已经把获取验证码成功做了 `verificationBtn === 1` 的标识。

### 三、page 页面操作

这里我们需要用到 `componentWillReceiveProps()` 为周期函数。

作用：当 `this.props` 数据发生变化时，执行此操作。

下面的代码要区别一下两个 `verificationBtn` 一个是从 `model` 层传递过来的数据，一个是对按钮做点击与否的判断，两个不要混淆了。

```js
state = {
    verification:'获取验证码',  //按钮显示的文字
    verificationBtn:false,
};

componentWillReceiveProps() {
    const { login:{ verificationBtn }} = this.props;    //这个 verificationBtn 是从后台获取到的数据
    if(verificationBtn === 1) {
        console.log(1);
        this.setState({verificationBtn:true})   //这里的 verificationBtn 是对按钮做点击与否的判断
        let i = 10;
        this.o = setInterval(() => {    
        this.setState({
            verification:'已发送'+i+'S',    //一秒钟改变按钮文字一次
        })
        i--;
        if(i === -1){
            clearInterval(this.o);      //清除定时器
            this.setState({
            verification:'获取验证码',
            })
            this.props.dispatch({
            type:'login/changeVerificationBtn',     //修改 model 的verificationBtn 标识
            })
            this.setState({verificationBtn:false})  //设置按钮可点击
        }
        }, 1000);
    }
}

render(){
    const { verification } = this.state;
    return (
        <div><button>{verification}</button></div>
    )
}
```

### 四、model 层修改 `verificationBtn` 标识

```js
*changeVerificationBtn({ payload }, { call, put, select }){
    let login = yield select(_ => _.login);
    login.verificationBtn = 0;
    yield put({
    type:'save',
    payload:{login}
    })
}
```

### 五、小 tip

如果你有使用到 `antd-moblie` 的弹框进行：输入手机号获取验证码的操作，那么可能你会出现这种情况：弹框上显示的 `state` 文字不会发生改变。

我们可以使用 `ref={this.myRef}` 来操作，将这个属性添加到弹框的按钮 `button` 上。

按钮的 `disable` 属性好像也不太行。

所以我们将 `state` 里的判断放到点击事件中。 

```js
let timer = null;       //这个可以写在全局中
if(!verificationBtn) {
    if((/^1[3|4|5|8][0-9]\d{4,8}$/.test(phoneNumInput))) {
        this.setState({
          verificationBtn: true,
        })
    }
    let maxTime = 10;
    timer = setInterval(() => {
        let timeTip = '';
        if(maxTime > 0) {
            maxTime--;
            timeTip = '等待('+maxTime+'s)';
        }else {
            timeTip = '获取验证码';
            this.setState({
              verificationBtn:false,
            })
            clearInterval(timer);       //这个很重要，记得要清掉
        }
        if(this.myRef && this.myRef.current && this.myRef.current.innerText) {
            // if()中的属性都可以通过 console 看一下数据
            this.myRef.current.innerText = timeTip;
        }
    },1000)
}
```



