import React from 'react';

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

const childLink = {};
Object.keys(link).forEach((key) => {
  if (key !== 'touchActiveTapOnly') {
    childLink[`onParent${key.slice(0, 1).toUpperCase()}${key.slice(1)}`] = link[key];
  }
});

export default {
  link,
  childLink,
  p: {
    margin: '3vh 0',
    lineHeight: '1.4',
  },

  // generate text formatted as code
  code: content => (
    <code
      style={{
        fontFamily: 'monospace',
        fontSize: '15px',
        paddingLeft: '2px',
      }}
    >{content}</code>
  ),

  // custom bullets for li items
  li: (content, props) => (
    <li
      style={{
        paddingLeft: '18px',
        textIndent: '-15px',
        margin: '0.5vh 0',
        listStyle: 'none',
      }}
      {...props}
    >
      <span style={{ paddingRight: '7px' }}>&ndash;</span>
      {content}
    </li>
  ),
};
