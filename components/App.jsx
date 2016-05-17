import React from 'react';
import { Link } from 'react-router';

function App({ children, routes }) {

  function generateMapMenu() {
    let path = '';
    return (
      routes.filter(route => route.mapMenuTitle)
        .map((route, index, array) => (
          <span key={index}>
            <Link
              to={path += ((path.slice(-1) === '/' ? '' : '/') +
                  (route.path === '/' ? '' : route.path))}
            >
              {route.mapMenuTitle}
            </Link>
            {(index + 1) < array.length && ' / '}
          </span>
        ))
    );
  }

  const repoLink = 'https://github.com/rafrex/spa-github-pages';

  return(
    <div>
      <h1>Single Page Apps for GitHub Pages</h1>
      <a href={repoLink}>https://github.com/rafrex/spa-github-pages</a>
      <nav>
        {generateMapMenu()}
      </nav>
      {children}
    </div>
  );
}

export default App;
