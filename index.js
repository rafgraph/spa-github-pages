import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';

const routes = (
  <Route path='/' component={App} />
);

render(
  <Router history={browserHistory}>{routes}</Router>,
  document.getElementById('root')
)
