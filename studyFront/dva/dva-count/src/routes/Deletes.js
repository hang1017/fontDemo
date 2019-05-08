import React from 'react';
import { connect } from 'dva';
import Lis from '../components/Lis/index';

const Deletes = ({ deletes }) => {
    console.log(deletes);
    return (
        <div>
            <ul>
                {
                    deletes.map((item,index) => {
                       return <li key={index}>{item.name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default connect(({ deletes }) => ({ deletes }))(Deletes);