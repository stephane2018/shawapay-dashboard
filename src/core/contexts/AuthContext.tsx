'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface User {
    id: string
    email: string
    name: string
    role: 'admin' | 'user'
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    register: (userData: RegisterData) => Promise<void>
}

interface RegisterData {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = () => {
            const storedUser = localStorage.getItem('shawapay_user')
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser))
                } catch (error) {
                    console.error('Error parsing stored user:', error)
                    localStorage.removeItem('shawapay_user')
                }
            }
            setIsLoading(false)
        }

        checkAuth()
    }, [])

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true)
        try {
            // TODO: Replace with actual API call
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock user data
            const mockUser: User = {
                id: '1',
                email,
                name: 'Stephane Davy',
                role: 'admin'
            }

            setUser(mockUser)
            localStorage.setItem('shawapay_user', JSON.stringify(mockUser))
            localStorage.setItem('shawapay_token', 'mock-jwt-token')
        } catch (error) {
            console.error('Login error:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }, [])

    const register = useCallback(async (userData: RegisterData) => {
        setIsLoading(true)
        try {
            // TODO: Replace with actual API call
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock user data
            const mockUser: User = {
                id: '1',
                email: userData.email,
                name: `${userData.firstName} ${userData.lastName}`,
                role: 'user'
            }

            setUser(mockUser)
            localStorage.setItem('shawapay_user', JSON.stringify(mockUser))
            localStorage.setItem('shawapay_token', 'mock-jwt-token')
        } catch (error) {
            console.error('Register error:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        localStorage.removeItem('shawapay_user')
        localStorage.removeItem('shawapay_token')
        window.location.href = '/login'
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
