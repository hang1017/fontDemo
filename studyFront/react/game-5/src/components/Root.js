import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
// import { browserHistory } from 'react-router-dom'
import App from './App';

// class App1 extends React.Component {
//     render(){
//         return (
//             <div>
//                 a
//             </div>
//         )
//     }
// }

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>
);

// Root.propTypes = {
//   store: PropTypes.object.isRequired,
// };

export default Root;