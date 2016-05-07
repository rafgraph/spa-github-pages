import React from 'react';

function ExampleTwoDeepComponent({ location }) {

  function queryStringTitle() {
    if (Object.keys(location.query).length === 0) {
      return 'No query string in the url';
    } else {
      return 'The query string field-value pairs are:';
    }
  }

  function hashFragmentTitle() {
    if (location.hash !== '') {
      return 'The hash fragment is:';
    } else {
      return 'No hash frgament in the url';
    }
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
          {location.hash !== '' ? <li>{location.hash.slice(1)}</li> : undefined}
        </ul>
      </div>
    </div>
  )
}

export default ExampleTwoDeepComponent;
