import React from 'react';

function PageNotFound({ location }) {
  return (
    <p>
      Page not found - the path, {location.pathname}, did not match any
      React Router routes.
    </p>
  );
}

export default PageNotFound;
