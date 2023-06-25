import { IconType } from 'react-icons';
import { FiHome, FiSettings } from 'react-icons/fi';

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
    name: 'Settings',
    path: '/register',
    icon: FiSettings,
  },
];

export const NAVITEMS_MINI: NavItemType[] = [
  {
    name: 'Profile',
    path: '/',
    icon: FiHome,
  },
  {
    name: 'Settings',
    path: '/register',
    icon: FiSettings,
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: FiSettings,
  },
];

export default NAVITEMS;
