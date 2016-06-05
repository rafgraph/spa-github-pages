import React from 'react';
import { Link } from 'react-router';

function Home() {
  const reactLink = 'https://github.com/facebook/react';
  const reactRouterLink = 'https://github.com/reactjs/react-router';
  const ghPagesLink = 'https://pages.github.com/';
  const repoReadmeLink = 'https://github.com/rafrex/spa-github-pages#readme';

  return (
    <div>
      <p>
        This is an example single page app built
        with <a href={reactLink}>React</a> and {' '}
        <a href={reactRouterLink}>React&nbsp;Router</a> using {' '}
        <code>browserHistory</code>. Navigate with the links below and
        refresh the page or copy/paste the url to test out the redirect
        functionality deployed to overcome {' '}
        <a href={ghPagesLink}>GitHub&nbsp;Pages</a> incompatibility
        with single page apps (like this one).
      </p>
      <p>
        Please see the <a href={repoReadmeLink}>repo readme</a> for
        instructions on how to use this boilerplate
        to deploy your own single page app using GitHub Pages.
      </p>
      <div><Link to="/example">Example page</Link></div>
      <div><Link to="/example/two-deep?field1=foo&field2=bar#boom!">
        Example two deep with query and hash
      </Link></div>
    </div>
  );
}

export default Home;
