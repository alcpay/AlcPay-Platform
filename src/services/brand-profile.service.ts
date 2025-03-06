import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from './../environments/environment'

/**
 * BrandProfileService handles brand-related API interactions.
 *
 * Provides methods for updating and fetching brand details.
 *
 * @example
 * // Fetch a brand's details
 * brandProfileService.fetchBrand(123)
 *   .subscribe(brand => {
 *     // Handle brand data
 *   });
 *
 * // Update brand details
 * brandProfileService.updateBrand({name: 'New Brand Name'})
 *   .subscribe(response => {
 *     // Handle update response
 *   });
 */
@Injectable({
  providedIn: 'root',
})
export class BrandProfileService {
  // Base API URL from environment configuration
  private readonly BASE_URL = environment.apiUrl

  constructor(private http: HttpClient) {}

  /**
   * Update brand details via API.
   *
   * @param data Brand update information
   * @returns Observable with update response
   */
  updateBrand(data: Record<string, unknown>): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/public/brand/update-details`, {
        ...data,
        accountId: 'test', // TODO: Replace with dynamic account ID
      })
      .pipe(map((response) => response))
  }

  /**
   * Fetch brand details by ID.
   *
   * @param id Brand identifier
   * @returns Observable with brand details
   */
  fetchBrand(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/public/brand?brand_id=${id}`).pipe(map((response) => response))
  }
}
