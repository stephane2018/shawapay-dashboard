import { useMutation } from "@tanstack/react-query";
import { login, type LoginCredentials } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { tokenManager } from "../lib/token-manager/token-manager";
import { useAuthStore } from "../store/auth.store";
import { validateLoginCredentials } from "../lib/security-validation";

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore(state => state.setUser);

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            // Valider et nettoyer les credentials
            const validatedCredentials = validateLoginCredentials(credentials);
            const response = await login(validatedCredentials);
            return response;
        },
        onSuccess: (data: { id: string; token: string; refreshToken?: string; expiresIn?: number; user?: any }, variables) => {
            console.log("Login data:", data);
            
            // Stocker les tokens de manière sécurisée
            if (data.token) {
                tokenManager.setToken(data.token, data.expiresIn);
            }
            
            if (data.refreshToken) {
                tokenManager.setRefreshToken(data.refreshToken);
            }
            
            // Mettre à jour le store avec les données utilisateur
            if (data.user) {
                setUser({
                    ...data.user,
                    lastLogin: new Date().toISOString(),
                });
            } else if (data.id) {
                // Fallback si les données utilisateur ne sont pas complètes
                setUser({
                    id: data.id,
                    username: variables.username || '',
                    role: {
                        id: 'default-role',
                        name: 'ROLE_USER'
                    },
                    lastLogin: new Date().toISOString(),
                });
            }
            
            toast.success("Connexion réussie");
            // Redirect to admin main-account space
            navigate("/main/dashboard");
        },
        onError: (error: any) => {
            toast.error(error.message || "Email ou mot de passe incorrect");
        },
    });
};
