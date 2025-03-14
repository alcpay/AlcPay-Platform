import { CommonModule, Location } from '@angular/common'
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router'

import { AuthenticatedUser } from '../../models'
import { AuthService } from '../../services/auth.service'
import { UserService } from '../../services/user.service'

import menuConfigData from './config.json'

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RouterModule],
  selector: 'app-application-layout',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.css'],
  providers: [AuthService, UserService],
})
export class ApplicationLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  userBrandName: string = ''

  /**
   * Flag to determine if the user is a customer.
   */
  isCustomer: boolean = true

  /**
   * Flag to determine if the user is a staff member.
   */
  isStaff: boolean = false

  /**
   * Flag to determine if the user is a super admin.
   */
  isSuperAdmin: boolean = false

  /**
   * Flag to determine if the user is a guest.
   */
  isGuest: boolean = false

  /**
   * Flag to determine if the user is authenticated.
   */
  isAuthenticated: boolean = false

  /**
   * The current user.
   */
  currentUser: AuthenticatedUser | null = null

  /**
   * Flag to determine if the mobile sidebar is open.
   */
  isMobileSidebarOpen = false

  /**
   * The menu configuration.
   */
  menuConfig: any = menuConfigData

  /**
   * The menu configuration items.
   */
  menuConfigItems: any[] = []

  /**
   * Flag to determine if the dropdown is open.
   */
  isDropdownOpen: boolean = false

  menuRoot: string = ''

  /**
   * Constructor for the DefaultLayoutComponent.
   * @param authService - The authentication service.
   * @param router - The router service.
   * @param changeDetectorRef - The ChangeDetectorRef service.
   */
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(Router) public router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private _location: Location,
  ) {
    // Subscribe to router events to force update the view on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeDetectorRef.detectChanges() // Force view update
      }
    })
  }

  /**
   * Navigates back to the previous page.
   */
  backClicked() {
    this._location.back()
  }

  /**
   * Initializes the component and sets up the user
   * authentication status and menu configuration.
   */
  ngAfterViewInit(): void {
    this.isMobileSidebarOpen = false
  }

  /**
   * Cleans up the component when it is destroyed.
   */
  ngOnDestroy(): void {
    this.isMobileSidebarOpen = false
  }

  /**
   * Initializes the component and sets up the user
   * authentication status and menu configuration.
   */
  ngOnInit(): void {
    this.isMobileSidebarOpen = false
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event.url)
        this.changeDetectorRef.detectChanges()
      }
    })

    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user
      this.isAuthenticated = !!this.currentUser
      this.isCustomer = this.currentUser?.roleId === 3
      this.isStaff = this.currentUser?.roleId === 2
      this.isSuperAdmin = this.currentUser?.isSuperAdmin || false
      this.isGuest = this.currentUser?.roleId === 1
      this.userBrandName = `${this.currentUser?.user?.brand?.brandName}`
      // Set the menu configuration items.
      console.log(this.currentUser)
      this.setMenuConfig()
      this.changeDetectorRef.detectChanges()
    })
  }

  /**
   * Toggles the mobile sidebar.
   */
  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen
  }

  /**
   * Logs out the current user and navigates to the login page.
   */
  logout(): void {
    this.authService.logout()
    this.router.navigate(['/customer/login'])
  }

  /**
   * Navigates to the specified link.
   * @param link - The link to navigate to.
   */
  navigateTo(link: string): void {
    const menuArray = Array.isArray(menuConfigData) ? menuConfigData : []
    const currentMenu = menuArray.find((menu) => menu.role === (this.isStaff ? 2 : 3))
    console.log(currentMenu)
    console.log(currentMenu?.root + link)
    this.router.navigate([currentMenu?.root + link])
  }

  /**
   * Sets the menu configuration items based on the user's role.
   * Filters menuConfigData to only show menu items relevant to the user's role.
   * Staff (role 2) sees the staff menu, while Customers (role 3) see the customer menu.
   */
  private setMenuConfig(): void {
    const userRole = this.isStaff ? 2 : 3
    const menuConfig = menuConfigData.find(menu => menu.role === userRole)
    this.menuConfigItems = menuConfig ? menuConfig.items : []
    this.menuRoot = menuConfig ? menuConfig.root : ''
  }

  /**
   * Toggles the dropdown visibility.
   * @param event - Optional click event to stop propagation
   */
  toggleDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation()
    }
    this.isDropdownOpen = !this.isDropdownOpen
  }

}
