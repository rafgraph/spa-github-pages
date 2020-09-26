import React from 'react';
import InteractiveLink from './InteractiveLink';
import { P } from './UI';

const pageLinkContainerStyle = {
  margin: '1vh 0',
};

export default function ExampleComponent() {
  return (
    <div>
      <P>
        This is an example page. Refresh the page or copy/paste the url to test
        out the redirect functionality (this same page should load after the
        redirect).
      </P>
      <div style={pageLinkContainerStyle}>
        <InteractiveLink to="/example/two-deep?field1=foo&field2=bar#boom!">
          Example two deep with query and hash
        </InteractiveLink>
      </div>
    </div>
  );
}
