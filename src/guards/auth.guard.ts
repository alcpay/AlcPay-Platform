/**
 * AuthGuard controls access to routes based on user authentication status.
 *
 * This guard ensures that only authenticated users can access protected routes.
 * If a user is not authenticated, they are redirected to the login page.
 *
 * @remarks
 * Implements CanActivate to restrict route access based on authentication.
 *
 */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { UserService } from '../services/user.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   * Constructs the AuthGuard with required services.
   *
   * @param router Angular router for navigation
   * @param userService Service to check current user authentication
   */
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  /**
   * Determines if a route can be activated based on user authentication.
   *
   * @param route The current route snapshot
   * @param state The current router state snapshot
   * @returns Observable<boolean> indicating if route can be accessed
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.currentUser.pipe(
      map((currentUser) => {
        // Check if user is authenticated at all
        if (currentUser) {
          return true
        }

        // Store the attempted URL for redirecting after login
        this.router.navigate(['/login'], {
          queryParams: {
            returnUrl: encodeURIComponent(state.url),
          },
        })
        return false
      }),
    )
  }
}
