import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from './../environments/environment'

/**
 * OrdersService handles order-related API interactions.
 *
 * Provides methods for fetching, retrieving details, resending tracking emails,
 * fulfilling orders, and searching orders by order number.
 *
 * @example
 * // Fetch orders with pagination
 * ordersService.getOrders(pageInfo)
 *   .subscribe(orders => {
 *     // Handle orders data
 *   });
 *
 * // Get order details
 * ordersService.getDetail(orderId)
 *   .subscribe(orderDetail => {
 *     // Handle order details
 *   });
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch orders with optional pagination information.
   *
   * @param pageInfo Pagination information for order retrieval
   * @returns Observable with orders data
   */
  getOrders(pageInfo) {
    return this.http.get(`${environment.apiUrl}/orders?pageInfo=${pageInfo ? pageInfo : ''}`)
  }

  /**
   * Retrieve detailed information for a specific order.
   *
   * @param id Order identifier
   * @returns Observable with order details
   */
  getDetail(id: any) {
    return this.http.get(`${environment.apiUrl}/order/${id}`)
  }

  /**
   * Resend tracking link via email for a specific order.
   *
   * @param email Recipient email address
   * @param orderId Order identifier
   * @returns Observable with email sending response
   */
  resendMail(email, orderId) {
    return this.http.post(`${environment.apiUrl}/order/sendTrackingLink`, { email, orderId })
  }

  /**
   * Fulfill an order with store name information.
   *
   * @param order Order payload
   * @param storeName Name of the store fulfilling the order
   * @returns Observable with order fulfillment response
   */
  fulfillOrder(order, storeName: string) {
    if (order) {
      order.storeName = storeName
    }
    return this.http.post(`${environment.apiUrl}/webhook/order`, order)
  }

  /**
   * Search orders by order number.
   *
   * @param order_number Order number for searching
   * @returns Observable with matching orders
   */
  getOrdersByOrderNumber(order_number) {
    return this.http.get(`${environment.apiUrl}/orders?searchOrderNumber=${order_number ? order_number : ''}`)
  }
}
