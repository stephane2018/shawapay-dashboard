import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { tokenManager } from '../lib/token-manager/token-manager';

/**
 * Composant de protection contre les attaques XSS et monitoring de sécurité
 */
export const SecurityMonitor = () => {
  const { isSessionExpired, logout } = useAuthStore();

  useEffect(() => {
    // Détecter les tentatives d'injection XSS
    const detectXSS = () => {
      const url = window.location.href;
      const referrer = document.referrer;
      
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w*=/i,
        /eval\s*\(/i,
      ];

      const isSuspicious = suspiciousPatterns.some(pattern => 
        pattern.test(url) || pattern.test(referrer)
      );

      if (isSuspicious) {
        console.warn('Suspicious activity detected - possible XSS attempt');
        logout();
      }
    };

    // Monitoring des modifications du DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Vérifier les attributs suspects
              ['onclick', 'onload', 'onerror', 'onmouseover'].forEach(attr => {
                if (element.hasAttribute(attr)) {
                  const value = element.getAttribute(attr);
                  if (value && /javascript:|eval|alert/.test(value)) {
                    console.warn('Suspicious script attribute detected');
                    element.removeAttribute(attr);
                  }
                }
              });
            }
          });
        }
      });
    });

    // Observer le document entier
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['onclick', 'onload', 'onerror', 'onmouseover']
    });

    // Nettoyer le localStorage si nécessaire
    const checkLocalStorageIntegrity = () => {
      try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.includes('token') || key.includes('auth')) {
            const value = localStorage.getItem(key);
            if (value && (value.includes('<script') || value.includes('javascript:'))) {
              console.warn('Corrupted localStorage detected, clearing...');
              localStorage.removeItem(key);
              logout();
            }
          }
        });
      } catch (error) {
        console.error('LocalStorage integrity check failed:', error);
      }
    };

    // Vérifications périodiques
    const interval = setInterval(() => {
      detectXSS();
      checkLocalStorageIntegrity();
      
      if (isSessionExpired()) {
        logout();
      }
    }, 30000); // Toutes les 30 secondes

    // Nettoyage
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isSessionExpired, logout]);

  // Ce composant ne rend rien visuellement
  return null;
};

/**
 * Hook pour sécuriser les composants contre les injections
 */
export const useSecurityProtection = () => {
  const sanitizeProps = (props: Record<string, any>): Record<string, any> => {
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(props)) {
      if (typeof value === 'string') {
        // Nettoyer les chaînes de caractères
        sanitized[key] = value
          .replace(/[<>]/g, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+=/gi, '');
      } else if (typeof value === 'object' && value !== null) {
        // Nettoyer récursivement les objets
        sanitized[key] = sanitizeProps(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  };

  const validateUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url, window.location.origin);
      
      // Autoriser seulement les URLs relatives ou du même domaine
      return parsedUrl.origin === window.location.origin || url.startsWith('/');
    } catch {
      return false;
    }
  };

  const createSecureLink = (href: string, children: React.ReactNode) => {
    if (!validateUrl(href)) {
      console.warn('Invalid URL detected:', href);
      return null;
    }
    
    return { href, children };
  };

  return {
    sanitizeProps,
    validateUrl,
    createSecureLink,
  };
};

/**
 * Hook pour le monitoring des performances et erreurs
 */
export const useErrorMonitoring = () => {
  const { logout } = useAuthStore();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Application error:', event.error);
      
      // Si l'erreur est critique, déconnecter l'utilisateur
      if (event.error?.message?.includes('token') || 
          event.error?.message?.includes('auth')) {
        logout();
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      // Si c'est une erreur d'authentification
      if (event.reason?.message?.includes('401') || 
          event.reason?.message?.includes('unauthorized')) {
        logout();
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [logout]);
};
