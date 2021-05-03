import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { InteractiveLink } from '../ui/InteractiveLink';
import { P } from '../ui/Paragraph';
import { styled } from '../stitches.config';

const StyledLi = styled('li', {
  paddingLeft: '18px',
  textIndent: '-15px',
  margin: '4px 0',
  listStyle: 'none',
});

interface LiProps {
  children: React.ReactText;
}
const Li: React.VFC<LiProps> = ({ children }) => (
  <StyledLi>
    <span style={{ paddingRight: '7px' }}>&ndash;</span>
    {children}
  </StyledLi>
);

const LineContainer = styled('div', {
  margin: '20px 0',
});

export const ExampleTwoDeepComponent: React.VFC<RouteComponentProps> = ({
  location,
}) => {
  const queryPresent = location.search !== '';
  const hashPresent = location.hash !== '';

  function queryStringTitle() {
    if (queryPresent) return 'The query string field-value pairs are:';
    return 'No query string in the url';
  }

  function hashFragmentTitle() {
    if (hashPresent) return 'The hash fragment is:';
    return 'No hash fragment in the url';
  }

  function linkToShowQueryAndOrHash() {
    if (queryPresent && hashPresent) return null;

    const queryString = queryPresent
      ? location.search
      : '?field1=foo&field2=bar';
    const hashFragment = hashPresent ? location.hash : '#boom!';

    let linkText = '';
    if (queryPresent && !hashPresent) linkText = 'Show with hash fragment';
    if (!queryPresent && hashPresent) linkText = 'Show with query string';
    if (!queryPresent && !hashPresent)
      linkText = 'Show with query string and hash fragment';

    return (
      <LineContainer>
        <InteractiveLink to={`/example/two-deep${queryString}${hashFragment}`}>
          {linkText}
        </InteractiveLink>
      </LineContainer>
    );
  }

  function parseQueryString() {
    if (!queryPresent) return [];
    return location.search
      .replace('?', '')
      .split('&')
      .map((fvPair) => fvPair.split('='))
      .map((pair) => [pair[0], pair.slice(1).join('=')]);
  }

  return (
    <div>
      <P>
        This is an example page with query string and hash fragment. Refresh the
        page or copy/paste the url to test out the redirect functionality (this
        same page should load after the redirect).
      </P>
      <LineContainer>
        <div>{queryStringTitle()}</div>
        <ul>
          {parseQueryString().map((pair, index) => (
            <Li
              key={`${pair[0]}${pair[1]}${index}`}
            >{`${pair[0]}: ${pair[1]}`}</Li>
          ))}
        </ul>
      </LineContainer>
      <LineContainer>
        <div>{hashFragmentTitle()}</div>
        <ul>{hashPresent && <Li>{location.hash.slice(1)}</Li>}</ul>
      </LineContainer>
      {linkToShowQueryAndOrHash()}
    </div>
  );
};
