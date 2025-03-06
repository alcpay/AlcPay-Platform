import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { environment } from './../environments/environment'

/**
 * RuleService manages API interactions for creating, updating,
 * retrieving, and deleting rules related to states, products,
 * and geographical restrictions.
 *
 * @example
 * // Add a new state rule
 * ruleService.addStateRule(ruleData)
 *   .subscribe(response => {
 *     // Handle rule creation response
 *   });
 *
 * // Fetch existing product rules
 * ruleService.getProductRules()
 *   .subscribe(rules => {
 *     // Process product rules
 *   });
 */
@Injectable({
  providedIn: 'root',
})
export class RuleService {
  constructor(private http: HttpClient) {}

  /**
   * Add a new state-based rule.
   *
   * @param body Rule configuration data
   * @returns Observable with rule creation response
   */
  addStateRule(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/rule/state-rule`, body).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Add a new ZIP code-based rule.
   *
   * @param body Rule configuration data
   * @returns Observable with rule creation response
   */
  addZipRule(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/rule/zip-rule`, body).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Add a new product-based rule.
   *
   * @param body Rule configuration data
   * @returns Observable with rule creation response
   */
  addProductRule(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/rule/product-rule`, body).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Retrieve the list of all rules.
   *
   * @returns Observable with rules list
   */
  getRuleList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/rule/get-rules`)
  }

  /**
   * Update an existing state rule.
   *
   * @param body Updated rule configuration data
   * @returns Observable with update response
   */
  updateState(body: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/rule/state-rule/update`, body).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Delete a specific state rule.
   *
   * @param id Identifier of the state rule to delete
   * @returns Observable with deletion response
   */
  deleteStateRule(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/rule/state-rule/remove?id=${id}`).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Delete a specific product rule.
   *
   * @param id Identifier of the product rule to delete
   * @returns Observable with deletion response
   */
  deleteProductRule(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/rule/product-rule/remove?id=${id}`).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Update an existing product rule.
   *
   * @param body Updated rule configuration data
   * @returns Observable with update response
   */
  updateProductRule(body: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/rule/product-rule/update`, body).pipe(
      map((response) => response),
      catchError(this.handleError),
    )
  }

  /**
   * Retrieve all product rules.
   *
   * @returns Observable with product rules
   */
  getProductRules(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/rule/product-rules`)
  }

  /**
   * Retrieve all state rules.
   *
   * @returns Observable with state rules
   */
  getStateRules(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/rule/state-rules`)
  }

  /**
   * Generic error handler for HTTP requests.
   *
   * @param error Error object from HTTP request
   * @returns Observable with error
   */
  private handleError(error: any) {
    console.error('An error occurred:', error)
    return throwError(() => new Error(error.message || 'Server error'))
  }
}
