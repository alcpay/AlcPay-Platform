import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopifyService {
  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  /**
   * Save Shopify store configuration information.
   *
   * @param storeUrl Shopify store URL
   * @param storePassword Store access password
   * @param storeAccessId Store access identifier
   * @param apiVersion Shopify API version
   * @returns Observable with save response
   * @throws HttpErrorResponse if the API call fails
   */
  saveShopifyInfo(
    storeUrl: string,
    storePassword: string,
    storeAccessId: string,
    apiVersion: string,
  ): Observable<any> {
    const config: any = {
      STORE_URL: storeUrl,
      STORE_PASSWORD: storePassword,
      STORE_ACCESS_ID: storeAccessId,
      API_VERSION: apiVersion,
    };

    return this.http
      .post<any>(`${this.BASE_URL}/public/brand/save-shopify-info`, config)
      .pipe(
        map((response) => response),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error('Failed to save Shopify configuration', 'Error');
          return throwError(() => error);
        }),
      );
  }

  /**
   * Fetch Shopify data for the configured store.
   *
   * @returns Observable with Shopify data
   * @throws HttpErrorResponse if the API call fails
   */
  fetchShopifyData(): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/public/brand/fetch-shopify-data`, {})
      .pipe(
        map((response) => response),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error('Failed to fetch Shopify data', 'Error');
          return throwError(() => error);
        }),
      );
  }

  /**
   * Retrieve webhook URL for a specific identifier.
   *
   * @param id Identifier for the webhook URL
   * @returns Observable with webhook URL details
   * @throws HttpErrorResponse if the API call fails
   */
  fetchWebhookURL(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/public/urls/${id}`).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error('Failed to fetch webhook URL', 'Error');
        return throwError(() => error);
      }),
    );
  }
}
