import { connect } from 'dva';
import React, { Component } from 'react';
import { router } from 'umi';
import { Button } from 'antd';

import styles from './index.less';

@connect(({ home }) => ({ home }))
class Page extends Component{
  state = {};

  render() {
    const {
      home: { name },
    } = this.props;

    const gotoIndex = () => {
      router.replace('/');
    }

    return <div className={styles.userCenter}>
      <Button onClick={gotoIndex}>跳转到主页面</Button>
      Hello {name}
    </div>;
  }
}

export default Page;
