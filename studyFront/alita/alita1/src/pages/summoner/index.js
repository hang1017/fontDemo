import { connect } from 'dva';
import React, { Component } from 'react';

import styles from './index.less';

@connect(({ summoner }) => ({ summoner }))
class Page extends Component{
  state = {};

  render() {
    const {
      summoner: { summoners },
    } = this.props;
    return <div>{JSON.stringify(summoners)}</div>;
  }
}

export default Page;
