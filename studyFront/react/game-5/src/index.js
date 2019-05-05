import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { Button } from 'antd';
import { createStore } from 'redux';
import { Router,Route,browserHistory } from 'react-router';
import { Provider } from 'react-redux';
// import FilterLink from './components/FilterLink'
import Root from './components/Root';

class Game2 extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

class Game1 extends React.Component {

    state = {
        name: 'hang',
        age: 12,
    }

    counter = (state = 0,action) => {
        switch(action.type) {
            case 'INCREMENT':
                return state+1;
            case 'DECREMENT':
                return state-1;
            default:
                return state;
        }
    }

    render() {

        const Root = ({ store }) => (
            <Provider store={store}>
              <Router >
                <Route path="/(:filter)" component={Game2} />
              </Router>
            </Provider>
          );

        let store = createStore(this.counter);
        store.subscribe(() => {
            console.log("~");
            console.log(store.getState());
        })

        store.dispatch({type: 'INCREMENT'});
        store.dispatch({type: 'INCREMENT'});
        store.dispatch({type: 'DECREMENT'});

        return (
            <div>
                {/* <Root/> */}
                {/* <div>
                    <p>
                        Show:
                        {" "}
                        <FilterLink filter="all">
                        All
                        </FilterLink>
                        {", "}
                        <FilterLink filter="active">
                        Active
                        </FilterLink>
                        {", "}
                        <FilterLink filter="completed">
                        Completed
                        </FilterLink>
                    </p>
                </div> */}
                <div>
                    <Root />
                </div>
            </div>
        )
    }
}

class Game extends React.Component{
    render(){
        let [a,[b,c]] = [1,[2,3]];
        let aa = {
            name:'hang',
            age: 12,
        }
        let bb = {};
        ({aName:bb.name,aAge:bb.age} = {aName:aa.name,aAge:aa.age});

        function cc() {
            return [1,2,3];
        }

        function dd() {
            return {
                name:'hang',
                age:12,
            }
        }

        let [d,e,f] = cc();
        let { name,age } = dd();

        let g = {
            names:'hang',
            ages:12,
            scores:[1,3],
        }

        let {names,ages,scores} = g;

        const h = `In JavaScript '\n' is a line-feed.`;

        let evalExpr = /<%=(.+?)%>/g;
        let expr = /<%([\s\S]+?)%>/g;

        // let template = template
        // .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        // .replace(expr, '`); \n $1 \n  echo(`');

        // template = 'echo(`' + template + '`);';

        let l = 5;
        let m = 10;

        let n = `Hello ${ l + m } world ${ l * m }`;
        // 等同于
        // tag(['Hello ', ' world ', ''], 15, 50);

        let o = Math.cbrt(8);

        const p = 'ppp';

        const q = {p};

        let r = { 
            name:'hang',
            age:12,
            addr: '国脉',
        };

        for(let i in r){
            console.log(i);
        }

        let s = Object.keys(r);
        console.log(s);

        let t = Object.getOwnPropertyNames(r);
        console.log(t);

        let u = Object.getOwnPropertySymbols(r);
        console.log(u);

        const v = { aaa:3,bbb:4 };
        console.log({...v});

        // let s = Object.getOwnPropertyDescriptor(r);
        // console.log(s);
        return (
            <div>
                <div>{a}</div>
                <div>{b}</div>
                <div>{c}</div>
                <div>{aa.name}</div>
                <div>{bb.name}</div>
                <div>{d}</div>
                <div>{e}</div>
                <div>{f}</div>
                <div>{name}</div>
                <div>{age}</div>
                <div>{names}</div>
                <div>{ages}</div>
                <div>{scores}</div>
                <div>{h}</div>
                <div>{n}</div>
                <div>{o}</div>
                <div>{p}</div>
                <div><Button>aa</Button></div>
                <hr/>
                <div><Game1/></div>
                {/* <div>{q}</div> */}
                {/* <div>{template}</div> */}

            </div>
        )
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
)



