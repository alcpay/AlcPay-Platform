/**
 * AppComponent
 *
 * This component serves as the root component of the application.
 * It listens to router navigation events and triggers static method initialization.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { IStaticMethods } from 'flyonui/flyonui';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods; // Interface for static methods available on the window object
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  /**
   * @param {Router} router - Angular Router for navigation events
   * @param {Object} platformId - Angular platform identifier to check if the code is running in the browser
   */
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Subscribes to router events and triggers autoInit on navigation end if running in the browser.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          console.log('event instanceOf NavigationEnd');
          setTimeout(() => {
            console.log('in setTimeout app.component.ts');
            if (
              window.HSStaticMethods &&
              typeof window.HSStaticMethods.autoInit === 'function'
            ) {
              console.log('autoInit Window.HSStaticMethods');
              window.HSStaticMethods.autoInit();
            } else {
              console.error(
                'HSStaticMethods or autoInit function is not defined on the window object.',
              );
            }
          }, 400);
        }
      });
    }
  }
}
