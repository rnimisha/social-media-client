/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/store/hook';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (OriginalComponent: FC<any>): FC<any> => {
  function WrappedComponent(props: any): JSX.Element {
    const { access_token } = useAppSelector((state) => state.auth);

    if (!access_token || access_token.trim().length === 0) {
      return <Navigate to="/login" replace />;
    }

    return <OriginalComponent {...props} />;
  }

  return WrappedComponent;
};

export default withAuth;
