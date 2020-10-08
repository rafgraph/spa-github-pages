import * as React from 'react';
import * as CSS from 'csstype';
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

type InteractiveLinkProps = {
  children: React.ReactNode;
  style?: CSS.Properties;
} & ({ href: string; to?: never } | { href?: never; to: string });

export const InteractiveLink: React.VFC<InteractiveLinkProps> = (props) => {
  const as = props.href ? 'a' : Link;
  return <Interactive as={as} {...linkStyle} {...props} />;
};
