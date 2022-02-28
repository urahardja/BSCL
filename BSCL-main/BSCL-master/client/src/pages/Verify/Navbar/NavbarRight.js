import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/use-auth';

const NavbarRight = () => {
  const auth = useAuth();

  const displayName = auth.state && auth.state.displayName;
  const photoURL = auth.state && auth.state.photoURL;

  const link = auth.role === 'admin' ? '/students' : '/profile';

  return (
    <div className="flex flex-row items-center space-x-4">
      <Link
        to={link}
        className="text-white hover:bg-green-400 transition-colors ease-in-out duration-150 rounded-md px-3 py-2"
      >
        Dashboard
      </Link>
      <img
        onClick={auth.logout}
        alt={displayName}
        src={photoURL}
        className="rounded-full h-12 w-12 cursor-pointer"
      />
    </div>
  );
};

export default NavbarRight;
