import React, { PropTypes } from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/app.style';

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
            <Interactive
              as={Link}
              {...s.link}
              to={nextPath(route)}
            >{route.mapMenuTitle}</Interactive>
            {(index + 1) < array.length && ' / '}
          </span>
        ))
    );
  }


  return (
    <div style={s.root}>
      <h1 style={s.title}>Single Page Apps for GitHub Pages</h1>
      <Interactive
        as="a"
        href="https://github.com/rafrex/spa-github-pages"
        style={s.repoLink}
        {...s.link}
      >https://github.com/rafrex/spa-github-pages</Interactive>
      <nav style={s.mapMenu}>
        {generateMapMenu()}
      </nav>
      {children}
      <div style={s.creditLine}>
        <Interactive
          as="a"
          href="http://www.rafaelpedicini.com"
          interactiveChild
          focus={{}}
          touchActive={{}}
          touchActiveTapOnly
        >
          Code and concept by <span {...s.childLink}>Rafael Pedicini</span>
        </Interactive>
      </div>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
