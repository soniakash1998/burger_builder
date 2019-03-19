import React, { Component } from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/CheckOut/CheckOut';
import {Route, Switch} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path = "/checkout" component = {Checkout} />
          <Route path = "/orders" component = {Orders} />
          <Route path = "/" component = {BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
