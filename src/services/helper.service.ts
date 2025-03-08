import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../app/environments/environment';

/**
 * HelperService provides utility methods for various API interactions.
 *
 * Handles operations related to locations, states, products, retailers,
 * fulfillments, payouts, and account management.
 *
 * @example
 * // Fetch all locations
 * helperService.getLocations()
 *   .subscribe(locations => {
 *     // Handle locations data
 *   });
 *
 * // Add tracking information
 * helperService.addTracking(trackingData)
 *   .subscribe(response => {
 *     // Handle tracking response
 *   });
 */
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  // Base API URL from environment configuration
  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetch all locations.
   *
   * @returns Observable with locations data
   */
  getLocations(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/locations`);
  }

  /**
   * Fetch all states.
   *
   * @returns Observable with states data
   */
  getAllStates(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/states/all`);
  }

  /**
   * Get filtered locations based on state and product.
   *
   * @param stateId State identifier
   * @param productId Product identifier
   * @returns Observable with filtered locations
   */
  getFilteredLocations(stateId: string, productId: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/rule/available-locations?stateId=${stateId}&productId=${productId}`,
    );
  }

  /**
   * Fetch products for a specific location.
   *
   * @param locId Location identifier
   * @returns Observable with available products
   */
  getProductsForSpecificLocation(locId: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/rule/available-products?locationId=${locId}`,
    );
  }

  /**
   * Get states for a specific product and location.
   *
   * @param prodId Product identifier
   * @param locId Location identifier
   * @returns Observable with available states
   */
  getStatesForSpecificProductAndLocation(
    prodId: string,
    locId: string,
  ): Observable<any> {
    return this.http.get(
      `${
        this.BASE_URL
      }/rule/available-states?locationId=${locId}&productIds=${JSON.stringify(
        prodId,
      )}`,
    );
  }

  /**
   * Get filtered locations for a product rule.
   *
   * @param productId Product identifier
   * @returns Observable with filtered locations
   */
  getFilteredLocationsForProductRule(productId: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/rule/available-locations2?productId=${productId}`,
    );
  }

  /**
   * Fetch states.
   *
   * @returns Observable with states data
   */
  getState(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/states`);
  }

  /**
   * Fetch products.
   *
   * @returns Observable with products data
   */
  getProducts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/products`);
  }

  /**
   * Add tracking information.
   *
   * @param body Tracking data payload
   * @returns Observable with tracking response
   */
  addTracking(body: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/add-tracking`, body).pipe(
      map((response) => response),
      catchError((err) => {
        return JSON.parse(err.message);
      }),
    );
  }

  /**
   * Create a business account.
   *
   * @param body Business account data
   * @returns Observable with account creation response
   */
  addBusiness(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/stripe/create-account`, body)
      .pipe(
        map((response) => response),
        catchError((err) => {
          return JSON.parse(err.message);
        }),
      );
  }

  /**
   * Request Retailer.
   *
   * @param body Retailer request data
   * @returns Observable with request response
   */
  requestRetailer(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/request-cms-retailer`, body)
      .pipe(
        map((response) => response),
        catchError((err) => {
          return JSON.parse(err.message);
        }),
      );
  }

  /**
   * Save retailer ratings.
   *
   * @param body Rating data
   * @returns Observable with rating response
   */
  saveRatings(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/public/brand/rate-retailer`, body)
      .pipe(
        map((response) => response),
        catchError((err) => {
          return JSON.parse(err.message);
        }),
      );
  }

  /**
   * Update business account details.
   *
   * @param body Updated account information
   * @returns Observable with update response
   */
  updateBusiness(body: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/account/edit`, body).pipe(
      map((response) => response),
      catchError((err) => {
        return JSON.parse(err.message);
      }),
    );
  }

  /**
   * Update requested retailer information.
   *
   * @param body Retailer update data
   * @returns Observable with update response
   */
  updateRequestedRetailer(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/update-retailer-request`, body)
      .pipe(
        map((response) => response),
        catchError((err) => {
          return JSON.parse(err.message);
        }),
      );
  }

  /**
   * Activate account.
   *
   * @param body Account activation data
   * @returns Observable with activation response
   */
  activateAccount(body: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/account/activate`, body).pipe(
      map((response) => response),
      catchError((err) => {
        return JSON.parse(err.message);
      }),
    );
  }

  /**
   * Assign location to an account.
   *
   * @param body Location assignment data
   * @returns Observable with assignment response
   */
  assignLocation(body: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/account/link`, body).pipe(
      map((response) => response),
      catchError((err) => {
        return JSON.parse(err.message);
      }),
    );
  }

  /**
   * Fetch retailers.
   *
   * @returns Observable with retailers list
   */
  getRetailer(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/account/list`);
  }

  /**
   * Fetch CMS retailers.
   *
   * @returns Observable with CMS retailers list
   */
  getRetailers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/get-cms-retailers`);
  }

  /**
   * Unassign location from an account.
   *
   * @param id Account identifier
   * @returns Observable with unassignment response
   */
  unassignLocation(id: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/account/unlink`, { id });
  }

  /**
   * Delete business account.
   *
   * @param id Account identifier
   * @returns Observable with deletion response
   */
  deleteBusiness(id: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/account/delete`, { id });
  }

  /**
   * Delete requested retailer.
   *
   * @param id Retailer request identifier
   * @returns Observable with deletion response
   */
  deleteRequestedRetailer(id: any): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/delete-retailer-request?id=${id}`,
    );
  }

  /**
   * Toggle requested retailer status.
   *
   * @param id Retailer identifier
   * @returns Observable with status toggle response
   */
  requestedRetailerStatusToggle(id: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/toggle-retailer-status`, { id });
  }

  /**
   * Fetch tracking information for a fulfillment.
   *
   * @param fulfillmentId Fulfillment identifier
   * @returns Observable with tracking information
   */
  fetchTrackingInfo(fulfillmentId: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/tracking-info/${fulfillmentId}`);
  }

  /**
   * Get payouts with filtering and pagination.
   *
   * @param pageSize Number of items per page
   * @param pageNo Page number
   * @param status Payout status
   * @param sort Sorting parameter
   * @param orderNumber Order number filter
   * @param retailer Retailer filter
   * @param brandName Brand name filter
   * @param createdDate Creation date filter
   * @returns Observable with payouts data
   */
  getPayouts(
    pageSize: any,
    pageNo: any,
    status: any,
    sort: any,
    orderNumber: string,
    retailer: string,
    brandName: string,
    createdDate: string,
  ): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/payouts?pageSize=${pageSize}&page=${pageNo}&status=${
        status || ''
      }&sort=${sort}&orderNumber=${orderNumber}&retailer=${retailer}&brandName=${brandName}&createdDate=${createdDate}`,
    );
  }

  /**
   * Get fulfillments with extensive filtering and pagination.
   *
   * @param pageSize Number of items per page
   * @param pageNo Page number
   * @param status Fulfillment status
   * @param sort Sorting parameter
   * @param daterange Date range filter
   * @param shopifyTrackingStatus Shopify tracking status
   * @param retailer Retailer filter
   * @param brandName Brand name filter
   * @param createdDate Creation date filter
   * @returns Observable with fulfillments data
   */
  getFulfillments(
    pageSize: any,
    pageNo: any,
    status: any,
    sort: any,
    daterange: any,
    shopifyTrackingStatus: any,
    retailer: string,
    brandName: string,
    createdDate: string,
  ): Observable<any> {
    const url = `${
      this.BASE_URL
    }/fulfillments?pageSize=${pageSize}&page=${pageNo}&status=${
      status || ''
    }&sort=${sort}&daterange=${daterange}&shopifyTrackingStatus=${shopifyTrackingStatus}&retailer=${retailer}&brandName=${brandName}&createdDate=${createdDate}`;
    return this.http.get(url);
  }

  /**
   * Get fulfillment tracking details.
   *
   * @param shopifyOrderId Shopify order identifier
   * @param fulfillmentId Fulfillment identifier
   * @param indexKey Index key for tracking
   * @returns Observable with fulfillment tracking details
   */
  getFulfillmentTrackingDetail(
    shopifyOrderId: any,
    fulfillmentId: any,
    indexKey: any,
  ): Observable<any> {
    const url = `${this.BASE_URL}/fulfillment/trackingdetail?fulfillmentId=${fulfillmentId}&orderId=${shopifyOrderId}&indexKey=${indexKey}`;
    return this.http.get(url);
  }

  /**
   * Get account balances with pagination and filtering.
   *
   * @param pageSize Number of items per page
   * @param pageNo Page number
   * @param status Balance status
   * @param sort Sorting parameter
   * @returns Observable with balances data
   */
  getBalances(
    pageSize: any,
    pageNo: any,
    status: any,
    sort: any,
  ): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/balances?pageSize=${pageSize}&page=${pageNo}&status=${
        status || ''
      }&sort=${sort}`,
    );
  }

  /**
   * Change in-house business status.
   *
   * @param id Business identifier
   * @returns Observable with status change response
   */
  changeInHouseBusiness(id: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/account/change-in-house-business`, {
      id,
    });
  }

  /**
   * Create Stripe account link.
   *
   * @param body Account link creation data
   * @returns Observable with account link response
   */
  createAccountLink(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/stripe/send-account-link`, body)
      .pipe(
        map((response) => response),
        catchError((err) => {
          return JSON.parse(err.message);
        }),
      );
  }
}
