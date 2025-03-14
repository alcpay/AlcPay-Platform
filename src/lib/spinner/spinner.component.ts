import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'twng-spinner',
  imports: [CommonModule],
  template: `<!--
  Spinner Component

  A loading spinner that can be displayed either inline or as a centered overlay.
  When overlay=true, the spinner is fixed and centered in the viewport using
  Tailwind's flex and fixed positioning utilities.
  When overlay=false, the spinner displays inline at its insertion point.

  @inputs
  - size: number - Size of the spinner in Tailwind width/height units
  - color: string - CSS color class for the spinner
  - overlay: boolean - Whether to show as centered overlay
  - isVisible: boolean - Controls visibility of spinner
-->
    <div
      *ngIf="isVisible"
      [ngClass]="{
        'fixed inset-0 flex items-center justify-center z-[9999] bg-gray-500/50':
          overlay,
        'flex items-center justify-center': !overlay
      }">
      <div
        role="status"
        class="flex items-center justify-center"
        [ngClass]="{
          'min-h-screen w-full': overlay
        }">
        <svg
          aria-hidden="true"
          [ngClass]="['inline animate-spin', color, 'w-' + size, 'h-' + size]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div> `,
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  @Input() isVisible = false;
  @Input() overlay = false;
  @Input() size = '8';
  @Input() color = 'text-green-600';

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }
}
