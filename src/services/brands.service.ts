import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../app/environments/environment';

/**
 * BrandsService handles brand-related API interactions.
 *
 * Provides methods for fetching fulfillments, updating commissions, and brand details.
 *
 * @example
 * // Fetch brand fulfillments
 * brandsService.getFulfillments(10, 1, 'RetailerName', 'BrandName', '2023-01-01')
 *   .subscribe(fulfillments => {
 *     // Handle fulfillments data
 *   });
 *
 * // Update brand commission
 * brandsService.updateCommision({commissionData})
 *   .subscribe(response => {
 *     // Handle commission update
 *   });
 */
@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  // Base API URL from environment configuration
  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetch brand fulfillments with pagination and filtering.
   *
   * @param pageSize Number of items per page
   * @param pageNo Page number for pagination
   * @param retailer Retailer name filter
   * @param brandName Brand name filter
   * @param createdDate Creation date filter
   * @returns Observable with fulfillments data
   */
  getFulfillments(
    pageSize: number,
    pageNo: number,
    retailer: string,
    brandName: string,
    createdDate: string,
  ): Observable<any> {
    console.log(pageSize, pageNo);
    const url = `${this.BASE_URL}/public/brand/all?pageSize=${pageSize}&page=${pageNo}&retailer=${retailer}&brandName=${brandName}&createdDate=${createdDate}`;
    return this.http.get(url);
  }

  /**
   * Update brand commission details.
   *
   * @param body Commission update payload
   * @returns Observable with commission update response
   */
  updateCommision(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/public/brand/handle-commission`, body)
      .pipe(
        map((response) => response),
        catchError((err) => {
          // Error handling can be improved with proper error logging
          return JSON.parse(err.message);
        }),
      );
  }

  /**
   * Update brand details.
   *
   * @param body Brand update payload
   * @returns Observable with brand update response
   */
  updateBrand(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/public/brand/update-details`, body)
      .pipe(
        map((response) => response),
        catchError((err) => {
          // Error handling can be improved with proper error logging
          return JSON.parse(err.message);
        }),
      );
  }
}
