import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import InteractiveLink from './InteractiveLink';

const breadCrumbTitles = {
  '': 'Home',
  example: 'Example',
  'two-deep': 'Two Deep',
  'sitemap-link-generator': 'Sitemap Link Generator',
};

function BreadcrumbsItem({ match }) {
  const title = breadCrumbTitles[match.url.split('/').slice(-1)];
  const to = title === undefined ? '/' : match.url;

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
}

BreadcrumbsItem.propTypes = {
  match: PropTypes.object.isRequired,
};

export default function Breadcrumbs() {
  return <Route path="/" component={BreadcrumbsItem} />;
}
