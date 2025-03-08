/**
 * Styles Test Component
 *
 * This component serves as a visual test for the application, showcasing various UI elements
 * such as typography, buttons, grid layouts, cards, and a modal example.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import LoadingSpinnerComponent from '../components/loading-spinner.component';
import { environment } from '../environments/environment';

const isProd = environment.production; // Check if the environment is production

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
  template: ` <div class="container p-8">
    <ui-loading [isVisible]="true" size="112px" color="#000" />
  </div>`,
  providers: [UserService],
})
export default class IndexPage implements OnInit {
  /**
   * Constructor for the IndexPage component.
   * @param userService - The authentication service.
   * @param router - The router service.
   * @param window - The global window object.
   */
  constructor(
    // @Inject(UserService) private userService: UserService,
    @Inject(Router) private router: Router,
  ) {}

  /**
   * Initializes the component and sets up the user
   * authentication status and menu configuration.
   */
  ngOnInit(): void {
    // const authUser = this.userService.currentUserInfo();
    this.router.navigate(['/dashboard']);
    // if (authUser?.accessToken || !environment.production) {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }
}
