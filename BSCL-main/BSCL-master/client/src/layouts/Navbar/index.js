import React from 'react';
import { MenuIcon } from '@heroicons/react/outline';

import { useAuth } from '../../hooks/use-auth';
import { useSidebar } from '../../hooks/use-sidebar';
import SearchForm from './SearchForm';
import Profile from './Profile';

const Navbar = () => {
  const auth = useAuth();
  const sidebar = useSidebar();

  let navClass;
  if (sidebar.state === 'open') {
    navClass =
      'fixed top-4 left-4 right-4 overflow-hidden bg-white rounded-2xl shadow-sm transition-margin duration-500 ease-in-out px-2 py-2 lg:ml-64 z-30';
  }

  if (sidebar.state === 'close') {
    navClass =
      'fixed top-4 left-4 right-4 overflow-hidden bg-white rounded-2xl shadow-sm transition-margin duration-500 ease-in-out px-2 py-2 z-30';
  }

  if (sidebar.state === 'mini') {
    navClass =
      'fixed top-4 left-4 right-4 overflow-hidden bg-white rounded-2xl shadow-sm transition-margin duration-500 ease-in-out px-2 py-2 ml-14 z-30';
  }

  const displayName = auth.state && auth.state.displayName;
  const photoURL = auth.state && auth.state.photoURL;

  return (
    <>
      <nav className={navClass}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-4">
            <MenuIcon
              onClick={sidebar.toggle}
              height={24}
              className="cursor-pointer"
            />
            <SearchForm />
          </div>

          <Profile name={displayName} img={photoURL} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
