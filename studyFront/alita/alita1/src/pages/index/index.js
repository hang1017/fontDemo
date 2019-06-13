import { connect } from 'dva';
import React, { Component } from 'react';
import styles from './index.less';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer }  = Layout;

@connect(({ index }) => ({ index }))
class Page extends Component{
  state = {};

  render() {
    const {
      index: { name },
    } = this.props;
    return(
      <div>
        1
      </div>
    );
  }
}

export default Page;
