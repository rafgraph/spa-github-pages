import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DarkModeButton } from './ui/DarkModeButton';
import { GitHubIconLink } from './ui/GitHubIconLink';
import { globalCss, styled } from './stitches.config';
import { Home } from './components/Home';
import { ExampleComponent } from './components/ExampleComponent';
import { ExampleTwoDeepComponent } from './components/ExampleTwoDeepComponent';
import { SitemapLinkGenerator } from './components/SitemapLinkGenerator';
import { PageNotFound } from './components/PageNotFound';
import { Breadcrumbs } from './components/Breadcrumbs';

const AppContainer = styled('div', {
  maxWidth: '540px',
  padding: '12px 15px 25px',
  margin: '0 auto',
});

const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '18px',
});

const H1 = styled('h1', {
  fontSize: '26px',
  marginRight: '16px',
});

const HeaderIconContainer = styled('span', {
  width: '78px',
  display: 'inline-flex',
  justifyContent: 'space-between',
  gap: '12px',
});

const BreadcrumbsNav = styled('nav', {
  margin: '18px 0',
});

export const App: React.VFC = () => {
  globalCss();

  return (
    <AppContainer>
      <HeaderContainer>
        <H1>Single Page Apps for GitHub Pages</H1>
        <HeaderIconContainer>
          <DarkModeButton />
          <GitHubIconLink
            href="https://github.com/rafgraph/spa-github-pages"
            title="GitHub repository for SPA GitHub Pages"
          />
        </HeaderIconContainer>
      </HeaderContainer>

      <BreadcrumbsNav>
        <Breadcrumbs />
      </BreadcrumbsNav>

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
    </AppContainer>
  );
};
