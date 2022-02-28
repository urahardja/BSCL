import React from 'react';
import { useAuth } from '../../../hooks/use-auth';

const LoginButton = () => {
  const auth = useAuth();
  return (
    <button
      onClick={auth.login}
      className="flex flex-row items-center space-x-2 bg-white rounded-md px-3 py-2"
    >
      <span>
        <img
          alt="google"
          className="h-5 w-5 rounded-md"
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        />
      </span>
      <span>Login with Rinfo</span>
    </button>
  );
};

export default LoginButton;
