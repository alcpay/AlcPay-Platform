import { User } from './user.model'
/**
 * Represents a junction between User and Brand entities
 * Used to manage user-brand relationships and permissions
 */
export class CustomerUser {
  user: User | null = null // Foreign key reference to User
  customer : Customer | null = null // Foreign key reference to Customer
  isActive: boolean | null = true // Indicates if this relationship is active
  isDefault: boolean | null = false // Indicates if this is the user's primary customer
  createdAt: string | null = new Date().toISOString() // When this relationship was created
  updatedAt: string | null = new Date().toISOString() // When this relationship was last updated
}

export class Customer {
  id: number | null = null // Unique identifier for the customer
  name: string | null = null // Name of the customer
  website: string | null = null // Customer's website URL
  storeName: string | null = null // Name of the physical/online store
  image?: string | null = null // Customer logo/image URL
  isActive: boolean | null = null // Indicates if customer is currently active
  createdAt: string | null = new Date().toISOString() // When customer was created
  updatedAt: string | null = new Date().toISOString() // When customer was last updated
  users: CustomerUser[] | null = [] // List of users associated with this customer
  defaultCommissionRate: number | null = 0.050 // Default commission rate for the customer
}
