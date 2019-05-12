import React from 'react';
import Header from '../components/Header/index';

class Index extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { children,location } = this.props;
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
}

export default Index;

