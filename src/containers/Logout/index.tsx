import withAuth from '@/common/hoc/withAuth';
import { logout } from '@/features/authSlice';
import { useAppDispatch } from '@/store/hook';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout({}));
    navigate('/login');
  }, []);
  return <div>logout</div>;
}

export default withAuth(Logout);
