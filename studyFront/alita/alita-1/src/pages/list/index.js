import { connect } from 'dva';
import React, { Component } from 'react';
import { Button } from 'antd';

import styles from './index.less';

@connect(({ list }) => ({ list }))  
class Page extends Component{
  state = {};

  render() {
    const {
      list: { name },
      dispatch,
    } = this.props;

    const putChangeData = () => {
      console.log('点击发送更新数据事件');
      dispatch({
        type: 'list/updateData',
        payload:{
          name:'hanghang'
        },
      })
    }

    return <div className={styles.userCenter}>
      Hello {name}
      <Button onClick={putChangeData}>点击发送数据更新事件</Button>
    </div>;
  }
}

export default Page;
