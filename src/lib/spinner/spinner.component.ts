import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'twng-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  @Input() isVisible = false
  @Input() overlay = false
  @Input() size = '8'
  @Input() color = 'text-green-600'

  show() {
    this.isVisible = true
  }

  hide() {
    this.isVisible = false
  }
}
