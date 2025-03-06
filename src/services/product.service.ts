import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { environment } from './../environments/environment'

/**
 * ProductService manages API interactions for creating, updating,
 * retrieving, and deleting products.
 *
 * @example
 * // Fetch all products
 * productService.getProducts()
 *   .subscribe(products => {
 *     // Handle products data
 *   });
 *
 * // Get product details
 * productService.getProduct(productId)
 *   .subscribe(productDetail => {
 *     // Handle product details
 *   });
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieve the list of all products.
   *
   * @returns Observable with products list
   */
  getProducts(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/products`).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Retrieve detailed information for a specific product.
   *
   * @param id Product identifier, can be a number or string
   * @returns Observable with product details
   */
  getProduct(id: string | number): Observable<any> {
    const idString = id.toString(); // Convert id to string to ensure URL consistency
    return this.http.get<any>(`${environment.apiUrl}/product/${idString}`).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Create a new product.
   *
   * @param body Product data
   * @returns Observable with creation response
   */
  createProduct(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/product`, body).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Update an existing product.
   *
   * @param id Product identifier, can be a number or string
   * @param body Updated product data
   * @returns Observable with update response
   */
  updateProduct(id: number | string, body: any): Observable<any> {
    const idString = id.toString(); // Convert id to string to ensure URL consistency
    return this.http.put<any>(`${environment.apiUrl}/product/${idString}`, body).pipe(
      map((response) => response),
      catchError(this.handleError),
    );
  }

  /**
   * Delete a specific product.
   *
   * @param id Identifier of the product to delete, can be a number or string
   * @returns Observable with deletion response
   */
  deleteProduct(id: number | string): Observable<any> {
    const idString = id.toString(); // Convert id to string to ensure URL consistency
    return this.http.delete<any>(`${environment.apiUrl}/product/${idString}`).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Generic error handler for HTTP requests.
   *
   * @param error Error object from HTTP request
   * @returns Observable with error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error)
    return throwError(() => new Error(error.message || 'Server error'))
  }
}
