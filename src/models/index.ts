/**
 * Account
 *
 * Represents an account in the system.
 */
export class Account {
  id: string | null = null; // Unique identifier for the account
  name: string | null = null; // Name of the account holder
  email: string | null = null; // Email of the account holder
  password: string | null = null; // Password for the account
  createdAt: Date | null = null; // Date when the account was created
  updatedAt: Date | null = null; // Date when the account was last updated

  constructor(
    id?: string | null, // Optional parameter for account ID
    name?: string | null, // Optional parameter for account holder's name
    email?: string | null, // Optional parameter for account holder's email
    password?: string | null, // Optional parameter for account password
    createdAt?: Date | null, // Optional parameter for account creation date
    updatedAt?: Date | null // Optional parameter for account last update date
  ) {
    this.id = id ?? null; // Assigns the provided ID or null if undefined
    this.name = name ?? null; // Assigns the provided name or null if undefined
    this.email = email ?? null; // Assigns the provided email or null if undefined
    this.password = password ?? null; // Assigns the provided password or null if undefined
    this.createdAt = createdAt ?? null; // Assigns the provided creation date or null if undefined
    this.updatedAt = updatedAt ?? null; // Assigns the provided update date or null if undefined
  }

  /**
   * Retrieves the account by ID.
   * @param {string} id - The ID of the account.
   * @returns {Promise<Account | null>} The account instance or null if not found.
   */
  async getAccountById(id: string): Promise<Account | null> {
    // Checks if the current account's ID matches the provided ID
    return this.id === id ? this : null; // Returns the account instance if IDs match, otherwise null
  }
}

/**
 * AccountRating
 *
 * Represents a rating for an account.
 */
export class AccountRating {
  accountId: string | null = null; // Unique identifier for the account
  rating: number | null = null; // Rating value for the account

  constructor(accountId?: string | null, rating?: number | null) {
    this.accountId = accountId ?? null; // Assigns the provided account ID or null if undefined
    this.rating = rating ?? null; // Assigns the provided rating or null if undefined
  }

  /**
   * Retrieves the account rating by account ID.
   * @param {string} accountId - The account ID.
   * @returns {Promise<AccountRating | null>} The account rating instance or null if not found.
   */
  async getAccountRatingByAccountId(accountId: string): Promise<AccountRating | null> {
    // Checks if the current account rating's account ID matches the provided account ID
    return this.accountId === accountId ? this : null; // Returns the account rating instance if IDs match, otherwise null
  }
}

/**
 * AccountState
 *
 * Represents the state of an account.
 */
export class AccountState {
  accountId: string | null = null; // Unique identifier for the account
  state: string | null = null; // State of the account

  constructor(accountId?: string | null, state?: string | null) {
    this.accountId = accountId ?? null; // Assigns the provided account ID or null if undefined
    this.state = state ?? null; // Assigns the provided state or null if undefined
  }

  /**
   * Retrieves the account state by account ID.
   * @param {string} accountId - The account ID.
   * @returns {Promise<AccountState | null>} The account state instance or null if not found.
   */
  async getAccountStateByAccountId(accountId: string): Promise<AccountState | null> {
    // Checks if the current account state's account ID matches the provided account ID
    return this.accountId === accountId ? this : null; // Returns the account state instance if IDs match, otherwise null
  }
}

/**
 * Balance
 *
 * Represents the balance of an account.
 */
export class Balance {
  accountId: string | null = null; // Unique identifier for the account
  amount: number | null = null; // Amount of the balance
  currency: string | null = null; // Currency of the balance

  constructor(accountId?: string | null, amount?: number | null, currency?: string | null) {
    this.accountId = accountId ?? null; // Assigns the provided account ID or null if undefined
    this.amount = amount ?? null; // Assigns the provided amount or null if undefined
    this.currency = currency ?? null; // Assigns the provided currency or null if undefined
  }

  /**
   * Retrieves the balance by account ID.
   * @param {string} accountId - The account ID.
   * @returns {Promise<Balance | null>} The balance instance or null if not found.
   */
  async getBalanceByAccountId(accountId: string): Promise<Balance | null> {
    // Checks if the current balance's account ID matches the provided account ID
    return this.accountId === accountId ? this : null; // Returns the balance instance if IDs match, otherwise null
  }
}

/**
 * Brands
 *
 * Represents a brand in the system.
 */
export class Brands {
  id: string | null = null; // Unique identifier for the brand
  name: string | null = null; // Name of the brand
  logoUrl: string | null = null; // URL of the brand's logo

  constructor(id?: string | null, name?: string | null, logoUrl?: string | null) {
    this.id = id ?? null; // Assigns the provided brand ID or null if undefined
    this.name = name ?? null; // Assigns the provided brand name or null if undefined
    this.logoUrl = logoUrl ?? null; // Assigns the provided logo URL or null if undefined
  }

  /**
   * Retrieves the brand by ID.
   * @param {string} id - The ID of the brand.
   * @returns {Promise<Brands | null>} The brand instance or null if not found.
   */
  async getBrandById(id: string): Promise<Brands | null> {
    // Checks if the current brand's ID matches the provided ID
    return this.id === id ? this : null; // Returns the brand instance if IDs match, otherwise null
  }
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
 * FulfillmentAccount
 *
 * Represents a fulfillment account in the system.
 */
export class FulfillmentAccount {
  fulfillmentId: string | null = null; // Unique identifier for the fulfillment
  accountId: string | null = null; // Unique identifier for the account

  constructor(fulfillmentId?: string | null, accountId?: string | null) {
    this.fulfillmentId = fulfillmentId ?? null; // Assigns the provided fulfillment ID or null if undefined
    this.accountId = accountId ?? null; // Assigns the provided account ID or null if undefined
  }

  /**
   * Retrieves the fulfillment account by fulfillment ID.
   * @param {string} fulfillmentId - The fulfillment ID.
   * @returns {Promise<FulfillmentAccount | null>} The fulfillment account instance or null if not found.
   */
  async getFulfillmentAccountByFulfillmentId(fulfillmentId: string): Promise<FulfillmentAccount | null> {
    // Checks if the current fulfillment account's fulfillment ID matches the provided fulfillment ID
    return this.fulfillmentId === fulfillmentId ? this : null; // Returns the fulfillment account instance if IDs match, otherwise null
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

export class Payout {
  /**
   * The unique identifier for the payout
   */
  id: number | null = null; // Unique identifier for the payout
  /**
   * The order number for the payout
   */
  orderNumber: string = ''; // Order number associated with the payout
  /**
   * The amount for the payout
   */
  amount: number = 0; // Amount of the payout
  /**
   * The destination for the payout
   */
  destination: string = ''; // Destination where the payout is sent
  /**
   * The retailer name for the payout
   */
  retailerName: string = ''; // Name of the retailer associated with the payout
  /**
   * The status for the payout
   */
  status: boolean = false; // Status indicating if the payout is active or not

  constructor(
    id?: number | null, // Optional parameter for payout ID
    orderNumber?: string, // Optional parameter for order number
    amount?: number, // Optional parameter for payout amount
    destination?: string, // Optional parameter for payout destination
    retailerName?: string, // Optional parameter for retailer name
    status?: boolean, // Optional parameter for payout status
  ) {
    this.id = id ?? null; // Assigns the provided payout ID or null if undefined
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
    return this.id === id ? this : null; // Returns the payout instance if IDs match, otherwise null
  }
}

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

class Product {
  constructor(private id: string) {} // Constructor with a private ID parameter

  async getProduct(): Promise<string> {
    // Asynchronously retrieves the product ID
    return this.id; // Returns the product ID
  }
}

class Customer {
  constructor(private id: string) {} // Constructor with a private ID parameter

  async getCustomer(): Promise<string> {
    // Asynchronously retrieves the customer ID
    return this.id; // Returns the customer ID
  }
}

class Retailer {
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
class ShippingRule {
  id: number | null = null; // Unique identifier for the shipping rule
  productId: number | null = null; // Unique identifier for the product associated with the shipping rule
  retailerId: number | null = null; // Unique identifier for the retailer associated with the shipping rule
  inventoryLocationId: number | null = null; // Unique identifier for the inventory location associated with the shipping rule
  shippingRegions: string[] | null = null; // List of shipping regions applicable for the shipping rule
  shippingCountry: string | null = 'US'; // Default shipping country for the shipping rule
  commissionPercentage: number = 0.050; // Commission percentage for the shipping rule
  isActive: boolean = true; // Status indicating if the shipping rule is active
  createdAt: Date | null = null; // Date when the shipping rule was created
  updatedAt: Date | null = null; // Date when the shipping rule was last updated

  constructor(
    id?: number | null, // Optional parameter for shipping rule ID
    productId?: number | null, // Optional parameter for product ID
    retailerId?: number | null, // Optional parameter for retailer ID
    inventoryLocationId?: number | null, // Optional parameter for inventory location ID
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
    if (shippingRule.id === id) { // Checks if the shipping rule's ID matches the provided ID
      return shippingRule; // Returns the shipping rule instance if IDs match
    }
    return null; // Returns null if IDs do not match
  }

  async getShippingRuleByProductId(productId: number): Promise<ShippingRule | null> {
    // Asynchronously retrieves the shipping rule by product ID
    const shippingRule: ShippingRule = await this.getShippingRule(); // Retrieves the current shipping rule instance
    if (shippingRule.productId === productId) { // Checks if the shipping rule's product ID matches the provided product ID
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
class User {
  id: number | null = null; // Unique identifier for the user
  roleId: number | null = null; // Unique identifier for the user's role
  email: string | null = null; // Email address of the user
  firstName: string | null = null; // First name of the user
  lastName: string | null = null; // Last name of the user
  customerIds: number[] | null = null; // List of customer IDs associated with the user
  isActive: boolean | null = null; // Status indicating if the user is active
  isEmailVerified: boolean | null = null; // Status indicating if the user's email is verified
  isPhoneVerified: boolean | null = null; // Status indicating if the user's phone is verified

  constructor(
    id?: number | null, // Optional parameter for user ID
    roleId?: number | null, // Optional parameter for role ID
    email?: string | null, // Optional parameter for email address
    firstName?: string | null, // Optional parameter for first name
    lastName?: string | null, // Optional parameter for last name
    customerIds?: number[] | null, // Optional parameter for list of customer IDs
    isActive?: boolean | null, // Optional parameter for user status
    isEmailVerified?: boolean | null, // Optional parameter for email verification status
    isPhoneVerified?: boolean | null, // Optional parameter for phone verification status
  ) {
    this.id = id ?? null; // Assigns the provided user ID or null if undefined
    this.roleId = roleId ?? null; // Assigns the provided role ID or null if undefined
    this.email = email ?? null; // Assigns the provided email address or null if undefined
    this.firstName = firstName ?? null; // Assigns the provided first name or null if undefined
    this.lastName = lastName ?? null; // Assigns the provided last name or null if undefined
    this.customerIds = customerIds ?? null; // Assigns the provided list of customer IDs or null if undefined
    this.isActive = isActive ?? null; // Assigns the provided status or null if undefined
    this.isEmailVerified = isEmailVerified ?? null; // Assigns the provided email verification status or null if undefined
    this.isPhoneVerified = isPhoneVerified ?? null; // Assigns the provided phone verification status or null if undefined
  }

  async getUser(): Promise<User> {
    // Asynchronously retrieves the user instance
    return this; // Returns the current user instance
  }
}

class Order {
  id: number | null = null; // Unique identifier for the order
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
    this.id = id ?? null; // Assigns the provided order ID or null if undefined
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

class OrderItem {
  constructor(private id: string) {} // Constructor with a private ID parameter

  async getOrderItem(): Promise<OrderItem> {
    // Asynchronously retrieves the order item instance
    return this; // Returns the current order item instance
  }
}

class ShopifyStoreConnection {
  /**
   * The unique identifier for the Shopify store connection
   */
  id: number | null = null; // Unique identifier for the Shopify store connection
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
    this.id = id ?? null; // Assigns the provided Shopify store connection ID or null if undefined
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
  async getShoppifyStoreConnection(): Promise<number | null> {
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

// Exporting classes for external use
export { Product, Customer, Retailer, ShippingRule, User, Order, OrderItem, ShopifyStoreConnection };
