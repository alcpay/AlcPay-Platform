import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService, ToastrModule, IndividualConfig } from 'ngx-toastr';
import { ShopifyService } from './../../../../services/shopify.service';

/**
 * SetupPageComponent
 *
 * This component handles product management and configuration for the setup page.
 * It manages the connection to Shopify and provides UI interactions for product syncing.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './store.page.html',
  providers: [ShopifyService, { provide: ToastrService, useValue: {} }],
})
export default class SetupPageComponent implements OnInit {
  isShopifyConnected: boolean = false; // Indicates if Shopify is connected
  isSyncProcessing: boolean = false; // Indicates if sync is in process
  selectedTab: 'products' | 'inventory' | 'shipping' | 'reviews' = 'products'; // Current selected tab

  constructor(
    private toastr: ToastrService, // Toastr service for notifications
    private shopifyService: ShopifyService, // Service to interact with Shopify
  ) {}

  // Query all menu elements in the template
  @ViewChildren('menu') menus!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.shopifyService.fetchShopifyData().subscribe({
      next: (data) => {
        this.isShopifyConnected = true;
      },
      error: (error) => {
        this.isShopifyConnected = false;
      },
    });
  }

  /**
   * Handles tab change events from the mobile dropdown
   * @param event - Change event from select element
   */
  onTabChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedTab = select.value as
      | 'products'
      | 'inventory'
      | 'shipping'
      | 'reviews';
  }

  /**
   * Toggles visibility of the dropdown menu
   * @param event - Click event from the button
   */
  toggleMenu(event: Event): void {
    // Get the parent container element
    const container = (event.target as HTMLElement).closest(
      '[data-menu-container]',
    );
    if (!container) return;

    // Find the menu element within this container
    const menu = container.querySelector('[data-menu]');
    if (!menu) return;

    // Toggle the hidden class
    menu.classList.toggle('hidden');

    // Close other open menus
    this.menus.forEach((menuRef) => {
      const menuElement = menuRef.nativeElement;
      if (menuElement !== menu && !menuElement.classList.contains('hidden')) {
        menuElement.classList.add('hidden');
      }
    });

    // Close menu when clicking outside
    const closeMenu = (e: MouseEvent) => {
      if (!container.contains(e.target as Node)) {
        menu.classList.add('hidden');
        document.removeEventListener('click', closeMenu);
      }
    };
    document.addEventListener('click', closeMenu);
  }

  /**
   * Syncs products with a delay and displays a success toast
   * @param event - Click event from the button
   */
  syncProducts(event: Event): void {
    this.isSyncProcessing = true;
    console.log('Syncing products');
    // Add delay before setting sync processing flag
    setTimeout(() => {
      this.isSyncProcessing = false;
      console.log('Products synced successfully');
      this.toastr.success('Products synced successfully');
    }, 2000);
  }
}
