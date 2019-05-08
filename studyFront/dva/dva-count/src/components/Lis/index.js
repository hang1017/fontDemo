import React from 'react';

const Lis = ({ name }) => {
    return (
        <div>
            {
                name.map((item,index) => {
                    <li>{item.name}</li>
                })
            }
        </div>
    )
} 

export default Lis;