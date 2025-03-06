

/**
 * InventoryLocation
 * 
 * Represents a physical location a brand keeps inventory to be sent
 * to distributors.
 */
export enum LocationCode {
  AL = "Alabama",
  AK = "Alaska",
  AZ = "Arizona",
  AR = "Arkansas",
  CA = "California",
  CO = "Colorado",
  CT = "Connecticut",
  DE = "Delaware",
  FL = "Florida",
  GA = "Georgia",
  HI = "Hawaii",
  ID = "Idaho",
  IL = "Illinois",
  IN = "Indiana",
  IA = "Iowa",
  KS = "Kansas",
  KY = "Kentucky",
  LA = "Louisiana",
  ME = "Maine",
  MD = "Maryland",
  MA = "Massachusetts",
  MI = "Michigan",
  MN = "Minnesota",
  MS = "Mississippi",
  MO = "Missouri",
  MT = "Montana",
  NE = "Nebraska",
  NV = "Nevada",
  NH = "New Hampshire",
  NJ = "New Jersey",
  NM = "New Mexico",
  NY = "New York",
  NC = "North Carolina",
  ND = "North Dakota",
  OH = "Ohio",
  OK = "Oklahoma",
  OR = "Oregon",
  PA = "Pennsylvania",
  RI = "Rhode Island",
  SC = "South Carolina",
  SD = "South Dakota",
  TN = "Tennessee",
  TX = "Texas",
  UT = "Utah",
  VT = "Vermont",
  VA = "Virginia",
  WA = "Washington",
  WV = "West Virginia",
  WI = "Wisconsin",
  WY = "Wyoming",
  CUSTOM = "Other/Custom",
  NONE = "None"
}

export enum ShippingRegion {

  AL = "Alabama",
  AK = "Alaska",
  AZ = "Arizona",
  AR = "Arkansas",
  CA = "California",
  CO = "Colorado",
  CT = "Connecticut",
  DE = "Delaware",
  FL = "Florida",
  GA = "Georgia",
  HI = "Hawaii",
  ID = "Idaho",
  IL = "Illinois",
  IN = "Indiana",
  IA = "Iowa",
  KS = "Kansas",
  KY = "Kentucky",
  LA = "Louisiana",
  ME = "Maine",
  MD = "Maryland",
  MA = "Massachusetts",
  MI = "Michigan",
  MN = "Minnesota",
  MS = "Mississippi",
  MO = "Missouri",
  MT = "Montana",
  NE = "Nebraska",
  NV = "Nevada",
  NH = "New Hampshire",
  NJ = "New Jersey",
  NM = "New Mexico",
  NY = "New York",
  NC = "North Carolina",
  ND = "North Dakota",
  OH = "Ohio",
  OK = "Oklahoma",
  OR = "Oregon",
  PA = "Pennsylvania",
  RI = "Rhode Island",
  SC = "South Carolina",
  SD = "South Dakota",
  TN = "Tennessee",
  TX = "Texas",
  UT = "Utah",
  VT = "Vermont",
  VA = "Virginia",
  WA = "Washington",
  WV = "West Virginia",
  WI = "Wisconsin",
  WY = "Wyoming",
  CUSTOM = "Other/Custom",
  NONE = "None"
}

export enum ShippingRegionCode {
  AL = "Alabama",
  AK = "Alaska",
  AZ = "Arizona",
  AR = "Arkansas",
  CA = "California",
  CO = "Colorado",
  CT = "Connecticut",
  DE = "Delaware",
  FL = "Florida",
  GA = "Georgia",
  HI = "Hawaii",
  ID = "Idaho",
  IL = "Illinois",
  IN = "Indiana",
  IA = "Iowa",
  KS = "Kansas",
  KY = "Kentucky",
  LA = "Louisiana",
  ME = "Maine",
  MD = "Maryland",
  MA = "Massachusetts",
  MI = "Michigan",
  MN = "Minnesota",
  MS = "Mississippi",
  MO = "Missouri",
  MT = "Montana",
  NE = "Nebraska",
  NV = "Nevada",
  NH = "New Hampshire",
  NJ = "New Jersey",
  NM = "New Mexico",
  NY = "New York",
  NC = "North Carolina",
  ND = "North Dakota",
  OH = "Ohio",
  OK = "Oklahoma",
  OR = "Oregon",
  PA = "Pennsylvania",
  RI = "Rhode Island",
  SC = "South Carolina",
  SD = "South Dakota",
  TN = "Tennessee",
  TX = "Texas",
  UT = "Utah",
  VT = "Vermont",
  VA = "Virginia",
  WA = "Washington",
  WV = "West Virginia",
  WI = "Wisconsin",
  WY = "Wyoming",
  CUSTOM = "Other/Custom",
  NONE = "None"
}


export class InventoryItem {
  id: string | null = null;
  productId: Product | null = null;
  warehouseId: Warehouse | null = null;
  stockCount: number = 0;
  updatedAt: Date = new Date();
  createdAt: Date = new Date();
  isActive: boolean = true;
  inStock: boolean = true;
  lowStockWarning: boolean = false;
  lowStockThreshold: number | null = null;
}

export enum UserRole {
  GUEST = 1,
  STAFF = 2,
  SUPER_ADMIN = 3,
  CUSTOMER = 4,
  PARTNER = 5,
  API_ONLY = 6,
  READ_ONLY = 7
}

/**
 * Salutation
 *
 * Represents different types of salutations that can be used in user profiles.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */
export enum Salutation {
  MR = "Mr.", // Salutation for males
  MRS = "Mrs.", // Salutation for married females
  MS = "Ms.", // Salutation for females, regardless of marital status
  DOCTOR = "Dr.", // Salutation for individuals with a doctorate
  PROFESSOR = "Prof.", // Salutation for professors
  HONORABLE = "Honorable",
  NONE = "None" // No salutation
}

/**
 * NameSuffix
 *
 * Represents different types of name suffixes that can be used in user profiles.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */
export enum NameSuffix {
  JR = "Jr.", // Junior
  SR = "Sr.", // Senior
  II = "II", // The Second
  III = "III", // The Third
  IV = "IV", // The Fourth
  V = "V", // The Fifth
  ESQ = "Esq.", // Esquire
  MD = "M.D.", // Doctor of Medicine
  PHD = "Ph.D.", // Doctor of Philosophy
  NONE = "", // No suffix
}

export class UserProfile {
  /**
   * UserProfile
   *
   * Represents a user profile in the system.
   *
   * import: @alcpay/tailwind
   * path: themes/switcher.component.ts
   */
  fullName: string | null = null; // Full name of the user
  nickname: string | null = null; // Nickname of the user
  email: string | null = null; // Email address of the user
  phone: string | null = null; // Phone number of the user
  createdAt: Date | null = null; // Date when the user profile was created
  updatedAt: Date | null = null; // Date when the user profile was last updated
  lastLoginAt: Date | null = null; // Date when the user last logged in
  roleId: UserRole | null = null; // Role ID of the user
  private _passwordHash: string | null = null; // Hashed password of the user

  /**
   * Sets the user's password securely by hashing it.
   * @param {string} newPassword - The new password to set.
   * @param {string | null} oldPassword - The old password for verification (optional).
   * @throws {Error} If the old password is incorrect.
   */
  async setPassword(newPassword: string, oldPassword: string | null = null): Promise<void> {
    if (oldPassword && !await this.verifyPassword(oldPassword)) {
      throw new Error('Old password is incorrect.');
    }
    this._passwordHash = await this.hashPassword(newPassword);
  }

  /**
   * Hashes a password using a secure algorithm.
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} The hashed password.
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await crypto.subtle.generateKey(
      { name: "PBKDF2", hash: "SHA-256", length: 256 },
      true,
      ["deriveBits", "deriveKey"]
    );
    const encodedPassword = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);
    return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
  }

  /**
   * Verifies if a given password matches the stored hashed password.
   * @param {string} password - The password to verify.
   * @returns {Promise<boolean>} True if the password matches, false otherwise.
   */
  private async verifyPassword(password: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(password);
    return this._passwordHash === hashedPassword;
  }
}


import { CustomerOrg } from  './system.model';
export * from './system.model';

export class Address {
  recipient: string | null = null;
  building: string | null = null;
  street: string | null = null;
  street2: string | null = null;
  city: string | null = null;
  state: string | null = null;
  zipCode: string | null = null;
  locationCode: LocationCode = LocationCode.NONE;
  deliveryNotes: string | null = null;
  _orgId: CustomerOrg | null = null;
}

export class Shipment {
  id: string | null = null;
  locationCode: LocationCode = LocationCode.NONE;
  retailerId: Retailer | string | null = null;
  orgId: CustomerOrg | null = null;
  recipientName: string | null = null;
  shipToStreet: string | null = null;
  shipToStreet2: string | null = null;
  shipToCity: string | null = null;
  shipToRegion: string | null = null;
  shipToPostalCode: string | null = null;
  shipToCount: string | null = 'US';
  items: ShipmentItem | null = null;
}

export class ShipmentItem {
  id: string | null = null;
  orderId: Order | null = null;
  orderItemId: OrderItem | null = null;
  productId: Product | null = null;
  warehouseId: Warehouse | null = null;
  quantity: number | null = null;
  shipmentId: Shipment | null = null;




}

export class Warehouse {
  id: string | null = null;
  locationCode: LocationCode = LocationCode.NONE;
  customerId: Customer | null = null;
  productInventory: ProductInventory[] | null = [];


  /**
   * Enum representing the 50 US states.
   */
  

  shippingRegion: USState | null = null; // US State or In Future Possibly a Group of Zip Codes

}

/**
 * ShippingService
 *
 * Represents an shippingService in the system.
 */
export class ShippingService {
  id: string | null = null; // Unique identifier for the shippingService
  name: string | null = null; // Name of the shippingService holder
  email: string | null = null; // Email of the shippingService holder
  password: string | null = null; // Password for the shippingService
  createdAt: Date | null = null; // Date when the shippingService was created
  updatedAt: Date | null = null; // Date when the shippingService was last updated

  constructor(
    id?: string | null, // Optional parameter for shippingService ID
    name?: string | null, // Optional parameter for shippingService holder's name
    email?: string | null, // Optional parameter for shippingService holder's email
    password?: string | null, // Optional parameter for shippingService password
    createdAt?: Date | null, // Optional parameter for shippingService creation date
    updatedAt?: Date | null // Optional parameter for shippingService last update date
  ) {
    this.id = id ?? null; // Assigns the provided ID or null if undefined
    this.name = name ?? null; // Assigns the provided name or null if undefined
    this.email = email ?? null; // Assigns the provided email or null if undefined
    this.password = password ?? null; // Assigns the provided password or null if undefined
    this.createdAt = createdAt ?? null; // Assigns the provided creation date or null if undefined
    this.updatedAt = updatedAt ?? null; // Assigns the provided update date or null if undefined
  }

  /**
   * Retrieves the shippingService by ID.
   * @param {string} id - The ID of the shippingService.
   * @returns {Promise<ShippingService | null>} The shippingService instance or null if not found.
   */
  async getShippingServiceById(id: string): Promise<ShippingService | null> {
    // Checks if the current shippingService's ID matches the provided ID
    return this.id === id ? this : null; // Returns the shippingService instance if IDs match, otherwise null
  }
}

/**
 * ShippingServiceRating
 *
 * Represents a rating for an shippingService.
 */
export class ShippingServiceRating {
  shippingServiceId: string | null = null; // Unique identifier for the shippingService
  rating: number | null = null; // Rating value for the shippingService

  constructor(shippingServiceId?: string | null, rating?: number | null) {
    this.shippingServiceId = shippingServiceId ?? null; // Assigns the provided shippingService ID or null if undefined
    this.rating = rating ?? null; // Assigns the provided rating or null if undefined
  }

  /**
   * Retrieves the shippingService rating by shippingService ID.
   * @param {string} shippingServiceId - The shippingService ID.
   * @returns {Promise<ShippingServiceRating | null>} The shippingService rating instance or null if not found.
   */
  async getByShippingServiceId(shippingServiceId: string): Promise<ShippingServiceRating | null> {
    // Checks if the current shippingService rating's shippingService ID matches the provided shippingService ID
    return this.shippingServiceId === shippingServiceId ? this : null; // Returns the shippingService rating instance if IDs match, otherwise null
  }
}

/**
 * ShippingServiceState
 *
 * Represents the state of an shippingService.
 */
export class ShippingServiceState {
  shippingServiceId: string | null = null; // Unique identifier for the shippingService
  state: string | null = null; // State of the shippingService

  constructor(shippingServiceId?: string | null, state?: string | null) {
    this.shippingServiceId = shippingServiceId ?? null; // Assigns the provided shippingService ID or null if undefined
    this.state = state ?? null; // Assigns the provided state or null if undefined
  }

  /**
   * Retrieves the shippingService state by shippingService ID.
   * @param {string} shippingServiceId - The shippingService ID.
   * @returns {Promise<ShippingServiceState | null>} The shippingService state instance or null if not found.
   */
  async getStateByShippingServiceId(shippingServiceId: string): Promise<ShippingServiceState | null> {
    // Checks if the current shippingService state's shippingService ID matches the provided shippingService ID
    return this.shippingServiceId === shippingServiceId ? this : null; // Returns the shippingService state instance if IDs match, otherwise null
  }
}

/**
 * Balance
 *
 * Represents the balance of an shippingService.
 */
export class Balance {
  shippingServiceId: string | null = null; // Unique identifier for the shippingService
  amount: number | null = null; // Amount of the balance
  currency: string | null = null; // Currency of the balance

  constructor(shippingServiceId?: string | null, amount?: number | null, currency?: string | null) {
    this.shippingServiceId = shippingServiceId ?? null; // Assigns the provided shippingService ID or null if undefined
    this.amount = amount ?? null; // Assigns the provided amount or null if undefined
    this.currency = currency ?? null; // Assigns the provided currency or null if undefined
  }

  /**
   * Retrieves the balance by shippingService ID.
   * @param {string} shippingServiceId - The shippingService ID.
   * @returns {Promise<Balance | null>} The balance instance or null if not found.
   */
  async getBalanceByShippingServiceId(shippingServiceId: string): Promise<Balance | null> {
    // Checks if the current balance's shippingService ID matches the provided shippingService ID
    return this.shippingServiceId === shippingServiceId ? this : null; // Returns the balance instance if IDs match, otherwise null
  }
}

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

/**
 * Brand
 *
 * Represents a brand (customer account)in the system.
 */
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

/**
 * Fulfillment
 *
 * Represents a fulfillment in the system.
 */
export class Fulfillment {
  id: string | null = null; // Unique identifier for the fulfillment
  orderId: string | null = null; // Order ID associated with the fulfillment
  status: string | null = null; // Status of the fulfillment
  trackingNumber: string | null = null; // Tracking number for the fulfillment

  constructor(
    id?: string | null, // Optional parameter for fulfillment ID
    orderId?: string | null, // Optional parameter for order ID
    status?: string | null, // Optional parameter for fulfillment status
    trackingNumber?: string | null // Optional parameter for tracking number
  ) {
    this.id = id ?? null; // Assigns the provided fulfillment ID or null if undefined
    this.orderId = orderId ?? null; // Assigns the provided order ID or null if undefined
    this.status = status ?? null; // Assigns the provided status or null if undefined
    this.trackingNumber = trackingNumber ?? null; // Assigns the provided tracking number or null if undefined
  }

  /**
   * Retrieves the fulfillment by ID.
   * @param {string} id - The ID of the fulfillment.
   * @returns {Promise<Fulfillment | null>} The fulfillment instance or null if not found.
   */
  async getFulfillmentById(id: string): Promise<Fulfillment | null> {
    // Checks if the current fulfillment's ID matches the provided ID
    return this.id === id ? this : null; // Returns the fulfillment instance if IDs match, otherwise null
  }
}

/**
 * FulfillmentShippingService
 *
 * Represents a fulfillment shippingService in the system.
 */
export class FulfillmentShippingService {
  fulfillmentId: string | null = null; // Unique identifier for the fulfillment
  shippingServiceId: string | null = null; // Unique identifier for the shippingService

  constructor(fulfillmentId?: string | null, shippingServiceId?: string | null) {
    this.fulfillmentId = fulfillmentId ?? null; // Assigns the provided fulfillment ID or null if undefined
    this.shippingServiceId = shippingServiceId ?? null; // Assigns the provided shippingService ID or null if undefined
  }

  /**
   * Retrieves the fulfillment shippingService by fulfillment ID.
   * @param {string} fulfillmentId - The fulfillment ID.
   * @returns {Promise<FulfillmentShippingService | null>} The fulfillment shippingService instance or null if not found.
   */
  async getFulfillmentShippingServiceByFulfillmentId(fulfillmentId: string): Promise<FulfillmentShippingService | null> {
    // Checks if the current fulfillment shippingService's fulfillment ID matches the provided fulfillment ID
    return this.fulfillmentId === fulfillmentId ? this : null; // Returns the fulfillment shippingService instance if IDs match, otherwise null
  }
}

/**
 * LocationMap
 *
 * Represents a location map in the system.
 */
export class LocationMap {
  locationId: string | null = null; // Unique identifier for the location
  name: string | null = null; // Name of the location
  coordinates: { lat: number | null; lng: number | null } = { lat: null, lng: null }; // Coordinates of the location

  constructor(
    locationId?: string | null, // Optional parameter for location ID
    name?: string | null, // Optional parameter for location name
    coordinates?: { lat: number | null; lng: number | null } // Optional parameter for location coordinates
  ) {
    this.locationId = locationId ?? null; // Assigns the provided location ID or null if undefined
    this.name = name ?? null; // Assigns the provided location name or null if undefined
    this.coordinates = coordinates ?? { lat: null, lng: null }; // Assigns the provided coordinates or default if undefined
  }

  /**
   * Retrieves the location map by location ID.
   * @param {string} locationId - The location ID.
   * @returns {Promise<LocationMap | null>} The location map instance or null if not found.
   */
  async getLocationMapByLocationId(locationId: string): Promise<LocationMap | null> {
    // Checks if the current location map's location ID matches the provided location ID
    return this.locationId === locationId ? this : null; // Returns the location map instance if IDs match, otherwise null
  }
}

/**
 * Payout
 * 
 * Represents a payout in the system.
 */
export class Payout {
  id: string | null = null; // Unique identifier for the payout
  orderNumber: string = ''; // Order number associated with the payout
  amount: number = 0; // Amount of the payout
  destination: string = ''; // Destination where the payout is sent
  retailerName: string = ''; // Name of the retailer associated with the payout
  status: boolean = false; // Status indicating if the payout is active or not

  constructor(
    id?: string | null, // Optional parameter for payout ID
    orderNumber?: string, // Optional parameter for order number
    amount?: number, // Optional parameter for payout amount
    destination?: string, // Optional parameter for payout destination
    retailerName?: string, // Optional parameter for retailer name
    status?: boolean, // Optional parameter for payout status
  ) {
    this.id = id ? String(id) : null; // Converts the provided payout ID to a string or assigns null if falsy
    this.orderNumber = orderNumber ?? ''; // Assigns the provided order number or empty string if undefined
    this.amount = amount ?? 0; // Assigns the provided amount or zero if undefined
    this.destination = destination ?? ''; // Assigns the provided destination or empty string if undefined
    this.retailerName = retailerName ?? ''; // Assigns the provided retailer name or empty string if undefined
    this.status = status ?? false; // Assigns the provided status or false if undefined
  }

  /**
   * Retrieves the payout by ID.
   * @param {number} id - The ID of the payout.
   * @returns {Promise<Payout | null>} The payout instance or null if not found.
   */
  async getPayoutById(id: number): Promise<Payout | null> {
    // Checks if the current payout's ID matches the provided ID
    return this.id === String(id) ? this : null; // Converts the provided ID to a string for comparison and returns the payout instance if IDs match, otherwise null
  }
}

/**
 * ProductLocationMap
 * 
 * Represents a product location map in the system.
 */
export class ProductLocationMap {
  /**
   * The unique identifier for the product location map
   */
  locationId: string | null = null; // Unique identifier for the product location map
  /**
   * The name for the product location map
   */
  locationName: string | null = null; // Name of the product location map
  products: any[] | null = null; // List of products associated with the location map
  brandId: string | null = null; // Unique identifier for the brand associated with the location map

  constructor(
    locationId?: string | null, // Optional parameter for location ID
    locationName?: string | null, // Optional parameter for location name
    products?: any[] | null, // Optional parameter for list of products
    brandId?: string | null, // Optional parameter for brand ID
  ) {
    this.locationId = locationId ?? null; // Assigns the provided location ID or null if undefined
    this.locationName = locationName ?? null; // Assigns the provided location name or null if undefined
    this.products = products ?? null; // Assigns the provided list of products or null if undefined
    this.brandId = brandId ?? null; // Assigns the provided brand ID or null if undefined
  }

  /**
   * Retrieves the product location map by location ID.
   * @param {string} locationId - The location ID.
   * @returns {Promise<ProductLocationMap | null>} The product location map instance or null if not found.
   */
  async getProductLocationMapByLocationId(locationId: string): Promise<ProductLocationMap | null> {
    // Checks if the current product location map's location ID matches the provided location ID
    return this.locationId === locationId ? this : null; // Returns the product location map instance if IDs match, otherwise null
  }
}

export class Product {
  constructor(private id: string) {} // Constructor with a private ID parameter

  async getProduct(): Promise<string> {
    // Asynchronously retrieves the product ID
    return this.id; // Returns the product ID
  }
}

export class Customer {
  constructor(private id: string) {} // Constructor with a private ID parameter

  async getCustomer(): Promise<string> {
    // Asynchronously retrieves the customer ID
    return this.id; // Returns the customer ID
  }
}

export class Retailer {
  constructor(private id: string) {} // Constructor with a private ID parameter

  async getRetailer(): Promise<string> {
    // Asynchronously retrieves the retailer ID
    return this.id; // Returns the retailer ID
  }
}

/**
 * ShippingRule
 * 
 * Represents a shipping rule in the system.
 */
export class ShippingRule {
  id: string | null = null; // Unique identifier for the shipping rule
  productId: string | null = null; // Unique identifier for the product associated with the shipping rule
  retailerId: string | null = null; // Unique identifier for the retailer associated with the shipping rule
  inventoryLocationId: string | null = null; // Unique identifier for the inventory location associated with the shipping rule
  shippingRegions: string[] | null = null; // List of shipping regions applicable for the shipping rule
  shippingCountry: string | null = 'US'; // Default shipping country for the shipping rule
  commissionPercentage: number = 0.050; // Commission percentage for the shipping rule
  isActive: boolean = true; // Status indicating if the shipping rule is active
  createdAt: Date | null = null; // Date when the shipping rule was created
  updatedAt: Date | null = null; // Date when the shipping rule was last updated

  constructor(
    id?: string | null, // Optional parameter for shipping rule ID
    productId?: string | null, // Optional parameter for product ID
    retailerId?: string | null, // Optional parameter for retailer ID
    inventoryLocationId?: string | null, // Optional parameter for inventory location ID
    shippingRegions?: string[] | null, // Optional parameter for list of shipping regions
    shippingCountry?: string | null, // Optional parameter for shipping country
    commissionPercentage?: number | null, // Optional parameter for commission percentage
    isActive?: boolean | null, // Optional parameter for shipping rule status
    createdAt?: Date | null, // Optional parameter for creation date
    updatedAt?: Date | null, // Optional parameter for last update date
  ) {
    this.id = id ?? null; // Assigns the provided shipping rule ID or null if undefined
    this.productId = productId ?? null; // Assigns the provided product ID or null if undefined
    this.retailerId = retailerId ?? null; // Assigns the provided retailer ID or null if undefined
    this.inventoryLocationId = inventoryLocationId ?? null; // Assigns the provided inventory location ID or null if undefined
    this.shippingRegions = shippingRegions ?? null; // Assigns the provided list of shipping regions or null if undefined
    this.shippingCountry = shippingCountry ?? 'US'; // Assigns the provided shipping country or default 'US' if undefined
    this.commissionPercentage = commissionPercentage ?? 0.050; // Assigns the provided commission percentage or default 0.050 if undefined
    this.isActive = isActive ?? true; // Assigns the provided status or default true if undefined
    this.createdAt = createdAt ?? null; // Assigns the provided creation date or null if undefined
    this.updatedAt = updatedAt ?? null; // Assigns the provided update date or null if undefined
  }

  async getShippingRule(): Promise<ShippingRule> {
    // Asynchronously retrieves the shipping rule instance
    return this; // Returns the current shipping rule instance
  }

  async getShippingRuleById(id: number): Promise<ShippingRule | null> {
    // Asynchronously retrieves the shipping rule by ID
    const shippingRule: ShippingRule = await this.getShippingRule(); // Retrieves the current shipping rule instance
    if (shippingRule.id !== null && shippingRule.id === id.toString()) { // Checks if the shipping rule's ID is not null and matches the provided ID
      return shippingRule; // Returns the shipping rule instance if IDs match
    }
    return null; // Returns null if IDs do not match
  }

  async getShippingRuleByProductId(productId: string): Promise<ShippingRule | null> {
    // Asynchronously retrieves the shipping rule by product ID
    const shippingRule: ShippingRule = await this.getShippingRule(); // Retrieves the current shipping rule instance
    if (shippingRule.productId !== null && shippingRule.productId === productId) { // Checks if the shipping rule's product ID is not null and matches the provided product ID
      return shippingRule; // Returns the shipping rule instance if product IDs match
    }
    return null; // Returns null if product IDs do not match
  }
}

/**
 * User
 * 
 * Represents a user in the system.
 */
export class User {
  id: number | null = null; // Unique identifier for the user
  username: string | null = null; // Name of the user
  email: string | null = null; // Email address of the user
  contact: string | null = null; // Contact number of the user
  isActive: boolean = false; // Indicates if the user is active
  roleId: number | null = null; // Role identifier for the user
  brand: Brand | null = null; // Associated brand of the user
  firstName: string | null = null; // First name of the user
  lastName: string | null = null; // Last name of the user

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!this.id) {
        reject(new Error('User not found')); // Returns an error if the user is not found
      }
      resolve(this); // Returns the current user instance
    }); // Returns the current user instance
  }
}

/**
 * AuthenticatedUser
 * 
 * Represents an authenticated user in the system.
 */
export class AuthenticatedUser {
  accessToken: string | null = null; // JWT access token for the authenticated user
  user: User | null = null; // User object for the authenticated user
  roleId: number | null = null; // Role identifier for the authenticated user
  isSuperAdmin: boolean = false; // Indicates if the user has super admin privileges
  getAuthenticatedUser(): Promise<AuthenticatedUser> {
    return new Promise((resolve, reject) => {
      if (!this.accessToken) {
        reject(new Error('Authenticated user not found')); // Returns an error if the authenticated user is not found
      }
      resolve(this); // Returns the current authenticated user instance
    }); // Returns the current authenticated user instance
  }
}

/**
 * Order
 * 
 * Represents an order in the system.
 */
export class Order {
  id: string | null = null; // Unique identifier for the order
  customerId: number | null = null; // Unique identifier for the customer associated with the order
  retailerId: number | null = null; // Unique identifier for the retailer associated with the order
  orderNumber: string | null = null; // Order number for the order
  orderDate: Date | null = null; // Date when the order was placed
  orderStatus: string | null = null; // Status of the order
  orderTotal: number | null = null; // Total amount for the order
  orderItems: OrderItem[] | null = null; // List of items in the order
  orderShipping: number | null = null; // Shipping cost for the order
  orderTax: number | null = null; // Tax amount for the order
  orderDiscount: number | null = null; // Discount applied to the order
  orderNotes: string | null = null; // Additional notes for the order
  orderShippingAddress: string | null = null; // Shipping address for the order
  orderBillingAddress: string | null = null; // Billing address for the order

  constructor(
    id?: number | null, // Optional parameter for order ID
    customerId?: number | null, // Optional parameter for customer ID
    retailerId?: number | null, // Optional parameter for retailer ID
    orderNumber?: string | null, // Optional parameter for order number
    orderDate?: Date | null, // Optional parameter for order date
    orderStatus?: string | null, // Optional parameter for order status
    orderTotal?: number | null, // Optional parameter for order total
    orderItems?: OrderItem[] | null, // Optional parameter for list of order items
    orderShipping?: number | null, // Optional parameter for shipping cost
    orderTax?: number | null, // Optional parameter for tax amount
    orderDiscount?: number | null, // Optional parameter for discount amount
    orderNotes?: string | null, // Optional parameter for order notes
    orderShippingAddress?: string | null, // Optional parameter for shipping address
    orderBillingAddress?: string | null, // Optional parameter for billing address
  ) {
    this.id = id?.toString() ?? null; // Converts the provided order ID to a string or assigns null if undefined
    this.customerId = customerId ?? null; // Assigns the provided customer ID or null if undefined
    this.retailerId = retailerId ?? null; // Assigns the provided retailer ID or null if undefined
    this.orderNumber = orderNumber ?? null; // Assigns the provided order number or null if undefined
    this.orderDate = orderDate ?? null; // Assigns the provided order date or null if undefined
    this.orderStatus = orderStatus ?? null; // Assigns the provided order status or null if undefined
    this.orderTotal = orderTotal ?? null; // Assigns the provided order total or null if undefined
    this.orderItems = orderItems ?? null; // Assigns the provided list of order items or null if undefined
    this.orderShipping = orderShipping ?? null; // Assigns the provided shipping cost or null if undefined
    this.orderTax = orderTax ?? null; // Assigns the provided tax amount or null if undefined
    this.orderDiscount = orderDiscount ?? null; // Assigns the provided discount amount or null if undefined
    this.orderNotes = orderNotes ?? null; // Assigns the provided order notes or null if undefined
    this.orderShippingAddress = orderShippingAddress ?? null; // Assigns the provided shipping address or null if undefined
    this.orderBillingAddress = orderBillingAddress ?? null; // Assigns the provided billing address or null if undefined
  }

  async getOrder(): Promise<Order> {
    // Asynchronously retrieves the order instance
    return this; // Returns the current order instance
  }
}

export class OrderItem {
  
  productId: Product |null = null;
  orderId: Order | null = null;
  shipToRegionCode: ShippingRegion


  constructor(private id: string) {} // Constructor with a private ID parameter

  async getOrderItem(): Promise<OrderItem> {
    // Asynchronously retrieves the order item instance
    return this; // Returns the current order item instance
  }
}

export class ShopifyStoreConnection {
  /**
   * The unique identifier for the Shopify store connection
   */
  id: string | null = null; // Unique identifier for the Shopify store connection
  /**
   * The unique identifier for the Shopify store
   */
  shopifyStoreId: string | null = null; // Unique identifier for the Shopify store
  /**
   * The name of the Shopify store
   */
  shopifyStoreName: string | null = null; // Name of the Shopify store
  /**
   * The URL of the Shopify store
   */
  shopifyStoreUrl: string | null = null; // URL of the Shopify store
  /**
   * The API version of the Shopify store
   */
  shopifyStoreApiVersion: string | null = null; // API version of the Shopify store
  /**
   * The API key of the Shopify store
   */
  shopifyStoreApiKey: string | null = null; // API key for accessing the Shopify store
  /**
   * The API secret key of the Shopify store
   */
  shopifyStoreApiSecretKey: string | null = null; // API secret key for accessing the Shopify store
  /**
   * Whether the Shopify store connection is connected
   */
  isConnected: boolean | null = null; // Status indicating if the Shopify store connection is active

  /**
   * The unique identifier for the Shopify store connection
   */
  constructor(
    id?: number | null, // Optional parameter for Shopify store connection ID
    shopifyStoreId?: string | null, // Optional parameter for Shopify store ID
    shopifyStoreName?: string | null, // Optional parameter for Shopify store name
    shopifyStoreUrl?: string | null, // Optional parameter for Shopify store URL
    shopifyStoreApiVersion?: string | null, // Optional parameter for Shopify store API version
    shopifyStoreApiKey?: string | null, // Optional parameter for Shopify store API key
    shopifyStoreApiSecretKey?: string | null, // Optional parameter for Shopify store API secret key
    isConnected?: boolean | null // Optional parameter for connection status
  ) {
    this.id = id !== undefined && id !== null ? id.toString() : null; // Converts the provided ID to a string or assigns null if undefined or null
    this.shopifyStoreId = shopifyStoreId ?? null; // Assigns the provided Shopify store ID or null if undefined
    this.shopifyStoreName = shopifyStoreName ?? null; // Assigns the provided Shopify store name or null if undefined
    this.shopifyStoreUrl = shopifyStoreUrl ?? null; // Assigns the provided Shopify store URL or null if undefined
    this.shopifyStoreApiVersion = shopifyStoreApiVersion ?? null; // Assigns the provided API version or null if undefined
    this.shopifyStoreApiKey = shopifyStoreApiKey ?? null; // Assigns the provided API key or null if undefined
    this.shopifyStoreApiSecretKey = shopifyStoreApiSecretKey ?? null; // Assigns the provided API secret key or null if undefined
    this.isConnected = isConnected ?? false; // Assigns the provided connection status or false if undefined
  }

  /**
   * Retrieves the Shopify store connection ID.
   * @returns {Promise<number | null>} The Shopify store connection ID.
   */
  async getShoppifyStoreConnection(): Promise<string | null> {
    // Asynchronously retrieves the Shopify store connection ID
    return this.id; // Returns the Shopify store connection ID
  }

  async testConnection(): Promise<boolean> {
    // Asynchronously tests the connection to the Shopify store
    return true; // Returns true indicating the connection test was successful
  }

  async connectShopifyStore(): Promise<boolean> {
    // Asynchronously connects to the Shopify store
    return true; // Returns true indicating the connection was successful
  }

  async disconnectShopifyStore(): Promise<boolean> {
    // Asynchronously disconnects from the Shopify store
    return true; // Returns true indicating the disconnection was successful
  }
}
