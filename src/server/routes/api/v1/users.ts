/**
 * UserHandler
 *
 * Handles user-related requests. This handler retrieves user information
 * based on the provided user ID from the request parameters.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { defineEventHandler } from 'h3';
import { User } from './../../../../models';

export default defineEventHandler(async (event) => {
  console.log('event', event);
  // Returns the user information
  return new User().getUser();
});
