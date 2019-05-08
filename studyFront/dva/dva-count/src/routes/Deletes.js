import React from 'react';
import { connect } from 'dva';

const Deletes = ({ deletes,dispatch }) => {
    function handleDelete(id) {
        dispatch({
            type:'deletes/delayDel',
            payload:id,
        })
    }
    return (
        <div>
            <ul>
                {
                    deletes.map((item,index) => {
                       return (
                        <li key={index}>{item.name} <button onClick={() => handleDelete(item.id)}>delete?</button></li>
                       )
                    })
                }
            </ul>
        </div>
    )
}

export default connect(({ deletes }) => ({ deletes }))(Deletes);