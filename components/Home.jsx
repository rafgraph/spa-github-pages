import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div>
      <p>Description... (todo)</p>
      <div><Link to="/example">Example page</Link></div>
      <div><Link to="/example/two-deep?field1=foo&field2=bar">Example two deep with query</Link></div>
    </div>
  );
}

export default Home;
