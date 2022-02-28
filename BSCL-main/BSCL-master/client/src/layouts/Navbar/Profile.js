import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/use-auth';

const Profile = (props) => {
  const auth = useAuth();
  const { img, name } = props;

  return (
    <div className="flex flex-row items-center space-x-2 cursor-pointer">
      <img
        onClick={auth.logout}
        alt={name}
        referrerPolicy="no-referrer"
        src={img}
        className="rounded-full h-14 w-14"
      />
      <div className="hidden md:block">
        <p>{name}</p>
        <p className="text-sm text-green-600">Available</p>
      </div>
    </div>
  );
};

Profile.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string
};

Profile.defaultProps = {
  img: 'https://via.placeholder.com/100',
  name: 'Username'
};

export default Profile;
