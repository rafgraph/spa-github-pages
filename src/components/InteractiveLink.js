import React from 'react';
import PropTypes from 'prop-types';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import s from '../styles/style';

const propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
};

export default function InteractiveLink(props) {
  const as = props.href ? 'a' : Link;
  return <Interactive as={as} {...s.link} {...props} />;
}

InteractiveLink.propTypes = propTypes;
