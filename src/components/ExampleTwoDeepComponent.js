import React from 'react';
import PropTypes from 'prop-types';
import InteractiveLink from './InteractiveLink';
import { Li, P } from './UI';

const lineContainerStyle = {
  margin: '3vh 0',
};

const propTypes = {
  location: PropTypes.object.isRequired,
};

export default function ExampleTwoDeepComponent({ location }) {
  const queryPresent = location.search !== '';
  const hashPresent = location.hash !== '';

  function queryStringTitle() {
    if (queryPresent) return 'The query string field-value pairs are:';
    return 'No query string in the url';
  }

  function hashFragmentTitle() {
    if (hashPresent) return 'The hash fragment is:';
    return 'No hash fragment in the url';
  }

  function linkToShowQueryAndOrHash() {
    if (queryPresent && hashPresent) return null;

    const queryString = queryPresent
      ? location.search
      : '?field1=foo&field2=bar';
    const hashFragment = hashPresent ? location.hash : '#boom!';

    let linkText = '';
    if (queryPresent && !hashPresent) linkText = 'Show with hash fragment';
    if (!queryPresent && hashPresent) linkText = 'Show with query string';
    if (!queryPresent && !hashPresent)
      linkText = 'Show with query string and hash fragment';

    return (
      <div style={lineContainerStyle}>
        <InteractiveLink to={`/example/two-deep${queryString}${hashFragment}`}>
          {linkText}
        </InteractiveLink>
      </div>
    );
  }

  function parseQueryString() {
    if (!queryPresent) return [];
    return location.search
      .replace('?', '')
      .split('&')
      .map((fvPair) => fvPair.split('='))
      .map((pair) => [pair[0], pair.slice(1).join('=')]);
  }

  return (
    <div>
      <P>
        This is an example page with query string and hash fragment. Refresh the
        page or copy/paste the url to test out the redirect functionality (this
        same page should load after the redirect).
      </P>
      <div style={lineContainerStyle}>
        <div>{queryStringTitle()}</div>
        <ul>
          {parseQueryString().map((pair, index) => (
            <Li
              key={`${pair[0]}${pair[1]}${index}`}
            >{`${pair[0]}: ${pair[1]}`}</Li>
          ))}
        </ul>
      </div>
      <div style={lineContainerStyle}>
        <div>{hashFragmentTitle()}</div>
        <ul>{hashPresent && <Li>{location.hash.slice(1)}</Li>}</ul>
      </div>
      {linkToShowQueryAndOrHash()}
    </div>
  );
}

ExampleTwoDeepComponent.propTypes = propTypes;
