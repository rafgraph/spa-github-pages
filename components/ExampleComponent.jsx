import React from 'react';
import { Link } from 'react-router';

function ExampleComponent({ children }) {
  return (
    <div>
      <p>
        This is an example page. Refresh the page or copy/paste the url to
        test out the redirect functionality (this same page should load
        after the redirect).
      </p>
      {children ? children :
        <div><Link to="/example/two-deep?field1=foo&field2=bar#boom!">
          Example two deep with query and hash
        </Link></div>}
    </div>
  )
}

export default ExampleComponent;
