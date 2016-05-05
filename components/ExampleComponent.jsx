import React from 'react';

function ExampleComponent(props) {

  return (
    <div>
      example component
      {props.children}
    </div>
  )
}

export default ExampleComponent;
