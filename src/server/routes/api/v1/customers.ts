/**
 * CustomerHandler
 *
 * Handles customer-related requests. This handler retrieves customer information
 * based on the provided customer ID from the request parameters.
 */
import { defineEventHandler, getRouterParams } from 'h3';

/**
 * Represents a Customer with an ID.
 */
class Customer {
  // The unique identifier for the customer
  constructor(private id: string) {}

  /**
   * Retrieves the customer ID.
   * @returns {Promise<string>} The customer ID.
   */
  async getCustomer(): Promise<string> {
    return this.id;
  }
}
export default defineEventHandler(async (event) => {
  // Extracts the customer ID from the request parameters
  const { id } = getRouterParams(event);
  // Returns the customer information
  return new Customer(id).getCustomer();
});
