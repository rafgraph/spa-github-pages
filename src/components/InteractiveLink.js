import React from 'react';
import PropTypes from 'prop-types';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';

const linkStyle = {
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

const propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
};

export default function InteractiveLink(props) {
  const as = props.href ? 'a' : Link;
  return <Interactive as={as} {...linkStyle} {...props} />;
}

InteractiveLink.propTypes = propTypes;
