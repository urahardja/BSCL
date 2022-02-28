import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../../images/logo.png';

const NavbarLogo = (props) => {
  const { children, img, link } = props;

  return (
    <Link to={link} className="flex flex-row items-center space-x-2">
      <img alt="ABC" className="h-12" src={img} />
      <p className="text-xl font-semibold text-white">{children}</p>
    </Link>
  );
};

NavbarLogo.propTypes = {
  children: PropTypes.string,
  logo: PropTypes.string,
  link: PropTypes.string
};

NavbarLogo.defaultProps = {
  children: 'Logo',
  img: logo,
  link: '/'
};

export default NavbarLogo;
