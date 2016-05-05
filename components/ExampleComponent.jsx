import React from 'react';
import { Link } from 'react-router';

function ExampleComponent(props) {
  console.log(props);
  return (
    <div>
      <p>
        You're at an example page. Refresh the page or copy/paste the url to test out React for GitHub's redirect functionality.
      </p>
      {props.children ? props.children :
        <div><Link to="/example/two-deep?param1=foo&param2=bar">
          Example two deep with query
        </Link></div>}
    </div>
  )
}

export default ExampleComponent;
