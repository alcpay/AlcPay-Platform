import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

/**
 * Interface for action menu link items
 */
export interface IActionMenuLink {
  label: string
  url: string
  icon?: string
  activeClass?: string
  inactiveClass?: string
  disabled?: boolean
  isVisible?: boolean
}

/**
 * Interface for configuring action menu items with additional options
 */
export interface IActionMenuConfig {
  icon: string
  label: string
  url: string
  isVisible: boolean
  activeClass: string
  inactiveClass: string
  disabled: boolean
}

/**
 * Interface for footer content
 */
export interface IFooterContent {
  label: string
  url: string
}

/**
 * Interface defining the card component's public API
 */
export interface ICardComponent {
  backgroundColor: string
  padding: string
  cardTitle?: string
  showActionMenu: boolean
  actionMenuLinks: IActionMenuLink[] | null
  footerContent: IFooterContent | null
  isActionMenuOpen: boolean
  toggleActionMenu(): void
}

/**
 * Card component that provides a flexible container with configurable styling and content.
 * Uses Tailwind CSS classes for styling.
 *
 * @Input cardTitle - Optional title displayed in the header
 * @Input backgroundColor - Custom background color class (defaults to bg-white)
 * @Input padding - Custom padding class (defaults to p-4)
 * @Input showActionMenu - Whether to show the action menu dropdown
 * @Input actionMenuLinks - Array of links to show in action menu
 * @Input footerContent - Optional footer content configuration
 */
@Component({
  selector: 'twng-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements ICardComponent {
  // Card styling with Tailwind defaults
  @Input() backgroundColor: string = 'bg-white shadow-md'
  @Input() padding: string = 'p-4'

  // Header options
  @Input() cardTitle?: string
  @Input() showActionMenu: boolean = false
  @Input() actionMenuLinks: IActionMenuLink[] | null = null

  // Footer options
  @Input() footerContent: IFooterContent | null = null

  // Action menu state
  isActionMenuOpen: boolean = false

  /**
   * Toggles the action menu dropdown visibility
   * Handles click events to show/hide the menu
   */
  toggleActionMenu(): void {
    if (!this.actionMenuLinks?.length) {
      return
    }
    this.isActionMenuOpen = !this.isActionMenuOpen
  }
}
