import React, { PropTypes } from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/exampleComponent.style';

const propTypes = {
  children: PropTypes.element,
};

function ExampleComponent({ children }) {
  return (
    <div>
      <p style={s.p}>
        This is an example page. Refresh the page or copy/paste the url to
        test out the redirect functionality (this same page should load
        after the redirect).
      </p>
      {children ||
        <div style={s.pageLinkContainer}>
          <Interactive
            as={Link}
            {...s.link}
            to="/example/two-deep?field1=foo&field2=bar#boom!"
          >Example two deep with query and hash</Interactive>
        </div>
      }
    </div>
  );
}

ExampleComponent.propTypes = propTypes;

export default ExampleComponent;
