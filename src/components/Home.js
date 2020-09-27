import React from 'react';
import InteractiveLink from './InteractiveLink';
import { Code, P } from './UI';

const pageLinkContainerStyle = {
  display: 'block',
  margin: '1vh 0',
};

const RepoReadmeLink = () => (
  <InteractiveLink href="https://github.com/rafgraph/spa-github-pages#readme">
    repo readme
  </InteractiveLink>
);

export default function Home() {
  return (
    <div>
      <P>
        This is an example single page app built with React and
        React&nbsp;Router using <Code>BrowserRouter</Code>. Navigate with the
        links below and refresh the page or copy/paste the url to test out the
        redirect functionality deployed to overcome GitHub&nbsp;Pages
        incompatibility with single page apps (like this one).
      </P>
      <P>
        Please see the <RepoReadmeLink /> for instructions on how to use this
        boilerplate to deploy your own single page app using GitHub Pages.
      </P>
      <P>
        <span style={pageLinkContainerStyle}>
          <InteractiveLink to="/example">Example page</InteractiveLink>
        </span>
        <span style={pageLinkContainerStyle}>
          <InteractiveLink to="/example/two-deep?field1=foo&field2=bar#boom!">
            Example two deep with query and hash
          </InteractiveLink>
        </span>
      </P>
      <P>
        <InteractiveLink to="/sitemap-link-generator">
          Sitemap Link Generator
        </InteractiveLink>
      </P>
    </div>
  );
}
