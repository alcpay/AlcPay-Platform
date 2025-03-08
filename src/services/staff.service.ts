import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';

import { environment } from '../app/environments/environment';

/**
 * StaffService manages staff-related API interactions.
 *
 * Provides methods for listing, adding, updating, deleting staff,
 * and resetting staff passwords.
 *
 * @example
 * // List staff members
 * staffService.list(pageParams)
 *   .subscribe(staff => {
 *     // Handle staff list
 *   });
 *
 * // Add a new staff member
 * staffService.add(staffData)
 *   .subscribe(response => {
 *     // Handle staff addition
 *   });
 */
@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieve a list of staff members.
   *
   * @param reqTablesParameters Pagination and filtering parameters
   * @returns Observable with staff list
   */
  list(reqTablesParameters: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/staff/list`, reqTablesParameters)
      .pipe(
        map((response) => response),
        catchError((err) => {
          console.error('An error occurred:', err);
          return throwError(err);
        }),
      );
  }

  /**
   * Add a new staff member.
   *
   * @param body Staff member details
   * @returns Observable with add response
   */
  add(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/staff/add`, body).pipe(
      map((response) => response),
      catchError((err) => {
        console.error('An error occurred:', err);
        return throwError(err);
      }),
    );
  }

  /**
   * Update an existing staff member.
   *
   * @param body Updated staff member details
   * @returns Observable with update response
   */
  update(body: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/staff/edit`, body).pipe(
      map((response) => response),
      catchError((err) => {
        console.error('An error occurred:', err);
        return throwError(err);
      }),
    );
  }

  /**
   * Delete a staff member.
   *
   * @param id Staff member identifier
   * @returns Observable with delete response
   */
  delete(id: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiUrl}/staff/delete?id=${id}`)
      .pipe(
        map((response) => response),
        catchError((err) => {
          console.error('An error occurred:', err);
          return throwError(err);
        }),
      );
  }

  /**
   * Reset a staff member's password.
   *
   * @param id Staff member identifier
   * @param password New password
   * @returns Observable with password reset response
   */
  resetPassword(id: number, password: string): Observable<any> {
    return this.http
      .put<any>(`${environment.apiUrl}/staff/resetPassword`, { id, password })
      .pipe(
        map((response) => response),
        catchError((err) => {
          console.error('An error occurred:', err);
          return throwError(err);
        }),
      );
  }
}
