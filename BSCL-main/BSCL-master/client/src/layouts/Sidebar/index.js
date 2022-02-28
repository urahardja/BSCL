import React from 'react';

import { useAuth } from '../../hooks/use-auth';
import { useSidebar } from '../../hooks/use-sidebar';
import menus from './_menus';
import SidebarLogo from './SidebarLogo';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  const auth = useAuth();
  const sidebar = useSidebar();

  let asideClass;
  if (sidebar.state === 'open') {
    asideClass =
      'fixed top-0 left-0 text-white bg-green-600 overflow-hidden transition-width duration-500 ease-in-out h-full w-64 py-4 z-50';
  }

  if (sidebar.state === 'close') {
    asideClass =
      'fixed top-0 left-0 text-white bg-green-600 overflow-hidden transition-width duration-500 ease-in-out h-full w-0 py-4 z-50';
  }

  if (sidebar.state === 'mini') {
    asideClass =
      'fixed top-0 left-0 text-white bg-green-600 overflow-hidden transition-width duration-500 ease-in-out h-full w-14 py-4 z-50';
  }

  const overlayDivClass =
    sidebar.state === 'open'
      ? 'fixed top-0 left-0 bg-black opacity-50 transition-opacity duration-500 ease-in-out h-full w-full z-40'
      : 'fixed top-0 left-0 bg-black opacity-0 transition-opacity duration-500 ease-in-out h-0 w-0 z-40';

  const sidebarMenus =
    auth.role === 'admin' ? menus('admin') : menus('student');

  return (
    <>
      <aside className={asideClass}>
        <SidebarLogo>ABC</SidebarLogo>

        <ul className="space-y-4 px-2 mt-8">
          {sidebarMenus.map(({ text, icon, exact, link }, index) => {
            return (
              <li key={index}>
                <SidebarMenu icon={icon} exact={exact} link={link}>
                  {text}
                </SidebarMenu>
              </li>
            );
          })}
        </ul>
      </aside>

      {window.innerWidth < 1024 && (
        <div onClick={sidebar.toggle} className={overlayDivClass} />
      )}
    </>
  );
};

export default Sidebar;
