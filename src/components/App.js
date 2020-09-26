import React from 'react';
import InteractiveLink from './InteractiveLink';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ExampleComponent from './ExampleComponent';
import ExampleTwoDeepComponent from './ExampleTwoDeepComponent';
import PageNotFound from './PageNotFound';
import Breadcrumbs from './Breadcrumbs';
import s from '../styles/app.style';

export default function App() {
  return (
    <div style={s.root}>
      <h1 style={s.title}>Single Page Apps for GitHub Pages</h1>
      <InteractiveLink
        href="https://github.com/rafgraph/spa-github-pages"
        style={s.repoLink}
      >
        https://github.com/rafgraph/spa-github-pages
      </InteractiveLink>

      <nav style={s.breadcrumbs}>
        <Breadcrumbs />
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/example" component={ExampleComponent} />
        <Route
          exact
          path="/example/two-deep"
          component={ExampleTwoDeepComponent}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}
