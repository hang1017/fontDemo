import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Button,Layout,Typography,Carousel,Card,Row, Col,Modal,Input,Form,Icon,Checkbox,Drawer,InputNumber } from 'antd';

const {Text} = Typography;
const {Header, Content,} = Layout;
const {TextArea} = Input;

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

const OneButtonLayout = {
    wrapperCol:{
        xw: {
            span:24,
            offset:0
        },
        sm: {
            span:10,
            offset:10
        }
    }
}

class UserDetailsModal extends React.Component{

    render(){
        return(
            <div>
                <Drawer
                    visible = {this.props.showUserModalState} 
                    width = {450}
                    onClose = {this.props.onClose}
                    title = "我的求助帖"
                    placement="right"
                >
                    <div>
                        {
                            this.props.userDetails.map((item,index) =>(
                                <DogCard key={index} detail = {item} />
                            ))
                        }
                        
                    </div>
                </Drawer>
            </div>
        )
    }
}

class ShowFindModal extends React.Component{

    showFindSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(err){
                console.log(err);
            }else{
                this.props.showFindSubmit(values);
            }
        })
    }

    render(){

        const {getFieldDecorator} = this.props.form;

        return(
            <div>
                <Drawer 
                    visible={this.props.showFindModalState}
                    width={600}
                    onClose={this.props.onClose}
                    placement="left"
                    title="一起寻找小伙伴吧！"
                >
                    <div>
                        <Form {...formItemLayout} onSubmit={this.showFindSubmit}>
                            <Form.Item
                                label="PetName"
                            >
                                {getFieldDecorator('name',{
                                    rules:[{required:true,message:"please enter your pet name~"}]
                                })(
                                    <Input  />
                                )}
                            </Form.Item>
                            <Form.Item
                                label="PetAge"
                            >
                                {getFieldDecorator('age',{
                                    rules:[{required:true,message:"please enter your pet age~"}]
                                })(
                                    <InputNumber min={0} max={100} />,
                                )}
                            </Form.Item>
                            <Form.Item
                                label="PetDetail"
                            >
                                {getFieldDecorator('detail',{
                                    rules:[{required:true,message:'please enter your detail~'}]
                                })(
                                    <TextArea rows={6}/>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="PhoneNumber"
                            >
                                {getFieldDecorator('phone',{
                                    rules:[{required:true,message:'you need make sure we can find you~'}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item
                                label="LosingAddr"
                            >
                                {getFieldDecorator('addr',{
                                    rules:[{required:true,message:'pelase enter your pet losing address~'}]
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                            <Form.Item {...OneButtonLayout}>
                                    <Button htmlType="submit" type="primary" size="large">提交</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Drawer>
            </div>
        )
    }
}

class LoginModal extends React.Component{

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(err){
                return;
            }else{
                this.props.handleSubmit(values);
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Modal 
                    title="用户登录"
                    visible={this.props.loginMedalState}
                    onCancel={this.props.handleCancel}
                    // onOk={this.props.handleOk}
                    footer={null}
                >
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
                    <Form.Item
                        label='密码'
                    >
                        {getFieldDecorator('pwd',{
                            rules:[{required:true,message: 'please enter your password!'}]
                        })(
                            <Input 
                                type="password"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item {...tailItemLayout}>
                        {getFieldDecorator('remember',{
                            valuePropName:'checked',
                            initialValue:false,
                        })(
                            <Checkbox>remember me</Checkbox>
                            
                        )}
                           <a href="#" className="login_form_forgot" >Forgot password</a> 
                    </Form.Item>
                    <Form.Item {...tailItemLayout}>
                        <div className="login_form_button_div">
                            <Button className="login_form_button">注册</Button>     
                            <Button htmlType="submit" className="login_form_button" type="primary">登录</Button>  
                        </div>   
                    </Form.Item>
                </Form>
                </Modal>
            </div>
        )
    }
}

class DogCard extends React.Component{

    render(){
        return(
            <div className="dc_main">
                <Card className="dc_card"
                    hoverable
                > 
                <div className="dc_all">
                    <div>
                        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                    <div className="dc_right">
                        <Row>
                            <Col span={6} offset={2}>Name:</Col>
                            <Col span={16} >{this.props.detail.name}</Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={2}>Master:</Col>
                            <Col span={16} >{this.props.detail.uname}</Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={2}>Age:</Col>
                            <Col span={16} >{this.props.detail.age}</Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={2}>phone:</Col>
                            <Col span={16} >{this.props.detail.phone}</Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={2}>address:</Col>
                            <Col span={16} >{this.props.detail.address}</Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={2}>detail:</Col>
                            <Col span={16} >{this.props.detail.detail}</Col>
                        </Row>
                    </div>
                </div>
                </Card>
                
            </div>
        )
    }
}

class FindDog extends React.Component{

    constructor(){
        super();
        this.state = {
            loginMedalState :false,
            showFindModalState:false,
            showUserModalState:false,
            userName:'未登录',
            flag : false,
            userDetails:[],
            details:[{
                "name":"dog1",
                "age":"15",
                "detail":"黑黑的",
                "address":"中海寰宇天下",
                "phone":"1234567",
                "uname":"hang1"
            },{
                "name":"dog2",
                "age":"15",
                "detail":"白白的",
                "address":"中海寰宇天下",
                "phone":"1234567890",
                "uname":"hang1"
            },{
                "name":"dog3",
                "age":"15",
                "detail":"白白的",
                "address":"中海寰宇天下",
                "phone":"1234567890",
                "uname":"hang2"
            },{
                "name":"dog4",
                "age":"15",
                "detail":"白白的",
                "address":"中海寰宇天下",
                "phone":"1234567890",
                "uname":"hang2"
            }],
            userInfo:[{
                account:"hang1",
                pwd:"123"
            },{
                account:"hang2",
                pwd:"123"
            },{
                account:"hang3",
                pwd:"123"
            }]
        }
    }

    loginButton=()=>{
        this.setState({
            loginMedalState:!this.state.loginMedalState
        })
    }

    handleCancel=(e)=>{
        this.setState({
            loginMedalState:!this.state.loginMedalState
        })
    }

    handleSubmit=(e)=>{
        let f = false;
        this.state.userInfo.map((item,index) => {
            if(item.account === e.account && item.pwd === e.pwd){
                this.setState({
                    loginMedalState:!this.state.loginMedalState,
                    userName:e.account,
                    flag:true
                })
                f = true;
                this.state.details.map((d,i) => {
                    if(d.uname === e.account) {
                        this.setState ({
                            userDetails:this.state.userDetails.concat(d)
                        })
                    }
                })
                console.log(this.state.userDetails);
            }
        })
        if(!f){
            alert("输入有误，请重新输入~~");
        }
    }

    showFindButton=(e)=>{
        if(this.state.userName === "未登录"){
            alert("您还没有登录，请您先登录好吗~");
        }else{
            this.setState({
                showFindModalState:true
            })
        }
    }

    onClose = () => {
        this.setState({
            showFindModalState:false,
            showUserModalState:false
        })
    }

    showFindSubmit = (e) =>{
        let detail = [{
            "name":e.name,
            "age":e.age,
            "detail":e.detail,
            "address":e.addr,
            "phone":e.phone,
            "uname":this.state.userName
        }]
        this.setState({
            details:this.state.details.concat(detail),
            showFindModalState:false,
            userDetails:this.state.userDetails.concat(detail)
        })
    }

    showUserDetails = (e) =>{
        if(this.state.userName === "未登录"){
            alert("您还没有登录，请您先登录好吗~");
        }else{
            this.setState({
                showUserModalState:true
            })
        }
    }

    render(){

        const {details} = this.state;
        const LoginModalDiv = Form.create({ name: 'login' })(LoginModal);
        const ShowFindModalDiv = Form.create({ name: 'showFind' })(ShowFindModal);

        return(
            <div>
                <Layout>
                    <Header className="header_main">
                        <div>
                            <Button onClick={this.showUserDetails}>个人中心</Button>
                        </div>
                        <div className="header_title">
                            <Text className="header_text">流浪猫狗救助站</Text>
                        </div>
                        <div className="header_button_div">
                            <Text className="header_button_text">{this.state.userName}</Text>
                            <Button onClick={this.showFindButton}>求助帖</Button>
                            <Button onClick={this.loginButton}>{this.state.flag? "注销":"登录"}</Button>
                        </div>
                    </Header>
                    <Content>
                        <div className="content_slider_div">
                            <Carousel autoplay>
                                <div className="carousel_div">
                                    <img alt="img1" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                                </div>
                                <div className="carousel_div">
                                    <img alt="img2" src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1394851986.webp" />                                
                                </div>
                                <div className="carousel_div">
                                    <img alt="img3" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                                </div>
                                <div className="carousel_div">
                                    <img alt="img4" src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1394851986.webp" />
                                </div>
                            </Carousel>
                        </div>
                        <div className="content_card_div">
                            {
                                details.map((item, index) => (
                                    <div key={index}>
                                        <DogCard detail={item}/>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <LoginModalDiv 
                                loginMedalState = {this.state.loginMedalState}
                                // handleOk = {this.handleOk}
                                handleCancel = {this.handleCancel}
                                handleSubmit = {this.handleSubmit}
                            />
                        </div>
                        <div>
                            <ShowFindModalDiv
                                showFindModalState = {this.state.showFindModalState}
                                onClose = {this.onClose} 
                                showFindSubmit = {this.showFindSubmit}
                            />
                        </div>
                        <div>
                            <UserDetailsModal
                                showUserModalState = {this.state.showUserModalState}
                                onClose = {this.onClose} 
                                userDetails = {this.state.userDetails}
                            />

                        </div>
                    </Content>

                </Layout>
            </div>
        )
    }
} 


ReactDOM.render(
    <FindDog />,
    document.getElementById('root')
)


