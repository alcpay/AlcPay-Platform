import { Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
} from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

/**
 * NavigationComponent
 *
 * Primary navigation component used in the application sidebar.
 *
 * @input config - The configuration for the navigation.
 * @type NavGroup[]
 *
 * @example
 * // typescript
 * import { NavigationComponent } from '@alcpay/components';
 * navigationConfig: NavGroup[] = ExampleNavigation;
 *
 * // html
 * <ui-navigation [config]="navigationConfig" />
 */
@Component({
  selector: 'ui-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="w-full">
      <ul role="list" class="list-none p-0">
        <!-- Top-level items -->
        <li *ngFor="let group of navigation" class="relative mt-6 py-1">
          <h2 class="text-xs font-semibold text-zinc-900 dark:text-white">
            {{ group.label }}
          </h2>
          <div class="relative mt-3 pl-2">
            <ul role="list" class="border-l border-transparent">
              <li *ngFor="let link of group.links" class="relative py-1">
                <a
                  [routerLink]="link.link"
                  [routerLinkActive]="['link-active']"
                  [class.text-zinc-900]="isActive(link.link)"
                  [class.text-zinc-600]="!isActive(link.link)"
                  [class.bg-gray-100]="isActive(link.link)"
                  class="link flex justify-between gap-2 py-1 pl-4 pr-3 text-sm transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                  <span class="truncate">{{ link.label }}</span>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <!-- Sign in button -->
        <li class="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <button class="w-full" (click)="router.navigate(['/login'])">
            Sign in
          </button>
        </li>
      </ul>
    </nav>
  `,
  styles: `
  .nav-section-title {
    @apply text-xs font-semibold text-zinc-900 dark:text-white;
  }
  .nav-section-link {
    @apply block py-1 text-sm text-zinc-600 hover:text-zinc-900 active:text-zinc-900 focus:text-zinc-900 dark:text-zinc-400 dark:hover:text-white dark:active:text-white dark:focus:text-white;
  }
  .nav-section .link:hover,
  .nav-section .link:focus,
  .nav-section .link:active,
  .nav-section .link:focus-visible,
  .nav-section .link-active {
    @apply text-zinc-900 transition duration-500 ease-in-out;
  }
  .nav-section .link-active {
    @apply text-zinc-900;
  }
  .nav-section .link {
    @apply text-zinc-600;
  }
  `,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export default class NavigationComponent {
  @Input() config: NavGroup[] | null = null;

  router = inject(Router);
  route = inject(ActivatedRoute);

  navigation: NavGroup[] = this.config ?? DefaultNavigationConfig;

  // Store the active route path
  activePath = signal(this.router.url);

  constructor() {
    this.router.events.subscribe(() => {
      this.activePath.set(this.router.url);
    });
  }

  /**
   * Checks if the given path is the active path.
   * @param {string} path - The path to check.
   * @returns {boolean} - True if the path is active, false otherwise.
   */
  isActive(path: string): boolean {
    return this.activePath() === path;
  }
}

/**
 * NavGroup
 *
 * A group of navigation links.
 *
 * @example
 * import { NavGroup } from '@alcpay/components';
 */
export interface NavGroup {
  label: string;
  tooltipText?: string;
  links: NavLink[];
  expanded?: boolean;
  icon?: string;
  active?: boolean;
}

/**
 * NavLink
 *
 * A single navigation link.
 *
 * @example
 * // typescript
 * import { NavLink } from '@alcpay/components';
 */
export interface NavLink {
  label: string;
  link: string;
  tooltipText?: string;
  icon?: string;
}

export const DefaultNavigationConfig: NavGroup[] = [
  {
    label: '',
    links: [
      { label: 'Dashboard', link: '/' },
      { label: 'Sales', link: '/sales' },
      { label: 'Marketing', link: '/marketing' },
      { label: 'Products', link: '/products' },
      { label: 'Inventory', link: '/inventory' },
      { label: 'Orders', link: '/orders' },
      { label: 'Customers', link: '/customers' },
      { label: 'Reports', link: '/reports' },
      { label: 'VIP Integration', link: '/vip' },
      { label: 'Brand Settings', link: '/settings' },
    ],
  },
  {
    label: 'Setup',
    links: [
      { label: 'Products', link: '/setup/products' },
      { label: 'Shopify', link: '/setup/shopify' },
      { label: 'Webhooks', link: '/setup/webhooks' },
      { label: 'Alerts', link: '/setup/alerts' },
      { label: 'Integrations', link: '/setup/integrations' },
      { label: 'Apps', link: '/setup/apps' },
      { label: 'API Setup', link: '/setup/api' },
      { label: 'Documentation', link: '/help/documentation' },
      { label: 'Support', link: '/help/support' },
    ],
  },
];
