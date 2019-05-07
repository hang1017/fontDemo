import React from 'react';
import UserList from '../components/UserList/index';
import { connect } from 'dva';

const User = ({ dispatch,users }) => {

    function onDelete(id) {
        console.log(id);
        dispatch({
            type:'users/delete',
            payload:id,
        })
    }

    return (
        <div>
            <h2>List of User</h2>
            <UserList 
                users={users}
                onDelete={onDelete}
            />
        </div>
    )
}

export default connect(({ users }) => ({ users }))(User);