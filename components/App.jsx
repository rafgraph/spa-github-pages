import React from 'react';
import { Link } from 'react-router';

function App({ children }) {

  return (
    <div>
      <Link to={{ pathname: '/foo', query: { redirect: true, path: '/abc/qwe/fdfg', hash: 'def' } }}>to foo</Link>
      <div>Hello world</div>
      {children}
    </div>
  );
}

export default App;
