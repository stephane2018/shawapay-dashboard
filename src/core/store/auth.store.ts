import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { tokenManager } from '../lib/token-manager/token-manager';
import { CryptoManager } from '../lib';

export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  role: Role;
  caisseId?: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionTimeout: number;
  lastActivity: number;
}

export interface AuthActions {
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  clearSession: () => void;
  updateActivity: () => void;
  isSessionExpired: () => boolean;
  refreshToken: () => Promise<void>;
}

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const WARNING_DURATION = 5 * 60 * 1000; // 5 minutes avant expiration

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State initial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      sessionTimeout: Date.now() + SESSION_DURATION,
      lastActivity: Date.now(),

      // Actions
      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          sessionTimeout: Date.now() + SESSION_DURATION,
          lastActivity: Date.now(),
        });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
            lastActivity: Date.now(),
          });
        }
      },

      logout: () => {
        tokenManager.clearToken();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          sessionTimeout: 0,
          lastActivity: 0,
        });
      },

      clearSession: () => {
        tokenManager.clearToken();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          sessionTimeout: 0,
          lastActivity: 0,
        });
      },

      updateActivity: () => {
        const now = Date.now();
        set({
          lastActivity: now,
          sessionTimeout: now + SESSION_DURATION,
        });
      },

      isSessionExpired: () => {
        const { sessionTimeout, lastActivity } = get();
        const now = Date.now();
        return now > sessionTimeout || (now - lastActivity) > SESSION_DURATION;
      },

      refreshToken: async () => {
        try {
          // Implémenter la logique de rafraîchissement du token
          const newToken = await tokenManager.refreshAccessToken();
          if (newToken) {
            set({
              sessionTimeout: Date.now() + SESSION_DURATION,
              lastActivity: Date.now(),
            });
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().clearSession();
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          try {
            const encrypted = localStorage.getItem(name);
            if (!encrypted) return null;
            const decrypted = CryptoManager.decrypt(encrypted);
            const parsed = JSON.parse(decrypted);
            console.log('Retrieved auth data from storage:', parsed);
            return parsed;
          } catch (error) {
            console.error('Failed to decrypt auth data:', error);
            // Clear corrupted data
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            console.log('Storing auth data:', value);
            const encrypted = CryptoManager.encrypt(JSON.stringify(value));
            localStorage.setItem(name, encrypted);
          } catch (error) {
            console.error('Failed to encrypt auth data:', error);
          }
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      })),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionTimeout: state.sessionTimeout,
        lastActivity: state.lastActivity,
      }),
      version: 1,
      onRehydrateStorage: () => (state) => {
        console.log('Auth store rehydrated:', state);
        
        // Migration: Handle old data structure (string role + permissions array)
        if (state && state.user) {
          const user = state.user as any;
          
          // Check if user has old data structure
          if (typeof user.role === 'string' && Array.isArray(user.permissions)) {
            console.log('Migrating auth data from old structure');
            
            // Convert old structure to new structure
            const rolePermission = user.permissions.find((p: any) => p.name) || { id: 'default-role', name: user.role || 'USER' };
            
            state.user = {
              ...user,
              role: rolePermission,
              // Remove old permissions array as it's now part of role
              permissions: undefined
            };
            
            console.log('Migrated user data:', state.user);
          }
        }
        
        // Check if session is expired on rehydration
        if (state && state.user && state.isAuthenticated) {
          const now = Date.now();
          const sessionTimeout = state.sessionTimeout || 0;
          const lastActivity = state.lastActivity || 0;
          
          if (now > sessionTimeout || (now - lastActivity) > SESSION_DURATION) {
            console.log('Session expired during rehydration, clearing...');
            state.user = null;
            state.isAuthenticated = false;
            state.sessionTimeout = 0;
            state.lastActivity = 0;
            tokenManager.clearToken();
          }
        }
      },
    }
  )
);

// Hook pour vérifier automatiquement l'expiration de session
export const useSessionMonitor = () => {
  const { isSessionExpired, refreshToken, logout } = useAuthStore();

  const checkSession = async () => {
    if (isSessionExpired()) {
      await logout();
      return true;
    }
    
    const state = useAuthStore.getState();
    const timeUntilExpiry = state.sessionTimeout - Date.now();
    
    if (timeUntilExpiry < WARNING_DURATION && timeUntilExpiry > 0) {
      try {
        await refreshToken();
      } catch (error) {
        await logout();
      }
    }
    
    return false;
  };

  return { checkSession };
};
