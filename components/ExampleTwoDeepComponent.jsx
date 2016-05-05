import React from 'react';

function ExampleTwoDeepComponent(props) {
  console.log(props);
  // debugger;
  function queryStringTitle() {
    if (Object.keys(props.location.query).length === 0) {
      return 'No query string in the url';
    } else {
      return 'The query string field-value pairs are:';
    }
  }

  return (
    <div>
      <div>{queryStringTitle()}</div>
      <ul style={{marginTop: 0}}>
        {Object.keys(props.location.query).map((p, index) =>
          <li key={index}>
            {p}: {props.location.query[p]}
          </li>
        )}
      </ul>
    </div>
  )
}

export default ExampleTwoDeepComponent;

// {props.location.query.keys.map()}
