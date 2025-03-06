import { Brand } from './brand.model'

export class User {
  id: number | null = null // Unique identifier for the user
  username: string | null = null // Name of the user
  email: string | null = null // Email address of the user
  contact: string | null = null // Contact number of the user
  isActive = false // Indicates if the user is active
  roleId: number | null = null // Role identifier for the user
  brand: Brand | null = null // Associated brand of the user
  firstName: string | null = null
  lastName: string | null = null
}

export class AuthenticatedUser {
  accessToken: string | null = null // JWT access token for the authenticated user
  user: User | null = null // User object for the authenticated user
  roleId: number | null = null // Role identifier for the authenticated user
  isSuperAdmin = false // Indicates if the user has super admin privileges
}
