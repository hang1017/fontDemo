import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Button,Layout,Typography,Carousel,Card,Row, Col,Modal } from 'antd';

const {Text} = Typography;
const {Header, Content,} = Layout;
// const { Meta } = Card;

class DogCard extends React.Component{

    constructor(props){
        super(props);
    }

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
            details:[{
                "name":"hang1",
                "age":"15",
                "detail":"黑黑的",
                "address":"中海寰宇天下",
                "phone":"1234567"
            },{
                "name":"hang2",
                "age":"15",
                "detail":"白白的",
                "address":"中海寰宇天下",
                "phone":"1234567890"
            },{
                "name":"hang3",
                "age":"15",
                "detail":"白白的",
                "address":"中海寰宇天下",
                "phone":"1234567890"
            },{
                "name":"hang4",
                "age":"15",
                "detail":"白白的",
                "address":"中海寰宇天下",
                "phone":"1234567890"
            }]
        }
    }

    render(){

        const {details} = this.state;

        return(
            <div>
                <Layout>
                    <Header className="header_main">
                        <div className="header_title">
                            <Text className="header_text">流浪猫狗救助站</Text>
                        </div>
                        <div className="header_button_div">
                            <Text className="header_button_text">航帅帅</Text>
                            <Button>个人中心</Button>
                            <Button>登录</Button>
                        </div>
                    </Header>
                    <Content>
                        <div className="content_slider_div">
                            <Carousel autoplay>
                                <div className="carousel_div"><h3>1</h3></div>
                                <div className="carousel_div"><h3>2</h3></div>
                                <div className="carousel_div"><h3>3</h3></div>
                                <div className="carousel_div"><h3>4</h3></div>
                            </Carousel>
                        </div>
                        <div className="content_card_div">
                            {
                                details.map((item, index) => (
                                    <DogCard detail={item}/>
                                ))
                            }
                            
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


