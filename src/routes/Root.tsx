import Navbar from '@/components/layout/Navbar';
import { Outlet } from 'react-router-dom';

function Root(): JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Root;
