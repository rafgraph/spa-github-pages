import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
    return 'No hash frgament in the url';
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
      <div><Link to={`/example/two-deep${queryString}${hashFragment}`}>
        {linkText}
      </Link></div>
    );
  }

  return (
    <div>
      <div>
        <div>{queryStringTitle()}</div>
        <ul>
          {Object.keys(location.query).map((field, index) =>
            <li key={index}>
              {field}: {location.query[field]}
            </li>
          )}
        </ul>
      </div>
      <div>
        <div>{hashFragmentTitle()}</div>
        <ul>
          {hashPresent ? <li>{location.hash.slice(1)}</li> : undefined}
        </ul>
      </div>
      {linkToShowQueryAndOrHash()}
    </div>
  );
}

ExampleTwoDeepComponent.propTypes = propTypes;

export default ExampleTwoDeepComponent;
