import React, { Component } from 'react';
import styles from './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'alita';

const { Header, Content, Footer }  = Layout;

const menuData = [
  {route: 'hero',name: '英雄'},
  {route: 'item',name: '局内道具'},
  {route: 'summoner',name: '召唤师技能'},
];

const BasicLayout= ({ children, location: { pathname } }) => {
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>王者荣耀资料库 </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: '64px' }}
        >
          {
            menuData.map(item => (
              <Menu.Item key={`/${item.route}`}>
                <Link to={item.route}>{item.name}</Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ backgroundColor: '#fff',padding: 24, minHeight: 400 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center'}}>航帅帅~</Footer>
    </Layout>
  );
};

export default BasicLayout;
