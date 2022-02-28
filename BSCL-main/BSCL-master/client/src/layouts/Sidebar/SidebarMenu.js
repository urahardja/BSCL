import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSidebar } from '../../hooks/use-sidebar';

const SidebarMenu = (props) => {
  const sidebar = useSidebar();
  const { children, icon, exact, link } = props;

  let navLinkMenuClass;
  if (sidebar.state === 'mini') {
    navLinkMenuClass =
      'sidebar-menu-link-text inline-block whitespace-nowrap opacity-0 transition-opacity duration-300 ease-in-out ml-4';
  } else {
    navLinkMenuClass =
      'sidebar-menu-link-text inline-block whitespace-nowrap opacity-100 transition-opacity duration-300 ease-in-out ml-4';
  }

  return (
    <NavLink
      onClick={sidebar.close}
      exact={exact}
      to={link}
      className="sidebar-menu-link block whitespace-nowrap hover:bg-green-700 rounded-2xl transition-colors duration-200 ease-in-out px-2 py-3"
    >
      <span className="inline-block align-bottom">{icon}</span>
      <p className={navLinkMenuClass}>{children}</p>
    </NavLink>
  );
};

export default SidebarMenu;
