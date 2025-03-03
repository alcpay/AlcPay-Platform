import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="min-h-screen bg-gray-100 p-6">
  <!-- Header -->
  <header class="bg-white shadow-md p-4 rounded-md">
    <h1 class="text-3xl font-semibold text-gray-800">AlcPay Tailwind Validator</h1>
  </header>

  <!-- Typography Section -->
  <section class="mt-6 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-lg font-semibold text-gray-700">Typography Examples</h2>
    <h1 class="text-4xl font-bold text-gray-900 mt-2">Heading 1 (H1)</h1>
    <h2 class="text-3xl font-semibold text-gray-800 mt-2">Heading 2 (H2)</h2>
    <h3 class="text-2xl font-medium text-gray-700 mt-2">Heading 3 (H3)</h3>
    <h4 class="text-xl font-normal text-gray-600 mt-2">Heading 4 (H4)</h4>
    <h5 class="text-lg font-light text-gray-500 mt-2">Heading 5 (H5)</h5>
    <p class="text-base text-gray-700 mt-4">
      This is a paragraph. Tailwind provides extensive typography classes that allow you to style text easily.
    </p>
    <p class="text-sm text-gray-500 mt-2">
      This is a smaller paragraph for subtle text styling.
    </p>
  </section>

  <!-- Buttons Section -->
  <section class="mt-6 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-lg font-semibold text-gray-700">Button Variants</h2>
    <div class="mt-4 space-x-4">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-default">Default</button>
      <button class="btn btn-default btn-outline">Outline</button>
      <button (click)="increment()" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">Primary</button>
      <button (click)="increment()" class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition">Secondary</button>
      <button (click)="increment()" class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">Success</button>
      <button (click)="increment()" class="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">Warning</button>
      <button (click)="increment()" class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">Danger</button>
    </div>
  </section>

  <!-- Grid Layouts -->
  <section class="mt-6 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-lg font-semibold text-gray-700">Grid Examples</h2>

    <!-- 2 Column Grid -->
    <h3 class="text-md font-semibold text-gray-600 mt-4">2 Column Grid</h3>
    <div class="grid grid-cols-2 gap-4 mt-2">
      <div class="bg-blue-100 p-4 rounded-md text-center">Item 1</div>
      <div class="bg-blue-200 p-4 rounded-md text-center">Item 2</div>
    </div>

    <!-- 3 Column Grid -->
    <h3 class="text-md font-semibold text-gray-600 mt-6">3 Column Grid</h3>
    <div class="grid grid-cols-3 gap-4 mt-2">
      <div class="bg-green-100 p-4 rounded-md text-center">Item 1</div>
      <div class="bg-green-200 p-4 rounded-md text-center">Item 2</div>
      <div class="bg-green-300 p-4 rounded-md text-center">Item 3</div>
    </div>

    <!-- 4 Column Grid -->
    <h3 class="text-md font-semibold text-gray-600 mt-6">4 Column Grid</h3>
    <div class="grid grid-cols-4 gap-4 mt-2">
      <div class="bg-purple-100 p-4 rounded-md text-center">1</div>
      <div class="bg-purple-200 p-4 rounded-md text-center">2</div>
      <div class="bg-purple-300 p-4 rounded-md text-center">3</div>
      <div class="bg-purple-400 p-4 rounded-md text-center">4</div>
    </div>
  </section>

  <!-- Cards Section -->
  <section class="mt-6 p-6 rounded-lg shadow-lg">
    <h2 class="text-lg font-semibold text-gray-700">Cards</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold">Basic Card</h3>
        <p class="text-gray-600 mt-2">A simple card with a shadow.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold">Card with Button</h3>
        <p class="text-gray-600 mt-2">Cards can include buttons and actions.</p>
        <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">Click Me</button>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold">Card with Image</h3>
        <img alt="Analog Logo" class="w-full h-32 object-cover rounded-md mt-2" src="/analog.svg" />
        <p class="text-gray-600 mt-2">Cards can include images.</p>
      </div>
    </div>
  </section>

  <!-- Modal Trigger -->
  <section class="mt-6 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-lg font-semibold text-gray-700">Modal Example</h2>
    <button (click)="toggleModal()" class="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition">
      Open Modal
    </button>
  </section>

  <!-- Modal -->
  <div *ngIf="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm">
      <h2 class="text-lg font-semibold">Modal Window</h2>
      <p class="text-gray-600 mt-2">This is a sample modal component.</p>
      <button (click)="toggleModal()" class="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
        Close
      </button>
    </div>
  </div>

</div>
  `,
})
export default class HomeComponent {
  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  count = signal(0);
  increment() {
    this.count.update((count) => count + 1);
  }
}
