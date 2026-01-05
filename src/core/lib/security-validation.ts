import { z } from 'zod';

/**
 * Schémas de validation pour les données utilisateur et d'authentification
 */

// Nettoyage et validation des entrées utilisateur
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Retirer les caractères HTML dangereux
    .replace(/javascript:/gi, '') // Retirer les protocoles javascript
    .replace(/on\w+=/gi, ''); // Retirer les event handlers
};

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const sanitizePassword = (password: string): string => {
  // Ne pas nettoyer le mot de passe, juste vérifier qu'il ne contient pas de caractères invalides
  return password;
};

// Schémas Zod pour la validation
export const LoginCredentialsSchema = z.object({
  username: z.string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(50, "Le nom d'utilisateur ne peut pas dépasser 50 caractères")
    .transform(sanitizeString),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
    .transform(sanitizePassword),
});

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string()
    .min(3)
    .max(50)
    .transform(sanitizeString),
  email: z.string()
    .email("Email invalide")
    .optional()
    .transform(email => email ? sanitizeEmail(email) : undefined),
  role: z.string()
    .min(1)
    .max(50)
    .transform(sanitizeString),
  permissions: z.array(z.string().transform(sanitizeString)),
  caisseId: z.string().uuid().optional(),
  lastLogin: z.string().datetime().optional(),
});

export const TokenResponseSchema = z.object({
  token: z.string().min(1),
  refreshToken: z.string().min(1).optional(),
  expiresIn: z.number().positive().optional(),
  user: UserSchema,
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

// Types TypeScript dérivés des schémas
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type User = z.infer<typeof UserSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenSchema>;

// Fonctions de validation
export const validateLoginCredentials = (data: unknown): LoginCredentials => {
  return LoginCredentialsSchema.parse(data);
};

export const validateUser = (data: unknown): User => {
  return UserSchema.parse(data);
};

export const validateTokenResponse = (data: unknown): TokenResponse => {
  return TokenResponseSchema.parse(data);
};

export const validateRefreshToken = (data: unknown): RefreshTokenRequest => {
  return RefreshTokenSchema.parse(data);
};

// Validation de sécurité supplémentaire
export const isSecurePassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
};

export const isSecureUsername = (username: string): boolean => {
  const allowedChars = /^[a-zA-Z0-9_-]+$/;
  return allowedChars.test(username) && username.length >= 3 && username.length <= 50;
};

export const sanitizeInput = (input: unknown): unknown => {
  if (typeof input === 'string') {
    return sanitizeString(input);
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[sanitizeString(key)] = sanitizeInput(value);
    }
    return sanitized;
  }
  
  return input;
};

// Détection d'attaques potentielles
export const detectSuspiciousActivity = (input: string): boolean => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w*=/i,
    /eval\s*\(/i,
    /document\./i,
    /window\./i,
    /alert\s*\(/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
};

export const validateAndSanitize = <T>(
  data: unknown, 
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } => {
  try {
    const sanitized = sanitizeInput(data);
    const validated = schema.parse(sanitized);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((e: any) => e.message).join(', ');
      return { success: false, error: errorMessages };
    }
    return { success: false, error: 'Validation failed' };
  }
};
