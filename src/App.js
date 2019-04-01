import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Machines from './containers/Machines/Machines';
import Machine from './containers/Machine/Machine';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path={'/machines/:id'} exact component={Machine} />
        <Route path="/machines" component={Machines} />
        <Route path="/" exact component={Machines} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default App;
