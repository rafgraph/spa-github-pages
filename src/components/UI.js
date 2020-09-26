import React from 'react';
import PropTypes from 'prop-types';

export const P = ({ children, style, ...rest }) => (
  <p
    style={{
      margin: '3vh 0',
      lineHeight: '1.4',
      ...style,
    }}
    {...rest}
  >
    {children}
  </p>
);

P.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export const Code = ({ children }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: '15px',
      paddingLeft: '2px',
    }}
  >
    {children}
  </code>
);

Code.propTypes = {
  children: PropTypes.string.isRequired,
};

export const Li = ({ children, ...rest }) => (
  <li
    style={{
      paddingLeft: '18px',
      textIndent: '-15px',
      margin: '0.5vh 0',
      listStyle: 'none',
    }}
    {...rest}
  >
    <span style={{ paddingRight: '7px' }}>&ndash;</span>
    {children}
  </li>
);

Li.propTypes = {
  children: PropTypes.string.isRequired,
};
