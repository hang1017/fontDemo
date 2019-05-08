import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Count from './routes/Count';
import Index from './routes/Index';
import Users from './routes/User';
import Deletes from './routes/Deletes';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home" exact component={IndexPage} />
        <Route path="/count" exact component={Count} />
        <Route path="/" exact component={Index}/>
        <Route path="/users" exact component={Users} />
        <Route path="/deletes" exact component={Deletes} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
