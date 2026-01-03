import { useMutation } from "@tanstack/react-query";
import { login, type LoginCredentials } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { tokenManager } from "../lib/token-manager./token-manager";

export const useLoginMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => login(credentials),
        onSuccess: (data: { id: string; token: string }) => {
            console.log("Login data:", data);
            if (data.token) {
                tokenManager.setToken(data.token);
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
