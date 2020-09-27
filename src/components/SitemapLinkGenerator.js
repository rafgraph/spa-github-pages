import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Interactive from 'react-interactive';
import InteractiveLink from './InteractiveLink';
import { P, Code } from './UI';

const propTypes = {
  style: PropTypes.object,
};

const Input = ({ style, ...rest }) => (
  <Interactive
    as="input"
    focus={{
      outline: '2px solid rgb(0, 152, 0)',
      outlineOffset: '-1px',
    }}
    style={{
      lineHeight: '1.4',
      backgroundColor: 'white',
      padding: '1px 5px',
      border: '1px solid black',
      borderRadius: '0',
      WebkitAppearance: 'none',
      ...style,
    }}
    {...rest}
  />
);

Input.propTypes = propTypes;

export default function SitemapLinkGenerator() {
  const [url, setUrl] = useState('');
  const [segments, setSegments] = useState('0');
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
    // eslint-disable-next-line no-empty
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
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span style={{ marginRight: '10px' }}>
            <Code>pathSegmentsToKeep</Code> (set in <Code>404.html</Code>):
          </span>
          <Input
            style={{ width: '40px' }}
            type="number"
            min="0"
            step="1"
            onChange={(e) => setSegments(e.target.value)}
            value={segments}
          />
        </label>
      </P>
      <P>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Page URL:
          <Input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            style={{ width: '100%' }}
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
}
