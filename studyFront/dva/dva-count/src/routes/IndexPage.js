import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

class IndexPage extends React.Component {

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type:'example/save',
    })
  }
  render(){
    const { example } = this.props;
    console.log(example);
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
          <li>{example.name}</li>
        </ul>
      </div>
    );
  }
}


export default connect(({example}) => ({example}))(IndexPage);
