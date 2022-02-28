import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumb = (props) => {
  const { links } = props;

  return (
    <div className="text-sm text-gray-400 py-2">
      <span>/ </span>

      {links.map(({ text, link }, index) => {
        if (index === links.length - 1) {
          return <span key={text}>{text}</span>;
        }

        return (
          <span key={text}>
            <Link className="text-blue-600" to={link}>
              {text}
            </Link>
            <span> / </span>
          </span>
        );
      })}
    </div>
  );
};

Breadcrumb.propTypes = {
  links: PropTypes.array
};

Breadcrumb.defaultProps = {
  links: [{ text: 'Beranda', link: '/' }]
};

export default Breadcrumb;
