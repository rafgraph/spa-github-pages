import React from 'react';
import InteractiveLink from './InteractiveLink';
import s from '../styles/exampleComponent.style';

export default function ExampleComponent() {
  return (
    <div>
      <p style={s.p}>
        This is an example page. Refresh the page or copy/paste the url to test
        out the redirect functionality (this same page should load after the
        redirect).
      </p>
      <div style={s.pageLinkContainer}>
        <InteractiveLink
          {...s.link}
          to="/example/two-deep?field1=foo&field2=bar#boom!"
        >
          Example two deep with query and hash
        </InteractiveLink>
      </div>
    </div>
  );
}
