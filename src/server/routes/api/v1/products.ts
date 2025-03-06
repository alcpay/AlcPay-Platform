/**
 * ProductHandler
 *
 * Handles product-related requests. This handler retrieves product information
 * based on the provided product ID from the request parameters.
 */

import { defineEventHandler, getRouterParams } from 'h3';
import { Product } from './../../../../models';

export default defineEventHandler(async (event) => {
  // Extracts the product ID from the request parameters
  const { id } = getRouterParams(event);
  // Returns the product information
  return new Product(id).getProduct();
});
