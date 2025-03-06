import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink, RouterLinkActive, Router } from '@angular/router'
import { DropdownMenuItem, DropdownMenu } from './dropdown-menu.model'

@Component({
  selector: 'twng-dropdown-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
})
export class DropdownMenuComponent {

  @Input() menu: DropdownMenu = new DropdownMenu()
  @Input() icon?: string | null = null
  @Input() label?: string | null = null
  @Input() items: DropdownMenuItem[] = []
  @Input() isOpen: boolean = false
  @Input() menuItems: DropdownMenuItem[] = new Array<DropdownMenuItem>()

  constructor(private router: Router) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen
  }

  handleItemClick(item: DropdownMenuItem) {
    if (item.link) {
      this.router.navigate([item.link])
    }
  }
}
