import React from 'react';
import Header from '../components/Header/index';

const Index = ({ children, location }) => {
    return (
        <div>
            <Header location={ location }/>
            <div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Index;

