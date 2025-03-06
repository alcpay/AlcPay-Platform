/**
 * AuthPage
 *
 * This component represents the authentication page for the application.
 * It is a standalone component that imports common Angular modules.
 * 
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { Component } from '@angular/core'; // Importing Component from Angular core
import { CommonModule } from '@angular/common'; // Importing CommonModule for common Angular directives
import { RouterModule, RouterOutlet } from '@angular/router'; // Importing RouterModule for routing capabilities

@Component({
  selector: 'app-auth', // Selector for the component
  standalone: true, // Indicates that this is a standalone component
  imports: [CommonModule, RouterModule, RouterOutlet], // Modules imported for this component
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <h1>Alcpay Authentication</h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export default class AuthPage {
  constructor() {
    console.log('AuthPage'); // Log message for constructor
  }
}