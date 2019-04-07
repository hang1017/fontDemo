import React, { Component } from 'react';
// import Button from 'antd/lib/button';
import { Layout,Menu,Breadcrumb,Icon } from 'antd';
import './Layo.css';
import Slider from 'react-slick';
// import Header from 'antd/lib/calendar/Header';
// import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem';
// import Paragraph from 'antd/lib/typography/Paragraph';

// const {Text,Title,Paragraph} = Typography;

class Layo extends Component{

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {

        const { SubMenu } = Menu;
        const {Header,Content,Footer,Sider} = Layout;

        return(
            // <div className="Layo">
            //     <div>
            //        <Layout className="layout">
            //         <Header>
            //             <div className="logo" />
            //             <Menu 
            //                 theme="dark"
            //                 mode="horizontal"
            //                 style={{lineHeight:'64px'}}
            //             >
            //                 <Menu.Item key="1">nav 1</Menu.Item>
            //                 <Menu.Item key="2">nav 2</Menu.Item>
            //                 <Menu.Item key="3">nav 3</Menu.Item>
            //             </Menu>
            //         </Header>
            //         <Content style={{padding:'0 50px'}}>
            //             <Breadcrumb style={{margin:' 16px 0'}}>
            //                 <Breadcrumb.Item>hang1</Breadcrumb.Item>
            //                 <Breadcrumb.Item>hang2</Breadcrumb.Item>
            //                 <Breadcrumb.Item>hang3</Breadcrumb.Item>
            //             </Breadcrumb>
            //             <div style={{background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
            //         </Content>
            //         <Footer style={{ textAlign: 'center' }}>
            //             hang shuaishuai 2019.04.07
            //         </Footer>
            //     </Layout> 
            //     </div>
            // </div>


            <div className="Layo">
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Slider width={200}
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                        >
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" />subnav1</span>}>
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav1</span>}>
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Slider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{
                                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                            }}
                            >
                                Content
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default Layo;