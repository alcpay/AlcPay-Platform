import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { UserService } from '../services/user.service'

/**
 * JwtInterceptor manages authentication token injection for HTTP requests.
 *
 * This interceptor automatically adds JWT access tokens to outgoing HTTP requests,
 * ensuring authenticated API calls while excluding specific tracking endpoints.
 *
 * @remarks
 * Implements HttpInterceptor to modify HTTP requests with authentication headers.
 *
 * @example
 * // Automatically adds Bearer token to most API requests
 * // Skips token injection for specific tracking URLs
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   * Constructs the JwtInterceptor with accounts service.
   *
   * @param userService Service to retrieve current user authentication details
   */
  constructor(private userService: UserService) {}

  /**
   * Intercepts HTTP requests and adds JWT token when available.
   *
   * @param request The outgoing HTTP request
   * @param next The next HTTP handler in the interceptor chain
   * @returns Observable of HTTP events with potential token modification
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve current user authentication details
    return this.userService.currentUser.pipe(
      switchMap((user) => {
        const currentUserInfo = user
        // Add authorization header with JWT token if available and not for tracking endpoint
        if (currentUserInfo && currentUserInfo.accessToken && !request.url.includes('/add-tracking')) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUserInfo.accessToken}`,
            },
          })
        }
        return next.handle(request)
      }),
    )
  }
}
