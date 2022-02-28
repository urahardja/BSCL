import {
  UserIcon,
  DocumentSearchIcon,
  UsersIcon,
  DocumentAddIcon
} from '@heroicons/react/outline';

const studentMenus = [
  {
    icon: <UserIcon height={24} />,
    text: 'Profile',
    exact: false,
    link: '/profile'
  },
  {
    icon: <DocumentAddIcon height={24} />,
    text: 'Validate Diploma',
    exact: false,
    link: '/validate'
  },
  {
    icon: <DocumentSearchIcon height={24} />,
    text: 'Verify Diploma',
    exact: false,
    link: '/verify'
  }
];

const adminMenus = [
  {
    icon: <UsersIcon height={24} />,
    text: 'Students',
    exact: false,
    link: '/students'
  },
  {
    icon: <DocumentSearchIcon height={24} />,
    text: 'Verify Diploma',
    exact: false,
    link: '/verify'
  }
];

const menus = (role = 'student') => {
  return role === 'student' ? studentMenus : adminMenus;
};

export default menus;
