import { connect } from 'dva';
import React, { Component } from 'react';
import { Col, Row, Radio, Card } from 'antd';
import FreeHeroItem from '../../components/FreeHeroItem/index';
import { router } from 'alita';

import styles from './index.less';

@connect(({ hero }) => ({ hero }))
class Page extends Component{
  state = {};
  componentDidMount(){
    this.props.dispatch({
      type: 'hero/fetch',
    })
  }

  onChange = (e) => {
    this.props.dispatch({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value
      }
    })
  }

  onItemHover = (e) => {
    this.props.dispatch({
      type: 'hero/save',
      payload: {
        itemHover: e
      }
    })
  }

  render() {
    const {
      hero: { name, heros = [], heroDetail, filterKey = 0, freeheros = [], itemHover = 0 },
    } = this.props;

    const gotoDetail = (item) => {
      router.push(`/herodetail/${item.ename}`)
    }


    const heroType = [
      { key: 0, value: '全部' },
      { key: 1, value: '战士' },
      { key: 2, value: '法师' },
      { key: 3, value: '坦克' },
      { key: 4, value: '刺客' },
      { key: 5, value: '射手' },
      { key: 6, value: '辅助' },
    ];

    return (
      <div>
        <div className={styles.normal}>
          <div className={styles.info}>
            <Row className={styles.freehero}>
              <Col span={24}>
                <p>周免英雄</p>
                <div>
                  {
                    freeheros.map((item,index) => {
                      return <FreeHeroItem data={item} itemHover={itemHover} onItemHover={this.onItemHover} thisIndex={index} key={index}/>
                    })
                  }
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Card className={styles.container}>
          <Radio.Group onChange={this.onChange} value={filterKey}>
            {
              heroType.map(item => (
                <Radio value={item.key}>{item.value}</Radio>
              ))
            }
          </Radio.Group>
        </Card>
        <div>
          {
          heros.filter(item=>filterKey===0||item.hero_type === filterKey).reverse().map(item => (
            <Col key={item.ename} span={3} className={styles.heroitem} onClick={() => gotoDetail(item)}>
              <img src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}/>
              {/* <img src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`} /> */}
              {/* <img src='https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg'/> */}
              {/* <img src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.ename}.jpg`} /> */}
              <p>{item.cname}</p>
            </Col>
          ))
         }
        </div>
        
        
      </div>
      
    );
  }
}

export default Page;
