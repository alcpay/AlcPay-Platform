import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { UserService } from '../services/user.service'

/**
 * CustomerGuard controls access to customer-specific routes based on the user's role.
 *
 * This guard grants access only for authenticated users with a roleId of 3 or higher,
 * ensuring that users possess the necessary permissions to access protected customer areas.
 *
 * @remarks
 * Implements CanActivate to restrict route access based on user role.
 *
 * @example
 * // In routing module configuration
 * {
 *   path: 'customers',
 *   canActivate: [CustomerGuard],
 *   component: CustomersComponent
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
  /**
   * Creates an instance of CustomerGuard.
   *
   * @param router Angular router used for navigation.
   * @param userService Service used to retrieve current user details.
   */
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  /**
   * Determines whether the route can be activated based on the current user's role.
   *
   * @param route The snapshot of the current activated route.
   * @param state The snapshot of the current router state.
   * @returns Observable<boolean> indicating if the route can be activated.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.currentUser.pipe(
      map((currentUser) => {
        if (!currentUser) {
          this.router.navigate(['/login'])
          return false
        }

        // Define role-based redirects
        const roleRedirects: Record<number, string> = {
          2: '/staff',
        }

        // Check if user is a customer
        if (currentUser.roleId === 3) {
          return true
        }

        // Handle other role redirections
        const redirectPath = roleRedirects[currentUser.roleId]
        if (redirectPath) {
          this.router.navigate([redirectPath])
        } else {
          this.router.navigate(['/login'])
        }
        return false
      }),
    )
  }
}
