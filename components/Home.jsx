import React from 'react';
import { Link } from 'react-router';

function Home() {
  const query = {
    redirect: true,
    path: '/abc/qwe/fdfg',
    hash: 'def'
  }

  return (
    <div>
      <div>Hello world</div>
      <Link to={{ pathname: '/foo', query: query }}>to foo</Link>
    </div>
  );
}

export default Home;
