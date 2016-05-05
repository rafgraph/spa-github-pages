import React from 'react';
import { Link } from 'react-router';

function App(props) {
  console.log(props);

  function mapMenu() {
    let path = '';
    return props.routes.filter(route => route.mapMenuTitle).map(route => ({
      path: path += ((path.slice(-1) === '/' ? '' : '/') +
                      route.path.split('/').pop()),
      mapMenuTitle: route.mapMenuTitle
    }))
  }

  return(
    <div>
      <h2>React for Github Pages</h2>
      <nav>
        {mapMenu().map((route, index, array) => (
          <span key={index}>
            <Link to={route.path}>
              {route.mapMenuTitle}
            </Link>
            {(index + 1) < array.length && ' > '}
          </span>
        ))}
      </nav>
      {props.children}
    </div>
  );
}

export default App;
