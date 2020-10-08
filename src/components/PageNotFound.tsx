import * as React from 'react';
import { Code, P } from './UI';

interface PageNotFoundProps {
  location: { pathname: 'string' };
}

export const PageNotFound: React.VFC<PageNotFoundProps> = ({ location }) => (
  <P>
    Page not found - the path, <Code>{location.pathname}</Code>, did not match
    any React Router routes.
  </P>
);
