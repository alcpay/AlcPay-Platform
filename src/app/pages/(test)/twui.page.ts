/**
 * TwuiPage
 *
 * This component represents the Twui page for the application.
 * It is a standalone component that imports common Angular modules.
 * 
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { Component } from '@angular/core'; // Importing Component from Angular core
import { CommonModule } from '@angular/common'; // Importing CommonModule for common Angular directives
import { RouterModule } from '@angular/router'; // Importing RouterModule for routing capabilities

@Component({
  selector: 'app-twui', // Selector for the component
  standalone: true, // Indicates that this is a standalone component
  imports: [CommonModule, RouterModule], // Modules imported for this component
  template: `
  <div class="flex flex-col gap-4">
    <h1>Test</h1>
    <button class="btn btn-primary">Test</button>
    <button class="btn btn-secondary">Test</button>
    <button class="btn btn-accent">Test</button>
    <button class="btn btn-ghost">Test</button>
    <button class="btn btn-link">Test</button>
    <button class="btn btn-outline">Test</button>
    <button class="btn btn-primary">Test</button>
    <button class="btn btn-secondary">Test</button>
  </div>
  `,
})
export default class TwuiPage {
  /**
   * Constructor for TwuiPage
   * Logs the creation of the TwuiPage component.
   */
  constructor() {
    console.log('TwuiPage'); // Log message for constructor
  }
}
