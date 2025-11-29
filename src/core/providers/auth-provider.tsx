import React, { createContext, useContext } from "react";

interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const value = {
        user: null,
        isAuthenticated: false,
        login: () => { },
        logout: () => { },
        clearUser: () => { },
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
