import * as React from 'react';
import * as CSS from 'csstype';
import { InteractiveLink } from './InteractiveLink';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { ExampleComponent } from './ExampleComponent';
import { ExampleTwoDeepComponent } from './ExampleTwoDeepComponent';
import { SitemapLinkGenerator } from './SitemapLinkGenerator';
import { PageNotFound } from './PageNotFound';
import { Breadcrumbs } from './Breadcrumbs';

const rootStyle: CSS.Properties = {
  fontFamily: 'helvetica, sans-serif',
  fontWeight: 300,
  fontSize: '16px',
  letterSpacing: '0.025em',
  boxSizing: 'border-box',
  WebkitTextSizeAdjust: 'none',
  textSizeAdjust: 'none',

  maxWidth: '540px',
  margin: '0 auto',
  padding: '3vh 20px 12vh 20px',
};

const titleStyle: CSS.Properties = {
  fontSize: '20px',
  marginBottom: '0.5vh',
};

const repoLinkStyle: CSS.Properties = {
  fontSize: '14px',
};

const breadcrumbsStyle: CSS.Properties = {
  margin: '3vh 0',
};

export const App: React.VFC = () => (
  <div style={rootStyle}>
    <h1 style={titleStyle}>Single Page Apps for GitHub Pages</h1>
    <InteractiveLink
      href="https://github.com/rafgraph/spa-github-pages"
      style={repoLinkStyle}
    >
      https://github.com/rafgraph/spa-github-pages
    </InteractiveLink>

    <nav style={breadcrumbsStyle}>
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
      <Route
        exact
        path="/sitemap-link-generator"
        component={SitemapLinkGenerator}
      />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);
