import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router-dom'

class Page1 extends React.Component {
    render() {
        return (
            <div>page1</div>
        )
    }
}

class Page2 extends React.Component {
    render() {
        return (
            <div>page2</div>
        )
    }
}

class Index extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/page1'>Page1</Link></li>
                    <li><Link to='/page2'>Page2</Link></li>
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root'),
)