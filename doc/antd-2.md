# 流浪猫狗前端文档

## 卡片布局

hoverable：覆盖扶起的状态

文字列：

```html
<Row>
    <Col span={6} offset={2}>detail:</Col>
    <Col span={16} >{this.props.detail.detail}</Col>
</Row>
```

循环卡片：

```html
{
    details.map((item, index) => (
        <div key={index}>
            <DogCard detail={item}/>
        </div>
    ))
}
```

### 弹出框

```html
<Modal 
    title="用户登录"
    visible={this.props.loginMedalState}
    onCancel={this.props.handleCancel}
    // onOk={this.props.handleOk}
    footer={null}
>
```
visible:显示或隐藏

footer={null}：为底部内容的隐藏

onCancel：取消按钮，隐藏弹出层

## 表单

先给几个基本的表单样式，可以自行修改

```js
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

const tailItemLayout = {
    wrapperCol: {
        xs: {
            span:24,
            offset:0
        },
        sm: {
            span:18,
            offset:3
        }
    }
}
```html
<Form {...formItemLayout} onSubmit={this.handleSubmit}>
    <Form.Item
        label='账号'
    >
        {getFieldDecorator('account',{
            rules:[{required:true,message: 'please enter your account!'}]
        })(
            <Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Account"
            />
        )}
    </Form.Item>
<Form>
```

记得在封装上高阶组件

```js
const LoginModalDiv = Form.create({ name: 'login' })(LoginModal);
```

## 抽屉

```js
<Drawer
    visible = {this.props.showUserModalState} 
    width = {450}
    onClose = {this.props.onClose}
    title = "我的求助帖"
    placement="right"
>
```

## 子-父组件传值

1、父组件写一个方法

2、子组件写一个方法(带上参数)

3、子方法中写下如下的代码，即可实现向父组件传值

```js
this.props.showFindSubmit(values);
```







