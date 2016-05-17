import React from 'react';

function PageNotFound({ location }) {
  return (
    <p>
      Page not found - the path, <code>{location.pathname}</code>, did not match any
      React Router routes.
    </p>
  );
}

export default PageNotFound;
