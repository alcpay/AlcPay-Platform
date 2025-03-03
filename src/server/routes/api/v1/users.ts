/**
 * UserHandler
 *
 * Handles user-related requests. This handler retrieves user information
 * based on the provided user ID from the request parameters.
 */

import { defineEventHandler, getRouterParams } from 'h3';

/**
 * Represents a User with an ID.
 */
class User {
  // The unique identifier for the user
  constructor(private id: string) {}

  /**
   * Retrieves the user ID.
   * @returns {Promise<string>} The user ID.
   */
  async getUser(): Promise<string> {
    return this.id;
  }
}

export default defineEventHandler(async (event) => {
  // Extracts the user ID from the request parameters
  const { id } = getRouterParams(event);
  // Returns the user information
  return new User(id).getUser();
});
