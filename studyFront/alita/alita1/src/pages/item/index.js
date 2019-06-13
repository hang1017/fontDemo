import { connect } from 'dva';
import React, { Component } from 'react';
import { Col, Row } from 'antd';

import styles from './index.less';

@connect(({ item }) => ({ item }))
class Page extends Component{
  state = {};

  render() {
    const {
      item: { item },
    } = this.props;
    return <div>
      <Row>
        {
          item.map(i => (
            <Col key={i.item_id} span={3} className={styles.heroitem}>
              <img src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${i.item_id}.jpg`} />
              <p>{item.item_name}</p>
            </Col>
          ))
        }
      </Row>
    </div>;
  }
}

export default Page;
