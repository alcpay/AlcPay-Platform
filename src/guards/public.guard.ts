/**
 * PublicGuard prevents authenticated users from accessing specific routes.
 *
 * This guard is designed to redirect logged-in users away from authentication-related routes
 * such as login or registration pages, ensuring they cannot access these pages while authenticated.
 *
 * @remarks
 * Implements CanActivate to control route access based on authentication status.
 *
 * @example
 * // In routing module configuration
 * {
 *   path: 'login',
 *   canActivate: [PublicGuard],
 *   component: LoginComponent
 * }
 */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { UserService } from '../services/user.service'

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  /**
   * Constructs the PublicGuard with required services.
   *
   * @param router Angular router for navigation
   * @param userService Service to check current user authentication status
   */
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  /**
   * Determines if a route can be activated based on user authentication status.
   *
   * @param route The current route snapshot
   * @param state The current router state snapshot
   * @returns Observable<boolean> indicating if the route can be accessed
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.currentUser.pipe(
      map((currentUser) => {
        if (!currentUser) {
          return true // Allow access for unauthenticated users
        }

        // Handle role-based redirections
        const roleRedirects: Record<number, string> = {
          2: '/staff',
          3: '/customer',
        }

        const redirectPath = roleRedirects[currentUser.roleId]
        if (redirectPath) {
          this.router.navigate([redirectPath])
          return false
        }

        return true // Allow access for users with unknown roles
      }),
    )
  }
}
