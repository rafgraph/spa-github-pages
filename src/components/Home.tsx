import * as React from 'react';
import { InteractiveLink } from '../ui/InteractiveLink';
import { P } from '../ui/Paragraph';
import { styled } from '../stitches.config';

const LinkContainer = styled('span', {
  display: 'block',
  margin: '8px 0',
});

const RepoReadmeLink: React.VFC = () => (
  <InteractiveLink href="https://github.com/rafgraph/spa-github-pages#readme">
    repo readme
  </InteractiveLink>
);

export const Home: React.VFC = () => (
  <div>
    <P>
      This is an example single page app built with React and React&nbsp;Router
      using <code>BrowserRouter</code>. Navigate with the links below and
      refresh the page or copy/paste the url to test out the redirect
      functionality deployed to overcome GitHub&nbsp;Pages incompatibility with
      single page apps (like this one).
    </P>
    <P>
      Please see the <RepoReadmeLink /> for instructions on how to use this
      boilerplate to deploy your own single page app using GitHub Pages.
    </P>
    <P>
      <LinkContainer>
        <InteractiveLink to="/example">Example page</InteractiveLink>
      </LinkContainer>
      <LinkContainer>
        <InteractiveLink to="/example/two-deep?field1=foo&field2=bar#boom!">
          Example two deep with query and hash
        </InteractiveLink>
      </LinkContainer>
    </P>
    <P>
      <InteractiveLink to="/sitemap-link-generator">
        Sitemap Link Generator
      </InteractiveLink>
    </P>
  </div>
);
