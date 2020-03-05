import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
import {withRouter} from 'react-router';
const AppWithRouter = withRouter(App);
// establishes socket connection
import './socket';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppWithRouter />
    </Router>
  </Provider>,
  document.getElementById('app')
);
