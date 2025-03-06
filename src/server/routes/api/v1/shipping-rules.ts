/**
 * ShippingRulesHandler
 *
 * Handles shipping rules-related requests. This handler retrieves shipping rule information
 * based on the provided shipping rule ID from the request parameters.
 *
 */
import { defineEventHandler, getRouterParams } from 'h3';
import { ShippingRule } from './../../../../models';

export default defineEventHandler(async (event) => {
  // Extracts the shipping rule ID from the request parameters
  const { id } = getRouterParams(event);
  // Returns the shipping rule information
  return new ShippingRule(id).getShippingRule();
});
