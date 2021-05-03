import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { InteractiveLink } from '../ui/InteractiveLink';

interface breadCrumbTitlesInterface {
  [key: string]: string | undefined;
}

const breadCrumbTitles: breadCrumbTitlesInterface = {
  '': 'Home',
  example: 'Example',
  'two-deep': 'Two Deep',
  'sitemap-link-generator': 'Sitemap Link Generator',
};

const BreadcrumbsItem: React.VFC<RouteComponentProps> = ({ match }) => {
  const path =
    match.url.length > 1 && match.url[match.url.length - 1] === '/'
      ? match.url.slice(0, -1)
      : match.url;

  const title = breadCrumbTitles[path.split('/').slice(-1)[0]];
  const to = title === undefined ? '/' : path;

  return (
    <span>
      <InteractiveLink to={to}>{title || 'Page Not Found'}</InteractiveLink>
      {!match.isExact && title && ' / '}
      {title && (
        <Route
          path={`${match.url === '/' ? '' : match.url}/:path`}
          component={BreadcrumbsItem}
        />
      )}
    </span>
  );
};

export const Breadcrumbs: React.VFC = () => (
  <Route path="/" component={BreadcrumbsItem} />
);
