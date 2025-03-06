/**
 * CustomerHandler
 *
 * Handles customer-related requests. This handler retrieves customer information
 * based on the provided customer ID from the request parameters.
 */
import { defineEventHandler, getRouterParams } from 'h3';
import { Customer } from './../../../../models';

export default defineEventHandler(async (event) => {
  // Extracts the customer ID from the request parameters
  const { id } = getRouterParams(event);
  // Returns the customer information
  return new Customer(id).getCustomer();
});
