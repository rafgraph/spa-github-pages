import React from 'react';
import { Link } from 'react-router';

function App(props) {
  console.log(props);

  function generateMapMenu() {
    let path = '';
    return (
      props.routes.filter(route => route.mapMenuTitle)
        .map((route, index, array) => (
          <span key={index}>
            <Link
              to={path += ((path.slice(-1) === '/' ? '' : '/') +
                  route.path.split('/').pop())}
            >
              {route.mapMenuTitle}
            </Link>
            {(index + 1) < array.length && ' > '}
          </span>
        ))
    );
  }

  return(
    <div>
      <h2>React for Github Pages</h2>
      <nav>
        {generateMapMenu()}
      </nav>
      {props.children}
    </div>
  );
}

export default App;
