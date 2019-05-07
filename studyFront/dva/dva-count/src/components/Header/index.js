import React from 'react';
import { Layout,Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Header }  = Layout;

const Header1 = ({ location }) => {
    return (
        <div>
            <Layout>
                <Header>
                    <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
                        <Menu.Item key='1'>
                            <Link to='/home'>
                                <Icon type='home'/> 首页
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Link to='/users'>
                                <Icon type='bars'/> 用户
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='3'>
                            <Link to='/count'>
                                <Icon type='save'/> 计数器
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
            </Layout>
            
        </div>
    )
}

export default Header1;