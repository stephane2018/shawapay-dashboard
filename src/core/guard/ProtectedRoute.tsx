import { Navigate } from "react-router-dom"
import { type ReactNode } from "react"
import { hasRole, getDefaultDashboardUrl, type UserRole } from "@/core/utils/role.utils"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo
}: ProtectedRouteProps) => {
  const hasAccess = hasRole(allowedRoles)

  if (!hasAccess) {
    const destination = redirectTo || getDefaultDashboardUrl()
    return <Navigate to={destination} replace />
  }

  return <>{children}</>
}
