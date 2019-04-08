import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Button,Layout,Typography,Carousel,Card } from 'antd';

const {Text} = Typography;
const {Header, Content,} = Layout;
// const { Meta } = Card;

class DogCard extends React.Component{

    constructor(){
        super();
    }

    mouserMove(){
        // alert("");
    }

    render(){
        return(
            <div className="dc_main"  hoverable onMouseMove={this.mouserMove}>
                {/* <Card className="dc_card"
                    hoverable
                >  */}
                    <div>
                        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                    <div className="dc_right">
                        
                    </div>
                {/* </Card> */}
                
            </div>
        )
    }
}

class FindDog extends React.Component{

    render(){
        return(
            <div>
                <Layout>
                    <Header className="header_main">
                        <div className="header_title">
                            <Text className="header_text">流浪猫狗救助站</Text>
                        </div>
                        <div className="header_button_div">
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
                            <DogCard/>
                            <DogCard/>
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


