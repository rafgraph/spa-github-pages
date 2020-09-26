import React from 'react';
import PropTypes from 'prop-types';
import { Code, P } from './UI';

const propTypes = {
  location: PropTypes.object.isRequired,
};

export default function PageNotFound({ location }) {
  return (
    <P>
      Page not found - the path, <Code>{location.pathname}</Code>, did not match
      any React Router routes.
    </P>
  );
}

PageNotFound.propTypes = propTypes;
