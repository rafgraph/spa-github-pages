import React from 'react';
import { Link } from 'react-router';

function ExampleTwoDeepComponent({ location }) {

  const queryPresent = Object.keys(location.query).length !== 0 ? true : false;
  const hashPresent = location.hash !== '' ? true : false;

  function queryStringTitle() {
    if (queryPresent) {
      return 'The query string field-value pairs are:';
    } else {
      return 'No query string in the url';
    }
  }

  function hashFragmentTitle() {
    if (hashPresent) {
      return 'The hash fragment is:';
    } else {
      return 'No hash frgament in the url';
    }
  }

  function linkToShowQueryAndOrHash() {
    if (queryPresent && hashPresent) return;

    const queryString = (queryPresent ? location.search : '?field1=foo&field2=bar');
    const hashFragment = (hashPresent ? location.hash : '#boom!');

    let linkText = '';
    if (queryPresent && !hashPresent) linkText = 'Show with hash fragment';
    if (!queryPresent && hashPresent) linkText = 'Show with query string';
    if (!queryPresent && !hashPresent) linkText = 'Show with query string and hash fragment';

    return(
      <div><Link to={`/example/two-deep${queryString}${hashFragment}`}>
        {linkText}
      </Link></div>
    );
  }

  return (
    <div>
      <div>
        <div>{queryStringTitle()}</div>
        <ul style={{marginTop: 0}}>
          {Object.keys(location.query).map((field, index) =>
            <li key={index}>
              {field}: {location.query[field]}
            </li>
          )}
        </ul>
      </div>
      <div>
        <div>{hashFragmentTitle()}</div>
        <ul style={{marginTop: 0}}>
          {hashPresent ? <li>{location.hash.slice(1)}</li> : undefined}
        </ul>
      </div>
      {linkToShowQueryAndOrHash()}
    </div>
  )
}

export default ExampleTwoDeepComponent;
