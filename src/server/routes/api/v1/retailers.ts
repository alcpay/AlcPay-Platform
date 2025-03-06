/**
 * RetailerHandler
 *
 * Handles retailer-related requests. This handler retrieves retailer information
 * based on the provided retailer ID from the request parameters.
 */

import { defineEventHandler, getRouterParams } from 'h3';
import { Retailer } from './../../../../models';

export default defineEventHandler(async (event) => {
  // Extracts the retailer ID from the request parameters
  const { id } = getRouterParams(event);
  // Returns the retailer information
  return new Retailer(id).getRetailer();
});
