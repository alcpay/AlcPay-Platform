export class DropdownMenuItem {
  label?: string | null = null
  link?: string | null = null
  icon?: string | null = null
  isVisible?: boolean | null = null
  isDisabled?: boolean | null = null
  hoverClass?: string | null = null
  hoverTextClass?: string | null = null
  activeClass?: string | null = null
  activeTextClass?: string | null = null
  click?: () => void | null | undefined = undefined
  textClass?: string | null = 'text-gray-900'
}

export class DropdownMenu {
  label?: string
  icon?: string = 'user'
  items: DropdownMenuItem[] = []
  isOpen: boolean = false
  isVisible?: boolean = true
  isDisabled: boolean = false
  hoverClass: string = 'bg-gray-100'
  hoverTextClass: string = 'text-gray-900'
  activeClass: string = this.hoverClass
  activeTextClass: string = this.hoverTextClass
  textClass: string = 'text-gray-900'
}
