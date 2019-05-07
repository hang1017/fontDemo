import { connect } from 'dva';
import React, { Component } from 'react';
import { Link } from 'umi';
import { Button } from 'antd';
import { router } from 'umi';

import styles from './index.less';

@connect(({ index }) => ({ index }))
class Page extends Component{
  state = {};

  render() {
    const {
      index: { name },
    } = this.props;

    const gotoList = () => {
      router.push('/list');
    }

    return <div className={styles.userCenter}>
      <Link to="/home">跳转回 home 页面</Link><br/>
      <Button onClick={gotoList}>跳转回 list 页面</Button>
      Hello {name}
    </div>;

  }
}

export default Page;
