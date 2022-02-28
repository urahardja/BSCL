import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../images/logo.png';

import { useSidebar } from '../../hooks/use-sidebar';

const SidebarLogo = (props) => {
  const sidebar = useSidebar();
  const { children, img, link } = props;

  let logoTextClass;
  if (sidebar.state === 'mini') {
    logoTextClass =
      'sidebar-logo-text font-semibold text-center text-2xl whitespace-nowrap opacity-0 transition-opacity duration-300 ease-in-out';
  } else {
    logoTextClass =
      'sidebar-logo-text font-semibold text-center text-2xl whitespace-nowrap opacity-100 transition-opacity duration-300 ease-in-out';
  }

  return (
    <Link
      onClick={sidebar.close}
      to={link}
      className="flex flex-row items-center space-x-2 pl-1"
    >
      <img
        alt={children}
        src={img}
        className="h-12"
        style={{ marginLeft: '-0.25px' }}
      />
      <span className={logoTextClass}>{children}</span>
    </Link>
  );
};

SidebarLogo.propTypes = {
  children: PropTypes.string,
  img: PropTypes.string,
  link: PropTypes.string
};

SidebarLogo.defaultProps = {
  children: 'Logo',
  img: logo,
  link: '/'
};

export default SidebarLogo;
