/**
 * Styles Test Component
 *
 * This component serves as a visual test for the application, showcasing various UI elements
 * such as typography, buttons, grid layouts, cards, and a modal example.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';
import { Product } from '../../../models/product.model';
import { NavigationComponent } from '@alcpay-app/components';
// '../../components/navigation.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormModalComponent,
    NavigationComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <!-- Header -->
      <header class="bg-white shadow-md p-4 rounded-md">
        <h1>Alcpay UI</h1>
      </header>

      <ui-navigation />

      <!-- Icons Section -->
      <section
        class="mt-6 p-6 flex flex-col gap-4 bg-white rounded-lg shadow-lg">
        <span class="h4 section-heading">AlcPay Components</span>
        <h3>Drawers</h3>

        <!-- Drawer end -->
        <button
          type="button"
          class="btn btn-primary py-2 px-4"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="overlay-end-example"
          data-overlay="#overlay-end-example">
          Toggle end
        </button>

        <div
          id="overlay-end-example"
          class="overlay overlay-open:translate-x-0 drawer drawer-end hidden"
          role="dialog"
          tabindex="-1">
          <div class="drawer-header">
            <h3 class="drawer-title">Drawer Title</h3>
            <button
              type="button"
              class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
              aria-label="Close"
              data-overlay="#overlay-end-example">
              <span class="icon-[tabler--x] size-5"></span>
            </button>
          </div>
          <div class="drawer-body">
            <p>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </p>
          </div>
          <div class="drawer-footer">
            <button
              type="button"
              class="btn btn-soft btn-secondary"
              data-overlay="#overlay-end-example">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>

        <!-- Drawer bottom -->
        <button
          type="button"
          class="btn btn-primary px-4 py-2"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="overlay-bottom-example"
          data-overlay="#overlay-bottom-example">
          Toggle bottom
        </button>

        <div
          id="overlay-bottom-example"
          class="overlay drawer overlay-open:translate-y-0 drawer-bottom hidden"
          role="dialog"
          tabindex="-1">
          <div class="drawer-header">
            <h3 class="drawer-title">Drawer Bottom</h3>
            <button
              type="button"
              class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
              aria-label="Close"
              data-overlay="#overlay-bottom-example">
              <span class="icon-[tabler--x] size-5"></span>
            </button>
          </div>
          <div class="drawer-body">
            <h3>H3</h3>
            <p>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </p>
          </div>
          <div class="drawer-footer">
            <button
              type="button"
              class="btn btn-soft btn-secondary"
              data-overlay="#overlay-bottom-example">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </section>
      <section
        class="mt-6 p-6 flex flex-col gap-4 bg-white rounded-lg shadow-lg">
        <div>
          <div class="px-4 sm:px-0">
            <h3 class="text-2xl font-semibold text-base-content">
              Product Information
            </h3>
            <p class="mt-1 max-w-full text-base-content/80">
              Details of the latest product release.
            </p>
          </div>
          <div class="mt-6 border-t border-base-content/25">
            <dl class="divide-y divide-base-content/25">
              <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Product Name</dt>
                <dd class="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
                  FlyonUI Django
                </dd>
              </div>
              <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Category</dt>
                <dd class="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
                  Admin template
                </dd>
              </div>
              <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Release Date</dt>
                <dd class="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
                  March 15, 2024
                </dd>
              </div>
              <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Price</dt>
                <dd class="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
                  $499
                </dd>
              </div>
              <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Description</dt>
                <dd class="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0">
                  The
                  <span class="font-semibold text-base-content"
                    >FlyonUI – Bootstrap Django Admin Dashboard Template</span
                  >
                  – is the most developer friendly & highly customizable Admin
                  Dashboard Template based on Bootstrap 5.
                </dd>
              </div>
              <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Documents</dt>
                <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    class="divide-y divide-base-content/25 rounded-md border border-base-content/25">
                    <li
                      class="flex items-center justify-between py-4 ps-4 pe-5">
                      <div class="flex w-0 flex-1 items-center">
                        <span
                          class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                        <div class="ms-4 flex min-w-0 flex-1 gap-2">
                          <span class="truncate font-medium"
                            >FlyonUI_Pro_User_Manual.pdf</span
                          >
                          <span class="flex-shrink-0 text-base-content/50"
                            >3.2mb</span
                          >
                        </div>
                      </div>
                      <div class="ms-4 flex-shrink-0">
                        <a href="#" class="link link-primary">Download</a>
                      </div>
                    </li>
                    <li
                      class="flex items-center justify-between py-4 ps-4 pe-5">
                      <div class="flex w-0 flex-1 items-center">
                        <span
                          class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                        <div class="ms-4 flex min-w-0 flex-1 gap-2">
                          <span class="truncate font-medium"
                            >FlyonUI_Pro_Installation_Guide.pdf</span
                          >
                          <span class="flex-shrink-0 text-base-content/50"
                            >5.1mb</span
                          >
                        </div>
                      </div>
                      <div class="ms-4 flex-shrink-0">
                        <a href="#" class="link link-primary">Download</a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <ui-form-modal />

      <ul role="list" class="space-y-3">
        <li class="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
          <!-- Your content -->
          <h4 class="h4">Hello Heading 4</h4>
          <p>Hello Paragraph</p>
        </li>
        <li class="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
          <!-- Your content -->
          <h4 class="h4">Hello Heading 4</h4>
          <p>Hello Paragraph</p>
        </li>
        <li class="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
          <!-- Your content -->
          <h4 class="h4">Hello Heading 4</h4>
          <p>Hello Paragraph</p>
        </li>
        <li class="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
          <!-- Your content -->
          <h4 class="h4">Hello Heading 4</h4>
          <p>Hello Paragraph</p>
        </li>
        <!-- More items... -->
      </ul>

      <!-- Icons Section -->
      <section
        class="mt-6 p-6 flex flex-col gap-4 bg-white rounded-lg shadow-lg">
        <span class="h4 section-heading">Icons</span>
        <div class="grid grid-cols-12 gap-2 mt-4">
          <ng-container *ngFor="let icon of icons">
            <span class="icon text-xl">{{ icon }}</span>
          </ng-container>
        </div>
        <div class="divider"></div>
        <span class="h4 section-heading">Icons Outlined</span>
        <div class="grid grid-cols-12 gap-2">
          <ng-container *ngFor="let icon of outlinedIcons">
            <span class="icon outlined text-xl">{{ icon }}</span>
          </ng-container>
        </div>
      </section>

      <!-- Typography Section -->
      <section
        class="mt-6 p-6 flex flex-col gap-4 bg-white rounded-lg shadow-lg">
        <span class="h4 section-heading">Typography Examples</span>
        <div class="grid grid-cols-4 gap-2 mt-4">
          <ng-container *ngFor="let heading of headings">
            <div class="flex flex-col items-center justify-center">
              <div class="block p-2 flex-grid items-center justify-center">
                <div class="{{ heading.class }} {{ heading.text }}">
                  {{ heading.text }}
                </div>
              </div>
              <div
                class="w-full bg-gray-100 text-gray-600 p-2 mt-2 text-sm text-center text-nowrap overflow-x-clip">
                <code class="text-nowrap overflow-x-scroll text-xs"
                  >&lt;{{ heading.tag }} class="{{ heading.class }}"&gt;{{
                    heading.tag
                  }}&lt;/{{ heading.tag }}&gt;</code
                >
              </div>
            </div>
          </ng-container>
        </div>
      </section>

      <!-- Buttons Section -->
      <section class="mt-6 p-6 bg-white rounded-lg shadow-lg">
        <span class="h4 section-heading">Button Variants</span>
        <div class="grid grid-cols-4 gap-2 mt-4">
          <ng-container *ngFor="let button of buttons">
            <div class="flex flex-col items-center justify-center">
              <button [ngClass]="button.class">{{ button.label }}</button>
              <div
                class="w-full text-sm bg-gray-50 text-gray-800 py-2 px-4 mt-4 text-center">
                <code
                  >&lt;button class="{{ button.class }}"&gt;{{
                    button.label
                  }}&lt;/button&gt;</code
                >
              </div>
            </div>
          </ng-container>
        </div>
      </section>

      <!-- Grid Layouts -->
      <section class="mt-6 p-6 bg-white rounded-lg shadow-lg">
        <span class="h4 section-heading">Grid Examples</span>
        <ng-container *ngFor="let grid of grids">
          <h3 class="text-md font-semibold text-gray-600 mt-4">
            {{ grid.title }}
          </h3>
          <div [ngClass]="grid.class">
            <ng-container *ngFor="let item of grid.items">
              <div [ngClass]="item.class">{{ item.label }}</div>
            </ng-container>
          </div>
        </ng-container>
      </section>

      <!-- Cards Section -->
      <section class="mt-6 p-6 rounded-lg shadow-lg">
        <span class="h4 section-heading">Cards</span>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <ng-container *ngFor="let card of cards">
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="text-lg font-semibold">{{ card.title }}</h3>
              <p class="text-gray-600 mt-2">{{ card.description }}</p>
              <ng-container *ngIf="card.button">
                <button
                  class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                  {{ card.button }}
                </button>
              </ng-container>
              <ng-container *ngIf="card.image">
                <img
                  [alt]="card.imageAlt"
                  class="w-full h-32 object-cover rounded-md mt-2"
                  [src]="card.image" />
              </ng-container>
              <ng-container *ngIf="card.customHTML">
                <div [innerHTML]="card.customHTML"></div>
              </ng-container>
            </div>
          </ng-container>
        </div>
      </section>

      <!-- Modal Trigger -->
      <section class="mt-6 py-6 px-6 bg-white rounded-lg shadow-lg">
        <span class="h4 section-heading">Modal Dialog</span>
        <button class="btn btn-default" (click)="toggleModal()">
          Open Modal
        </button>
      </section>

      <!-- Modal -->
      <div
        *ngIf="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <h4 class="h4">Modal Window</h4>
          <p class="text-gray-600 mt-2">This is a sample modal component.</p>
          <hr class="mt-4" />
          <button class="btn btn-danger mt-4" (click)="toggleModal()">
            Close
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .section-heading {
      font-weight: 300!important;
      text-transform: uppercase!important;
      color: #64748b!important;
      line-height: 2rem!important;
      font-size: 1.25rem!important;
      font-weight: 600!important;
      padding-bottom: 1rem!important;
      padding-bottom: 1rem!important;
      display: block!important;
      text-align: center!important;
    }

    .icon-demo {
      @apply transition-all duration-300;
      @apply w-24 h-24 bg-white text-gray-600 rounded-md shadow-md drop-shadow p-0;
    }
    .icon-demo:hover {
      @apply bg-gray-100;
    }
    .icon-demo:active {
      @apply bg-gray-200;
    }
    .icon-demo:focus {
      @apply bg-gray-200;
    }
    .icon-demo:focus-visible {
      @apply bg-gray-200;
    }
    .icon-demo .icon {
      font-size: 3rem;
      @apply text-gray-900;
      @apply font-light;
    }

    .source-code {
      @apply flex flex-col text-left;
    }
    .source-code code {
      @apply text-gray-900;
      @apply font-light;
      @apply p-2;
      @apply rounded-md;
      @apply bg-gray-100;
    }
  `,
})
export default class TailwindPage {
  // General Model Demo Flag
  showModal: boolean = false;

  // Product Demo Data
  products: Product[] = Product.getTestProducts();
  activeProduct: Product = this.products[0];

  /**
   * Configuration for the custom select dropdown component.
   * @type {object}
   */
  selectConfig = {
    placeholder: 'Select option...', // Placeholder text for the select dropdown
    toggleTag:
      '<button type="button" aria-expanded="false"><span class="me-2" data-icon></span><span class="text-base-content" data-title></span></button>', // HTML template for the toggle button
    toggleClasses: 'advance-select-toggle items-center', // CSS classes for the toggle button
    dropdownClasses: 'advance-select-menu max-h-44', // CSS classes for the dropdown menu
    optionClasses: 'advance-select-option selected:active', // CSS classes for the options
    optionTemplate:
      '<div><div class="flex items-center"> <div class="me-2" data-icon></div> <div class="font-semibold text-base-content" data-title></div> </div> <div class="mt-1.5 text-sm text-base-content/80" data-description></div> </div>', // HTML template for each option
    extraMarkup:
      '<span class="icon-[tabler--caret-up-down] flex-shrink-0 size-4 text-base-content absolute top-1/2 end-3 -translate-y-1/2 "></span>', // Additional HTML markup for the select component
  };

  selectConfigJSONString = JSON.stringify(this.selectConfig);

  selectOptions = [
    {
      value: 1,
      config: JSON.stringify({
        title: '-Select One-',
        description: '',
        value: '',
        selected: true,
        icon: '',
      }),
    },
    {
      title: 'title 1',
      value: 1,
      config: JSON.stringify({
        title: '-Select One-',
        description: '',
        value: 2,
        selected: false,
        icon: '',
      }),
    },
    {
      title: 'title 3',
      value: 3,
      config: JSON.stringify({
        title: '-Select One-',
        description: '',
        value: 3,
        selected: false,
        icon: '',
      }),
    },
  ];
  /**
   * Array of Material icon names used in the icons section.
   * @type {string[]}
   */
  icons: string[] = [
    'phone',
    'email',
    'person',
    'settings',
    'warning',
    'home',
    'search',
    'shopping_cart',
    'star',
    'check_circle',
    'close',
    'delete',
    'storefront',
    'payments',
    'shopping_bag',
    'account_circle',
    'account_box',
    'account_balance',
    'account_balance_wallet',
  ];

  // Array of outlined icons for the icons section
  outlinedIcons: string[] = [
    'phone',
    'email',
    'lock',
    'person',
    'settings',
    'info',
    'warning',
  ];

  // Array of heading elements for the typography section
  headings = [
    { tag: 'h1', text: 'Heading 1', class: 'h1' },
    { tag: 'h2', text: 'Heading 2', class: 'h2' },
    { tag: 'h3', text: 'Heading 3', class: 'h3' },
    { tag: 'h4', text: 'Heading 4', class: 'h4' },
    { tag: 'h5', text: 'Heading 5', class: 'h5' },
    { tag: 'h6', text: 'Heading 6', class: 'h6' },
    { tag: 'p', text: 'Body Text', class: 'p' },
    { tag: 'p', text: 'Bold Body Text', class: 'p-bold' },
    { tag: 'p', text: 'Italic Body Text', class: 'italic' },
    { tag: 'p', text: 'Underlined Body Text', class: 'underline' },
    { tag: 'p', text: 'Strikethrough Body Text', class: 'line-through' },
    { tag: 'span', text: 'Large Text', class: 'text-lg' },
    { tag: 'span', text: 'Extra Large Text', class: 'text-xl' },
    { tag: 'small', text: 'Small Text', class: 'text-sm text-gray-900 p' },
    { tag: 'span', text: 'Extra Small Text', class: 'text-xs text-gray-900 p' },
  ];

  // Array of button variants
  buttons = [
    { label: 'Primary', class: 'btn btn-primary' },
    { label: 'Default', class: 'btn btn-default' },
    { label: 'Black', class: 'btn btn-black' },
    { label: 'Error', class: 'btn btn-error' },
    { label: 'Warning', class: 'btn btn-warning' },
    { label: 'Success', class: 'btn btn-success' },
    { label: 'Info', class: 'btn btn-info' },
    { label: 'Outline Black', class: 'btn btn-out btn-out-black' },
  ];

  // Array of grid layouts
  grids = [
    {
      title: '2 Column Grid',
      class: 'grid grid-cols-2 gap-4 mt-2',
      items: [
        { label: 'Item 1', class: 'bg-indigo-200 p-4 rounded-md text-center' },
        { label: 'Item 2', class: 'bg-indigo-300 p-4 rounded-md text-center' },
      ],
    },
    {
      title: '3 Column Grid',
      class: 'grid grid-cols-3 gap-4 mt-2',
      items: [
        { label: 'Item 1', class: 'bg-green-100 p-4 rounded-md text-center' },
        { label: 'Item 2', class: 'bg-green-200 p-4 rounded-md text-center' },
        { label: 'Item 3', class: 'bg-green-300 p-4 rounded-md text-center' },
      ],
    },
    {
      title: '4 Column Grid',
      class: 'grid grid-cols-4 gap-4 mt-2',
      items: [
        { label: '1', class: 'bg-purple-100 p-4 rounded-md text-center' },
        { label: '2', class: 'bg-purple-200 p-4 rounded-md text-center' },
        { label: '3', class: 'bg-purple-300 p-4 rounded-md text-center' },
        { label: '4', class: 'bg-purple-400 p-4 rounded-md text-center' },
      ],
    },
  ];

  // Array of card details
  cards = [
    { title: 'Basic Card', description: 'A simple card with a shadow.' },
    {
      title: 'Card with Button',
      description: 'Cards can include buttons and actions.',
      button: 'Click Me',
    },
    {
      title: 'Card with Image',
      description: 'Cards can include images.',
      image: '/analog.svg',
      imageAlt: 'Analog Logo',
    },
    {
      title: 'Card with Image and Button',
      description: 'Cards can include images and buttons.',
      image: '/analog.svg',
      imageAlt: 'Analog Logo',
      button: 'Click Me',
    },
    {
      title: 'Login Card',
      description: 'A simple card with a login form.',
      customHTML: `
        <div class="flex flex-col items-center">
          <h4 class="text-lg font-semibold mb-2">Welcome Back!</h4>
          <form class="w-full max-w-sm">
            <div class="mb-4">
              <input type="text" placeholder="Username" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mb-4">
              <input type="password" placeholder="Password" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" class="btn btn-primary w-full">Login</button>
          </form>
        </div>
      `,
    },
  ];

  /**
   * Toggles the visibility of the modal.
   */
  toggleModal() {
    this.showModal = !this.showModal;
  }

  // Signal to track the count value
  count = signal(0);

  /**
   * Increments the count value by 1.
   */
  increment() {
    this.count.update((count) => count + 1);
  }
}
