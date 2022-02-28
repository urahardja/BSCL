import React from 'react';

import { useAuth } from '../../../hooks/use-auth';
import NavbarLogo from './NavbarLogo';
import NavbarRight from './NavbarRight';
import LoginButton from './LoginButton';

const Navbar = () => {
  const auth = useAuth();

  return (
    <nav className="bg-green-500 shadow-sm mb-12">
      <div className="flex flex-row justify-between px-3 py-2">
        <NavbarLogo>ABC</NavbarLogo>
        {!auth.state ? <LoginButton /> : <NavbarRight />}
      </div>
    </nav>
  );
};

export default Navbar;
