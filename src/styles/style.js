import React from 'react';
import PropTypes from 'prop-types';

const link = {
  normal: {
    borderBottom: '1px dotted rgb(0, 168, 0)',
  },
  hover: {
    borderBottom: '1px solid rgb(0, 168, 0)',
    color: 'black',
  },
  active: 'hover',
  touchActive: {
    borderBottom: '1px dashed rgb(0, 168, 0)',
    color: 'black',
  },
  focusFromTab: {
    outline: '2px solid rgb(0, 152, 0)',
    outlineOffset: '2px',
    color: 'black',
  },
  touchActiveTapOnly: true,
};

export default {
  link,
  p: {
    margin: '3vh 0',
    lineHeight: '1.4',
  },
};

export const Code = ({ children }) => (
  <code
    style={{
      fontFamily: 'monospace',
      fontSize: '15px',
      paddingLeft: '2px',
    }}
  >{children}</code>
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
