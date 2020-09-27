import React from 'react';
import InteractiveLink from './InteractiveLink';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ExampleComponent from './ExampleComponent';
import ExampleTwoDeepComponent from './ExampleTwoDeepComponent';
import SitemapLinkGenerator from './SitemapLinkGenerator';
import PageNotFound from './PageNotFound';
import Breadcrumbs from './Breadcrumbs';

const rootStyle = {
  fontFamily: 'helvetica, sans-serif',
  fontWeight: '300',
  fontSize: '16px',
  letterSpacing: '0.025em',
  padding: '3vh 0 12vh 0',
  width: '500px',
  // use responsive max-width to simulate padding/margin to allow
  // space for vertical scroll bar without creating horizontal scroll bar
  // (if there is padding, the window will scroll horizontally to show the padding)
  maxWidth: 'calc(100vw - 40px)',
  boxSizing: 'border-box',

  // center based on vw to prevent content jump when vertical scroll bar show/hide
  // note: vw/vh include the width of scroll bars. Note that centering using margin auto
  // or % (which doesn't include scroll bars, so changes when scroll bars shown) causes a page jump
  position: 'relative',
  left: '50vw',
  WebkitTransform: 'translate(-50%, 0)',
  MozTransform: 'translate(-50%, 0)',
  msTransform: 'translate(-50%, 0)',
  OTransform: 'translate(-50%, 0)',
  transform: 'translate(-50%, 0)',

  WebkitTextSizeAdjust: 'none',
  MozTextSizeAdjust: 'none',
  msTextSizeAdjust: 'none',
  textSizeAdjust: 'none',
};

const titleStyle = {
  fontSize: '20px',
  marginBottom: '0.5vh',
};

const repoLinkStyle = {
  fontSize: '14px',
};

const breadcrumbsStyle = {
  margin: '3vh 0',
};

export default function App() {
  return (
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
}
