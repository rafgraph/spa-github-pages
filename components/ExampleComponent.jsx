import React from 'react';
import { Link } from 'react-router';

function ExampleComponent(props) {
  console.log(props);
  return (
    <div>
      <p>
        You're at an example page. Refresh the page or copy/paste the url to test out the redirect functionality.
      </p>
      {props.children ? props.children :
        <div><Link to="/example/two-deep?field1=foo&field2=bar">
          Example two deep with query
        </Link></div>}
    </div>
  )
}

export default ExampleComponent;
