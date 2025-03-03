/**
 * ShippingRulesHandler
 *
 * Handles shipping rules-related requests. This handler retrieves shipping rule information
 * based on the provided shipping rule ID from the request parameters.
 *
 */

import { defineEventHandler, getRouterParams } from 'h3';

/**
 * Represents a ShippingRule with an ID.
 */
class ShippingRule {
  // The unique identifier for the shipping rule
  constructor(private id: string) {}

  /**
   * Retrieves the shipping rule ID.
   * @returns {Promise<string>} The shipping rule ID.
   */
  async getShippingRule(): Promise<string> {
    return this.id;
  }
}

export default defineEventHandler(async (event) => {
  // Extracts the shipping rule ID from the request parameters
  const { id } = getRouterParams(event);
  // Returns the shipping rule information
  return new ShippingRule(id).getShippingRule();
});
