import React from 'react';
import CountTitle from '../components/CountTitle';
import { Button } from 'antd';
import count from '../models/count';
import { connect } from 'dva';

const Count = ({ count,dispatch }) => {
        
    return (
        <div>
            <div>
                <CountTitle/>
                <h2>{count}</h2>
                <Button onClick={() => {dispatch({type:'count/add'})}}>+</Button>
                <Button onClick={() => {dispatch({type:'count/minus'})}}>-</Button>
            </div>
        </div>
    )
} 

export default connect(({ count }) => ({ count }))(Count);