import React from 'react';
import Header from '../components/Header/index';

const Index = ({ children, location }) => {

    console.log(children);
    return (
        <div>
            <Header location={ location }/>
            <div>
                <div>{children || "Welcome to your Inbox"}</div>
            </div>
        </div>
    )
}

export default Index;

