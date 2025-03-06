/**
 * AdminGuard controls access to brand-related routes based on user role.
 *
 * This guard prevents users with higher role IDs (>= 3) from accessing brand-related routes,
 * ensuring only users with appropriate permissions can view or interact with brand content.
 *
 * @remarks
 * Implements CanActivate to restrict route access based on user role.
 *
 * @example
 * // In routing module configuration
 * {
 *   path: 'admin',
 *   canActivate: [AdminGuard],
 *   component: AdminLayoutComponent
 * }
 */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { UserService } from '../services/user.service'

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  /**
   * Constructs the AdminGuard with required services.
   *
   * @param router Angular router for navigation
   * @param userService Service to check current user details
   */
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  /**
   * Determines if a route can be activated based on user role.
   *
   * @param route The current route snapshot
   * @param state The current router state snapshot
   * @returns Observable<boolean> indicating if route can be accessed
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.currentUser.pipe(
      map((currentUser) => {
        // Allow access only for authenticated admin users (roleId === 2)
        if (currentUser && currentUser.roleId === 2) {
          return true
        }

        // Redirect non-admin users to appropriate page
        if (currentUser?.roleId === 3) {
          this.router.navigate(['/customer'])
        } else {
          this.router.navigate(['/login'])
        }
        return false
      }),
    )
  }
}
