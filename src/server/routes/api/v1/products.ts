/**
 * ProductHandler
 *
 * Handles product-related requests. This handler retrieves product information
 * based on the provided product ID from the request parameters.
 */

import { defineEventHandler, getRouterParams } from 'h3';

/**
 * Represents a Product with an ID.
 */
class Product {
  // The unique identifier for the product
  constructor(private id: string) {}

  /**
   * Retrieves the product ID.
   * @returns {Promise<string>} The product ID.
   */
  async getProduct(): Promise<string> {
    return this.id;
  }
}

export default defineEventHandler(async (event) => {
  // Extracts the product ID from the request parameters
  const { id } = getRouterParams(event);
  // Returns the product information
  return new Product(id).getProduct();
});
