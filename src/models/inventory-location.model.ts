import { Product } from './product.model'

export class InventoryLocationProduct {
  id: number | null = null // UUID for the inventory location product junction
  productId: number | null = null // Product ID reference
  product?: Product | null = null // Product reference
  inventoryLocationId: number | null = null // Inventory location ID reference
  quantity: number | null = null // Quantity of product at this location
  commissionRate: number | null = 0.050 // Commission rate for this product at this location
  isActive: boolean | null = null // Indicates if the product is active at this location
  createdAt?: string | null = null // Created at date
  updatedAt?: string | null = null // Updated at date
}

export class InventoryLocation {
  id: number | null = null // UUID for the inventory location
  name: string | null = null // Name of the inventory location
  address: string | null = null // Address of the inventory location
  city: string | null = null // City of the inventory location
  state: string | null = null // State of the inventory location
  zip: string | null = null // Zip code of the inventory location
  country: string | null = "US" // Country of the inventory location
  phone?: string | null = null // Phone number of the inventory location
  email?: string | null = null // Email of the inventory location
  website?: string | null = null // Website of the inventory location
  notes?: string | null = null // Notes of the inventory location
  createdAt?: string | null = null // Created at date of the inventory location
  updatedAt?: string | null = null // Updated at date of the inventory location
  isActive?: boolean | null = null // Indicates if the inventory location is active
  image?: string | null = null // Image of the inventory location
  inventoryLocationProducts?: InventoryLocationProduct[] | null = null // Junction table records for products at this location
}
