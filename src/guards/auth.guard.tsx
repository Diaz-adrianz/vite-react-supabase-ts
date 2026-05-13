import { useAuth } from '@/contexts/auth.context';
import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({
  mode = null,
  children,
}: {
  mode?: 'redirect' | null;
  children: ReactNode;
}) => {
  const { user, isLoading } = useAuth();

  const hasAccess = user !== null;

  if (!isLoading && !hasAccess)
    return mode == 'redirect' ? <Navigate to="/auth/sign-in" replace /> : null;

  return children;
};

export default AuthGuard;
