import { useAuthStore } from '../store/auth.store';
import { tokenManager } from '../lib/token-manager/token-manager';
import { useEffect } from 'react';

/**
 * Hook sécurisé pour accéder aux données utilisateur
 */
export const useSecureUser = () => {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const updateUser = useAuthStore(state => state.updateUser);
  
  return {
    user,
    isAuthenticated,
    updateUser,
    // Accès sécurisé aux propriétés utilisateur
    getUserProperty: (property: keyof typeof user) => user?.[property],
    hasPermission: (permission: string) => user?.role?.name === permission || false,
    hasRole: (role: string) => user?.role?.name === role,
  };
};

/**
 * Hook pour la gestion sécurisée de l'authentification
 */
export const useSecureAuth = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    setUser, 
    logout, 
    updateActivity,
    isSessionExpired,
    refreshToken
  } = useAuthStore();

  // Auto-refresh token et monitoring d'activité
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        await tokenManager.refreshTokenIfNeeded();
        updateActivity();
        
        if (isSessionExpired()) {
          await logout();
        }
      } catch (error) {
        console.error('Auth monitoring error:', error);
        await logout();
      }
    }, 60000); // Vérifier chaque minute

    return () => clearInterval(interval);
  }, [isAuthenticated, logout, updateActivity, isSessionExpired]);

  // Monitoring d'activité utilisateur
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleActivity = () => {
      updateActivity();
    };

    // Écouter les événements d'activité
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [isAuthenticated, updateActivity]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login: async (credentials: any) => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error('Login failed');

        const { user: userData, token, refreshToken, expiresIn } = await response.json();
        
        // Stocker les tokens de manière sécurisée
        tokenManager.setToken(token, expiresIn);
        if (refreshToken) {
          tokenManager.setRefreshToken(refreshToken);
        }

        // Mettre à jour le store
        setUser({
          ...userData,
          lastLogin: new Date().toISOString(),
        });

        return userData;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    logout: async () => {
      try {
        // Appeler l'API de logout si nécessaire
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenManager.getToken()}`,
          },
        });
      } catch (error) {
        console.error('Logout API error:', error);
      } finally {
        // Toujours nettoyer localement
        await logout();
      }
    },
    refreshToken,
  };
};

/**
 * Hook pour la validation des permissions
 */
export const usePermissions = () => {
  const user = useAuthStore(state => state.user);
  
  const checkPermission = (permission: string | string[]) => {
    if (!user?.role?.name) return false;
    
    if (Array.isArray(permission)) {
      return permission.includes(user.role.name);
    }
    
    return user.role.name === permission;
  };

  const checkRole = (role: string | string[]) => {
    if (!user?.role?.name) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role.name);
    }
    
    return user.role.name === role;
  };

  const canAccess = (requiredPermissions?: string[], requiredRoles?: string[]) => {
    if (!user) return false;
    
    const hasPermissions = !requiredPermissions || checkPermission(requiredPermissions);
    const hasRoles = !requiredRoles || checkRole(requiredRoles);
    
    return hasPermissions && hasRoles;
  };

  return {
    checkPermission,
    checkRole,
    canAccess,
    permissions: [user?.role?.name].filter(Boolean) || [],
    role: user?.role?.name,
  };
};
