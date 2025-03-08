import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthService } from './auth.service';
/**
 * LocalService
 *
 * This service provides methods to save, retrieve, and remove encrypted data in local storage.
 * The encryption key is dynamically generated based on user-specific information.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */
@Injectable({
  providedIn: 'root',
})
export class LocalService {
  // User-specific identifier used to generate a dynamic encryption key.
  private userIdentifier: string | null;

  constructor(private authService: AuthService) {
    // Initialize userIdentifier with a unique value, e.g., user ID or email.
    this.userIdentifier = this.getUserIdentifier();
  }

  /**
   * Generates a dynamic encryption key based on the user identifier.
   * @returns {string} The dynamic encryption key.
   */
  private getDynamicCryptoKey(): string | null {
    return this.userIdentifier
      ? CryptoJS.SHA256(this.userIdentifier).toString()
      : null;
  }

  /**
   * Retrieves a unique identifier for the user.
   * This could be a user ID, email, or any other
   * unique user-specific information.
   *
   * Currently the user identifier is a static value.
   * @TODO: Update to use the email address of the logged
   * in user.
   * @returns {string} The user identifier.
   */
  private getUserIdentifier(): string | null {
    // Placeholder for actual user-specific logic.
    // Replace with actual logic to retrieve user-specific information.
    return this.authService.getCurrentUser()?.user?.email ?? null;
  }

  /**
   * Saves and encrypts key/value pair data in local storage.
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  public saveData(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
  }

  /**
   * This method retrieves encrypted locally stored data
   * found by key (string) as argument.
   * @param key
   * @returns {string} Unencrypted data
   */
  public getData(key: string): string {
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }

  /**
   * Removes locally stored data by key passed in
   * as a string argument.
   * @param key
   * @returns {void}
   */
  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Deletes all locally stored data.
   * @returns {void}
   */
  public removeAllData(): void {
    localStorage.clear();
  }

  /**
   * Encrypts un-encrypted data and returns the encrypted
   * data as a string.
   * @param data
   * @returns {string} The encrypted data as a string.
   */
  private encrypt(data: string): string {
    const cryptoKey = this.getDynamicCryptoKey();
    return CryptoJS.AES.encrypt(data, cryptoKey ?? '').toString();
  }

  /**
   * Decrypts encrypted data using the dynamic cryptoKey.
   * @param cryptoData
   * @returns {string} The decrypted data as a string.
   */
  private decrypt(cryptoData: string): string {
    const cryptoKey = this.getDynamicCryptoKey();
    return CryptoJS.AES.decrypt(cryptoData, cryptoKey ?? '').toString(
      CryptoJS.enc.Utf8,
    );
  }
}
