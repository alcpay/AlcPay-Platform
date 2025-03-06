import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

/**
 * ErrorInterceptor handles HTTP error responses across the application.
 *
 * This interceptor provides centralized error handling for HTTP requests,
 * managing specific error scenarios such as unauthorized access and network issues.
 *
 * @remarks
 * Implements HttpInterceptor to intercept and process HTTP error responses.
 *
 * @example
 * // Automatically redirects to login on 401 errors
 * // Alerts user on network connectivity issues
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Constructs the ErrorInterceptor with routing capabilities.
   *
   * @param router Angular router for navigation handling
   * @param toastr Toastr service for displaying error messages
   */
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}

  /**
   * Intercepts HTTP requests and handles potential errors.
   *
   * @param request The outgoing HTTP request
   * @param next The next HTTP handler in the interceptor chain
   * @returns Observable of HTTP events with error handling
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let errorMessage: string
        if (err.status === 400) {
          errorMessage = err.error?.message || 'Invalid Http request!'
          this.toastr.error(errorMessage, 'Error')
          return throwError(() => errorMessage)
        } else if (err.status === 401) {
          errorMessage = 'Unauthorized access - please log in.'
          this.toastr.error(errorMessage, 'Error')
          this.router.navigate(['/login'])
          return throwError(() => errorMessage)
        } else if (err.status === 404) {
          errorMessage = err.error?.message || 'No data found.'
          // shopify connection hack
          // @TODO: remove this once we have a proper way to handle this
          if (errorMessage === 'Brands encrypted data not found.') {
            this.toastr.info('Shopify integration not found. Please connect your Shopify store to continue.', 'Integration Not Found')
          } else {
            this.toastr.error(errorMessage, 'Error')
          }
          return throwError(() => errorMessage)
        } else if (err.status === 0) {
          errorMessage = 'Please check your internet connection and try again.'
          this.toastr.error(errorMessage, 'Network Error')
          return throwError(() => errorMessage)
        } else if (err.status === 504) {
          errorMessage = 'Please try again later.'
          this.toastr.error(errorMessage, 'Gateway Timeout')
          return throwError(() => errorMessage)
        } else {
          errorMessage = err.error?.message || err.statusText || 'An unknown error occurred.'
          this.toastr.error(errorMessage, 'Error')
          return throwError(() => errorMessage)
        }
      }),
    )
  }
}
