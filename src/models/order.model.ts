import { Product } from './product.model'

export class OrderItem {
  id: number | null = null // UUID for the order item
  productId: number | null = null // Product ID
  product: Product | null = null // Product
  quantity: number | null = null // Quantity
  price: number | null = null // Price
}

export class Order {
  id: number | null = null // UUID for the order
  shippingStreet: string | null = null // Shipping street
  shippingCity: string | null = null // Shipping city
  shippingState: string | null = null // Shipping state
  shippingZip: string | null = null // Shipping zip
  shippingCountry: string | null = 'US' // Shipping country
  orderNumber: string | null = null // Order number
  orderDate: string | null = null // Order date
  orderStatus: string | null = null // Order status
  orderTotal: number | null = null // Order total
  orderItems: OrderItem[] | null = null // Order items
}

