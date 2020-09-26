import React, { useState } from 'react';

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
    <>
      <div>
        <input
          type="number"
          min="0"
          step="1"
          onChange={(e) => setSegments(e.target.value)}
          value={segments}
        />
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
      </div>
      <div>{sitemapLink || 'Please enter a valid url'}</div>
    </>
  );
}
