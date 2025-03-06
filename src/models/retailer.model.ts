import { Address } from "cluster"

/**
 * Represents a shipping state entity
 * Used to manage shipping state information and relationships
 */
export class State {
  iso: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ] // Array of ISO codes for all 50 US states
}

/**
 * Represents a Retailer rating entity
 * Used to manage retailer rating information and relationships
 */
export class SatisfactionSurvey {
  id: number | null = null // Unique identifier for the customer satisfaction survey
  speed: number | null = null // Speed rating of the retailer
  service: number | null = null // Service rating of the retailer
  satisfaction: number | null = null // Satisfaction rating of the retailer
}

/**
 * Represents a Retailer entity
 * Used to manage retailer information and relationships
 */
export class Retailer {
  id: number | null = null // Unique identifier for the retailer
  name: string | null = null // Name of the retailer
  website: string | null = null // Retailer's website URL
  storeName: string | null = null // Name of the physical/online store
  image?: string | null = null // Retailer logo/image URL
  isActive: boolean | null = null // Indicates if retailer is currently active
  createdAt: string | null = new Date().toISOString() // When retailer was created
  updatedAt: string | null = new Date().toISOString() // When retailer was last updated
  defaultCommissionRate: number | null = 0.050 // Default commission rate for the retailer
  shipToStates: State[] | null = [] // Array of shipping states this retailer can ship to
  address: Address | null = null // Address of the retailer
  city: string | null = null // City of the retailer
  state: State | null = null // State of the retailer
  zip: string | null = null // Zip code of the retailer
  country: string | null = 'US' // Country of the retailer
  phone: string | null = null // Phone number of the retailer
  email: string | null = null // Email address of the retailer
  notes: string | null = null // Notes about the retailer
  surveys: SatisfactionSurvey[] | null = [] // Array of customer satisfaction surveys
}
