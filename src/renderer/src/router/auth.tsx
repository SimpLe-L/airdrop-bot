import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  requiredPermissions?: string[];
}

const AuthGuard = ({ children, requiredPermissions = [] }: AuthGuardProps) => {
  const { isAuthenticated, hasPermissions } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if (requiredPermissions.length > 0 && !hasPermissions(requiredPermissions)) {
  //   return <Navigate to="/403" replace />;
  // }

  return <>{children}</>;
};

export default AuthGuard;
