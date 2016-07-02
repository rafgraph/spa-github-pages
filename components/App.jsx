import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

function App({ children, routes }) {
  function generateMapMenu() {
    let path = '';

    function nextPath(route) {
      path += (
        (path.slice(-1) === '/' ? '' : '/') +
        (route.path === '/' ? '' : route.path)
      );
      return path;
    }

    return (
      routes.filter(route => route.mapMenuTitle)
        .map((route, index, array) => (
          <span key={index}>
            <Link to={nextPath(route)}>{route.mapMenuTitle}</Link>
            {(index + 1) < array.length && ' / '}
          </span>
        ))
    );
  }

  const repoLink = 'https://github.com/rafrex/spa-github-pages';

  return (
    <div>
      <h1>Single Page Apps for GitHub Pages</h1>
      <a href={repoLink}>https://github.com/rafrex/spa-github-pages</a>
      <nav>
        {generateMapMenu()}
      </nav>
      {children}
      <div style={{ color: '#A0A0A0', fontSize: '14px', marginTop: '50px' }}>
        <a href="http://www.rafaelpedicini.com" className="extended-link">
          Code and concept by <span className="link-style">Rafael Pedicini</span>
        </a>
      </div>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
