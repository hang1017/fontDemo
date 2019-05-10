import dva from 'dva';
// import React from 'react';
import './index.css';
// import { Button } from 'antd';
// import { connect } from 'dva';

// 1. Initialize
const app = dva({
    initialState: {
        deletes: [
            { name:'react',id:1 },
            { name:'antd',id:2 },
            { name:'redux',id:3 },
            { name:'dva',id:4 },
        ],
        count:1,
        users: [
            { name: 'hang1',age:15,id:1 },
            { name: 'hang2',age:17,id:2 },
            { name: 'hang3',age:18,id:3 }
        ],
        
    }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/deletes').default);
app.model(require('./models/count').default);
app.model(require('./models/users').default);




// const App = connect(({ count })=>({ count }))(
//     function(props) {
//         const count = props.count;
//         return (
//             <div>
//                 <Title/>
//                 <h2>{count}</h2>
//                 <Button onClick={() => {props.dispatch({type:'count/add'})}}>+</Button>
//                 <Button onClick={() => {props.dispatch({type:'count/minus'})}}>-</Button>
//             </div>
//         )
//     }
// )

// 4. Router
app.router(require('./router').default);
// app.router(()=><App/>);

// 5. Start
app.start('#root');
