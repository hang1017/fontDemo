import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Count from './routes/Count';
import Index from './routes/Index';
import Users from './routes/User';
import Deletes from './routes/Deletes';

import { IndexRoute } from 'react-router';

function RouterConfig({ history, app, registerModel }) {
  const routes = [
    {
      path: '/',
      name: 'IndexPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/example'));
          cb(null, require('./routes/IndexPage'));
        });
      },
    },
    {
      path: '/users',
      name: 'UsersPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/users'));
          cb(null, require('./routes/User'));
        });
      },
    },
 
  ]
  return (
    <Router history={history}>
      <Switch>
        <Route path="/"  component={Index}>
          <IndexRoute component={IndexPage} />
          <Route path="/home"  component={IndexPage} />
          <Route path="/count"  component={Count} />
          <Route path="/users"  component={Users} />
          <Route path="/deletes"  component={Deletes} />
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
