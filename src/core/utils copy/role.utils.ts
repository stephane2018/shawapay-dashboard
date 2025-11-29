export type UserRole = "ADMIN" | "MANAGER" | "SELLER" | "SUPER_ADMIN"

export const normalizeRole = (backendRole: string): UserRole => {
  const roleLower = backendRole.toLowerCase().trim()

  const roleMap: Record<string, UserRole> = {
    'admin': 'ADMIN',
    'administrateur': 'ADMIN',
    'administrator': 'ADMIN',
    'manager': 'MANAGER',
    'gestionnaire': 'MANAGER',
    'seller': 'SELLER',
    'caissier': 'SELLER',
    'cashier': 'SELLER',
    'e-commercant': 'SELLER',
    'ecommercant': 'SELLER',
    'merchant': 'SELLER',
  }

  return roleMap[roleLower] || 'ADMIN'
}

export const getRoleFromLocalStorage = (): UserRole | null => {
  try {
    const role = localStorage.getItem("caisse-post-role")
    if (!role) return null
    return normalizeRole(role)
  } catch (error) {
    console.error("Error getting role from localStorage:", error)
    return null
  }
}

export const hasRole = (allowedRoles: UserRole[]): boolean => {
  const userRole = getRoleFromLocalStorage()
  if (!userRole) return false
  return allowedRoles.includes(userRole)
}

export const isAdmin = (): boolean => {
  return getRoleFromLocalStorage() === "ADMIN"
}

export const isManager = (): boolean => {
  return getRoleFromLocalStorage() === "MANAGER"
}

export const isSeller = (): boolean => {
  return getRoleFromLocalStorage() === "SELLER"
}

export const getDefaultDashboardUrl = (): string => {
  const role = getRoleFromLocalStorage()

  switch (role) {
    case "ADMIN":
      return "/admin/dashboard"
    case "MANAGER":
      return "/admin/bureau-export"
    case "SELLER":
      return "/admin/seller-dashboard"
    default:
      return "/admin/dashboard"
  }
}
