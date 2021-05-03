import * as React from 'react';
import { P } from '../ui/Paragraph';

interface PageNotFoundProps {
  location: { pathname: 'string' };
}

export const PageNotFound: React.VFC<PageNotFoundProps> = ({ location }) => (
  <P>
    Page not found - the path, <code>{location.pathname}</code>, did not match
    any React Router routes.
  </P>
);
