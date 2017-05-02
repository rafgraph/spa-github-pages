import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import Interactive from 'react-interactive';
import s from '../styles/style';

const breadCrumbTitles = {
  '': 'Home',
  example: 'Example',
  'two-deep': 'Two Deep',
};

function BreadcrumbsItem({ match }) {
  const title = breadCrumbTitles[match.url.split('/').slice(-1)];
  const to = title === undefined ? '/' : match.url;

  return (
    <span>
      <Interactive
        as={Link}
        {...s.link}
        to={to}
      >{title || 'Page Not Found'}</Interactive>
      {!match.isExact && title && ' / '}
      {title &&
        <Route path={`${match.url === '/' ? '' : match.url}/:path`} component={BreadcrumbsItem} />
      }
    </span>
  );
}

BreadcrumbsItem.propTypes = {
  match: PropTypes.object.isRequired,
};

export default function Breadcrumbs() {
  return (
    <Route path="/" component={BreadcrumbsItem} />
  );
}
