import * as React from 'react';
import * as CSS from 'csstype';
import { Interactive } from 'react-interactive';
import { InteractiveLink } from '../ui/InteractiveLink';
import { P } from '../ui/Paragraph';
import { styled } from '../stitches.config';

const InteractiveInput = styled(Interactive.Input, {
  lineHeight: '1.4',
  backgroundColor: '$formElementsBackground',
  padding: '1px 5px',
  border: '1px solid $highContrast',
  borderRadius: '4px',
  '&.focus': {
    borderColor: '$green',
    boxShadow: '0 0 0 1px $colors$green',
  },
  '&.focusFromKey': {
    borderColor: '$purple',
    boxShadow: '0 0 0 1px $colors$purple',
  },
});

export const SitemapLinkGenerator: React.VFC = () => {
  const [url, setUrl] = React.useState('');
  const [segments, setSegments] = React.useState('0');
  let sitemapLink;

  try {
    const l = new URL(url);
    const pathSegmentsToKeep = parseInt(segments);

    // redirect script from 404.html
    sitemapLink =
      l.protocol +
      '//' +
      l.hostname +
      (l.port ? ':' + l.port : '') +
      l.pathname
        .split('/')
        .slice(0, 1 + pathSegmentsToKeep)
        .join('/') +
      '/?/' +
      l.pathname
        .slice(1)
        .split('/')
        .slice(pathSegmentsToKeep)
        .join('/')
        .replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash;
  } catch {}

  return (
    <div>
      <P>
        Use this to generate sitemap links for your site. Search engines
        don&apos;t like 404s so you need to create a sitemap with the redirect
        path for each page instead of the normal path. For more info see the{' '}
        <InteractiveLink href="https://github.com/rafgraph/spa-github-pages#seo">
          readme
        </InteractiveLink>
        .
      </P>
      <P>
        <label>
          <span style={{ marginRight: '10px' }}>
            <code>pathSegmentsToKeep</code> (set in <code>404.html</code>):
          </span>
          <InteractiveInput
            css={{ width: '40px' }}
            type="number"
            min="0"
            step="1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSegments(e.target.value)
            }
            value={segments}
          />
        </label>
      </P>
      <P>
        <label>
          Page URL:
          <InteractiveInput
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
            value={url}
            css={{ width: '100%' }}
          />
        </label>
      </P>
      <P>
        <span style={{ display: 'block' }}>
          Redirect link to use in your sitemap:
        </span>
        <span>{sitemapLink || 'Please enter a valid URL'}</span>
      </P>
    </div>
  );
};
