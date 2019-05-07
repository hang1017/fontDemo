import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';

const ProductList = ({ onDelete, products }) => {
    const columns = [{
        title:'Name',
        dataIndex:'name',
    },{
        title:'Actions',
        render: (text, record) => {
            return (
              <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
                <Button>Delete</Button>
              </Popconfirm>
            );
          },
    }];
    return (
        <div>
            <Table
                dataSource={products}
                columns={columns}
            />
        </div>
    )
}

ProductList.PropTypes = {
    onDelete:PropTypes.func.isRequired,
    products:PropTypes.array.isRequired,
}

export default ProductList;