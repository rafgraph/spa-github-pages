import * as React from 'react';
import { Interactive, InteractiveExtendableProps } from 'react-interactive';
import { Link } from 'react-router-dom';
import { styled } from '../stitches.config';

type LinkUnionProps =
  | (InteractiveExtendableProps<typeof Link> & { href?: never })
  | (InteractiveExtendableProps<'a'> & { to?: never; replace?: never });

// if there is a `to` prop then render a React Router <Link>,
// otherwise render a regular anchor tag <a>
const LinkUnion = React.forwardRef<HTMLAnchorElement, LinkUnionProps>(
  (props, ref) => {
    // React Router's <Link> component doesn't have a disabled state
    // so when disabled always render as="a" and remove router specific props
    const As = props.to && !props.disabled ? Link : 'a';
    let passThroughProps = props;
    if (props.disabled) {
      const { to, replace, ...propsWithoutRouterProps } = props;
      passThroughProps = propsWithoutRouterProps;
    }

    return <Interactive {...passThroughProps} as={As} ref={ref} />;
  },
);

export const InteractiveLink = styled(LinkUnion, {
  color: '$highContrast',

  // can't use shorthand for textDecoration because of bug in Safari v14
  // textDecoration: 'underline $colors$green dotted from-font',
  textDecorationLine: 'underline',
  textDecorationStyle: 'dotted',
  textDecorationColor: '$green',
  textDecorationThickness: 'from-font',

  // padding used to provide offset for boxShadow used in focus styles
  // margin undoes padding for page layout so boxShadow works like outline
  padding: '2px 3px',
  margin: '-2px -3px',
  // this is the main reason to use boxShadow instead of outline for focus styles,
  // with outline can only have square corners,
  // with boxShadow can use borderRadius to soften the corners
  borderRadius: '3px',

  '&.hover, &.mouseActive': {
    textDecorationColor: '$green',
    textDecorationStyle: 'solid',
  },
  '&.touchActive, &.keyActive': {
    color: '$green',
    textDecorationColor: '$green',
    textDecorationStyle: 'solid',
  },
  '&.focusFromKey': {
    boxShadow: '0 0 0 2px $colors$purple',
  },
});
