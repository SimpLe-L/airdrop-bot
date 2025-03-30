import { useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const { user, permissions, setUser, logout } = useAuthStore();

  const isAuthenticated = !!user;
  console.log(isAuthenticated)
  const hasPermissions = useCallback(
    (requiredPermissions: string[]) => {
      if (!permissions || permissions.length === 0) return false;
      return requiredPermissions.every(permission => permissions.includes(permission));
    },
    [permissions]
  );

  return {
    user,
    isAuthenticated,
    permissions,
    hasPermissions,
    setUser,
    logout
  };
};
