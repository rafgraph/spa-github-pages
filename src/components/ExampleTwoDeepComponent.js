import React, { PropTypes } from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/exampleTwoDeepComponent.style';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function ExampleTwoDeepComponent({ location }) {
  const queryPresent = Object.keys(location.query).length !== 0;
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

    const queryString = (queryPresent ? location.search : '?field1=foo&field2=bar');
    const hashFragment = (hashPresent ? location.hash : '#boom!');

    let linkText = '';
    if (queryPresent && !hashPresent) linkText = 'Show with hash fragment';
    if (!queryPresent && hashPresent) linkText = 'Show with query string';
    if (!queryPresent && !hashPresent) linkText = 'Show with query string and hash fragment';

    return (
      <div style={s.lineContainer}>
        <Interactive
          as={Link}
          to={`/example/two-deep${queryString}${hashFragment}`}
          {...s.link}
        >{linkText}</Interactive>
      </div>
    );
  }

  return (
    <div>
      <div style={s.lineContainer}>
        <div>{queryStringTitle()}</div>
        <ul>
          {
            Object.keys(location.query).map((field, index) => (
              s.li(`${field}: ${location.query[field]}`, { key: index })
            ))
          }
        </ul>
      </div>
      <div style={s.lineContainer}>
        <div>{hashFragmentTitle()}</div>
        <ul>
          {hashPresent ? s.li(location.hash.slice(1)) : undefined}
        </ul>
      </div>
      {linkToShowQueryAndOrHash()}
    </div>
  );
}

ExampleTwoDeepComponent.propTypes = propTypes;

export default ExampleTwoDeepComponent;
