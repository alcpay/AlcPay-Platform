import { CommonModule} from '@angular/common'
import { Component , Input} from '@angular/core'

@Component({
  selector: 'page-heading',
  imports: [CommonModule],
  templateUrl: './page-heading.component.html',
  styleUrl: './page-heading.component.css',
})
export class PageHeadingComponent {
  /**
   * The title text to display in the page header
   */
  @Input() title: string | null = null
  @Input() icon: string | null = null
}
