import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { tokenManager } from '../lib/token-manager/token-manager';

/**
 * Hook to initialize auth state on app startup
 * Ensures proper synchronization between token manager and auth store
 */
export const useAuthInit = () => {
  const { user, isAuthenticated, setUser, clearSession } = useAuthStore();

  useEffect(() => {
    // Check if we have a valid token but no user data
    const token = tokenManager.getToken();
    
    if (token && !user && !isAuthenticated) {
      console.log('Token found but no user data, clearing session');
      // This can happen if the auth store was cleared but token remains
      clearSession();
    } else if (!token && (user || isAuthenticated)) {
      console.log('No token found but user data exists, clearing session');
      // This can happen if token expired but user data remains
      clearSession();
    }
  }, [user, isAuthenticated, setUser, clearSession]);

  return { isInitialized: true };
};
