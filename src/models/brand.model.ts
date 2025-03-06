import { User } from './user.model'
/**
 * Represents a junction between User and Brand entities
 * Used to manage user-brand relationships and permissions
 */
export class BrandUser {
  user?: User | null = null // Foreign key reference to User
  brand?: Brand | null = null // Foreign key reference to Brand
  isActive?: boolean | null = true // Indicates if this relationship is active
  isDefault?: boolean | null = false // Indicates if this is the user's primary brand
  createdAt?: string | null = new Date().toISOString() // When this relationship was created
  updatedAt?: string | null = new Date().toISOString() // When this relationship was last updated
}

export class Brand {
  id?: number | null = null // Unique identifier for the brand
  brandName?: string | null = null // Name of the brand
  brandId?: string | null = null // Unique identifier for the brand
  name?: string | null = null // Name of the brand
  website?: string | null = null // Brand's website URL
  storeName?: string | null = null // Name of the physical/online store
  image?: string | null = null // Brand logo/image URL
  isActive?: boolean | null = null // Indicates if brand is currently active
  createdAt?: string | null = new Date().toISOString() // When brand was created
  updatedAt?: string | null = new Date().toISOString() // When brand was last updated
  users?: BrandUser[] | null = [] // List of users associated with this brand
}
