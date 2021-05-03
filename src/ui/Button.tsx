import { Interactive } from 'react-interactive';
import { styled } from '../stitches.config';

export const Button = styled(Interactive.Button, {
  color: '$highContrast',
  '&.hover, &.active': {
    color: '$green',
    borderColor: '$green',
  },
  '&.disabled': {
    opacity: 0.5,
  },
  variants: {
    focus: {
      outline: {
        '&.focusFromKey': {
          outline: '2px solid $colors$purple',
          outlineOffset: '2px',
        },
      },
      boxShadow: {
        '&.focusFromKey': {
          boxShadow: '0 0 0 2px $colors$purple',
        },
      },
      boxShadowOffset: {
        '&.focusFromKey': {
          boxShadow:
            '0 0 0 2px $colors$pageBackground, 0 0 0 4px $colors$purple',
        },
      },
    },
  },
  defaultVariants: {
    focus: 'boxShadowOffset',
  },
});
