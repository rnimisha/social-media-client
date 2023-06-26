import { IconType } from 'react-icons';
import { FiHome, FiSettings, FiMessageSquare, FiUser } from 'react-icons/fi';

export type NavItemType = {
  name: string;
  path: string;
  icon: IconType;
};

export const NAVITEMS: NavItemType[] = [
  {
    name: 'Home',
    path: '/',
    icon: FiHome,
  },
  {
    name: 'Messages',
    path: '/messages',
    icon: FiMessageSquare,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: FiUser,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: FiSettings,
  },
];

export const NAVITEMS_MINI: NavItemType[] = [
  {
    name: 'Profile',
    path: '/profile',
    icon: FiHome,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: FiSettings,
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: FiSettings,
  },
];

export default NAVITEMS;
