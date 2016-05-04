import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';



///////////////////////////////////////////////////////////////////////////////
// React for GitHub Pages - https://github.com/rafrex/react-github-pages
// ----------------------------------------------------------------------------
// Takes the redirect query string created in 404.html, converts it back into
// the correct url, then uses react-router to redirect to the correct url which
// loads the repsrective routes and components. When a there is a fresh page
// load with a path that is defined with frontend routes, GitHub pages will
// return the custom 404.html page, which then redirects back to just the
// base domain with a query string representing the attempted url, to which
// GitHub pages returns index.html. The single page react app is loaded,
// this function is run, and the correct route is entered.
function checkForRedirectQuery(nextState, replace) {
  const query = nextState.location.query
  if (query.redirect) {
    let redirectTo = {}

    if (typeof query.pathname === 'string' && query.pathname !== '') {
      redirectTo.pathname = query.pathname;
    }

    if (typeof query.query === 'string' && query.query !== '') {
      let queryObject = {};
      query.query.split('&').map( q => q.split('=') ).forEach( arr => {
        queryObject[arr[0]] = arr.slice(1).join('=');
      })
      redirectTo.query = queryObject;
    }

    if (typeof query.hash === 'string' && query.hash !== '') {
      redirectTo.hash = `#${query.hash}`
    }

    replace(redirectTo)
  }
}
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// React for GitHub Pages - https://github.com/rafrex/react-github-pages
// ----------------------------------------------------------------------------
// Redirect for github pages from /my-repo-name to your custom domain,
// because gh-pages are always availble at /my-repo-name even when a
// custom domain is in use. Accessing the site at /my-repo-name will
// cause the routing to break, so when the site is accessed at /my-repo-name,
// a redirect to the cutom domain is required.
// https://help.github.com/articles/custom-domain-redirects-for-github-pages-sites/
// SET THIS: e.g. my-repo-name
const githubRepoName = 'react-github-pages';
// The custom domain for your site
// SET THIS: e.g. http://subdomain.example.tld, or http://www.example.tld
const domain = `http://${githubRepoName}.${window.location.host.replace('www.', '')}`;
function redirectToDomain() {
  window.location.replace(domain)
}
///////////////////////////////////////////////////////////////////////////////



const routes = (
  // onEnter hook checks for redirect query before App component is loaded
  <Route path="/" component={App} onEnter={checkForRedirectQuery}>
    <IndexRoute component={Home} />

    // redirect for github pages when accessed at /my-repo-name
    <Route path={githubRepoName} onEnter={redirectToDomain} />
    <Route path="*" component={PageNotFound} />
  </Route>
);

render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root')
)
