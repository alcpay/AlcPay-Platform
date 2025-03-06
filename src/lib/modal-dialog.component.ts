import { animate, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'modal-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
      [@modalAnimation]>
      <div
        class="fixed inset-0 bg-black opacity-50"
        (click)="closeModal()"></div>
      <div class="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <button
          class="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          (click)="closeModal()">
          ✕
        </button>
        <h2 class="mb-4 text-2xl font-semibold">{{ title }}</h2>
        <div class="modal-content">
          <ng-content></ng-content>
        </div>
        <div class="mt-4 flex justify-end gap-4">
          <button
            class="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            (click)="closeModal()">
            {{ cancelText }}
          </button>
          <button
            class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            (click)="confirmModal()">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-content {
        max-height: 60vh;
        overflow-y: auto;
      }
    `,
  ],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
  ],
})
export class ModalDialogComponent {
  @Input() isOpen = false
  @Input() title = 'Modal Title'
  @Input() cancelText = 'Cancel'
  @Input() confirmText = 'Confirm'

  @Output() close = new EventEmitter<void>()
  @Output() confirm = new EventEmitter<void>()

  closeModal() {
    this.close.emit()
  }

  confirmModal() {
    this.confirm.emit()
  }
}
