import React from 'react';
import { Table,Popconfirm, Button } from 'antd';

const UserList = ({onDelete,users}) => {

    const columns=[
        {
            title:'userName',
            dataIndex:'name',
        },
        {
            title:'userAge',
            dataIndex:'age',
        },
        {
            title:'Actions',
            render:(item,index) => {
                return (
                    <Popconfirm 
                        title='are you sure delete?' 
                        onConfirm={ () => onDelete(item.id)}
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                )
            }
        }
    ]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={users}
            />
        </div>
    )
}

export default UserList;