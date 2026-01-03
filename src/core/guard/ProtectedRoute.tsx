import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { tokenManager } from '@/core/lib/token-manager./token-manager'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true)
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    const tokenExists = tokenManager.hasToken()
    setHasToken(tokenExists)
    setIsChecking(false)
  }, [])

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg animate-pulse">
            S
          </div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!hasToken) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
