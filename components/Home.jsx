import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div>
      <div>Hello world</div>
      <Link to={{ pathname: '/one/two', query: { a: 'b', c: 'd' }, hash: '#def' }}>to foo</Link>
    </div>
  );
}

export default Home;
