/**
 * AppComponent
 *
 * This component serves as the root component of the application.
 * It listens to router navigation events and triggers static method initialization.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { IStaticMethods } from 'flyonui/flyonui';

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
   */
  constructor(private router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Subscribes to router events and triggers autoInit on navigation end.
   */
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
            window.HSStaticMethods.autoInit();
          } else {
            console.error('HSStaticMethods or autoInit function is not defined on the window object.');
          }
        }, 400);
      }
    });
  }
}
