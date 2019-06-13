import { connect } from 'dva';
import React, { Component } from 'react';
import { Button } from 'antd';
import { router } from 'alita';

import styles from './index.less';

@connect(({ herodetail }) => ({ herodetail }))
class Page extends Component{
  state = {};

  render() {
    const {
      herodetail: { name, detail }, match
    } = this.props;
    return <div>
      <div>{JSON.stringify(detail)}</div>
      <Button onClick={() => router.goBack()}>返回上一页</Button>
    </div>;
  }
}

export default Page;
