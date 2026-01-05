import { SecurityMonitor } from '../core/components/security-monitor';
import { useAuthStore } from '../core/store/auth.store';

// Configuration de sécurité pour l'environnement
export const securityConfig = {
  // Clé de chiffrement (doit être définie dans .env)
  encryptionKey: import.meta.env.VITE_ENCRYPTION_KEY || 'shawapay-secure-key-2024',
  
  // Durée de session en millisecondes (30 minutes)
  sessionDuration: 30 * 60 * 1000,
  
  // Durée avant avertissement d'expiration (5 minutes)
  warningDuration: 5 * 60 * 1000,
  
  // Activer le monitoring de sécurité
  enableSecurityMonitoring: true,
  
  // URLs autorisées pour les redirections
  allowedOrigins: [
    window.location.origin,
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  
  // Activer la validation stricte des entrées
  strictInputValidation: true,
  
  // Activer le logging de sécurité
  enableSecurityLogging: true,
};

// Export des hooks et composants de sécurité
export { SecurityMonitor } from '../core/components/security-monitor';
export { useAuthStore } from '../core/store/auth.store';

export { useSecureAuth, useSecureUser, usePermissions } from '../core/hooks/use-secure-auth';
export { CryptoManager } from '../core/lib/crypto-manager';
export { tokenManager } from '../core/lib/token-manager/token-manager';
export { 
  validateLoginCredentials,
  validateUser,
  validateTokenResponse,
  sanitizeInput,
  detectSuspiciousActivity,
  validateAndSanitize
} from '../core/lib/security-validation';

// Types exportés
export type { User, LoginCredentials, TokenResponse } from '../core/lib/security-validation';
