/**
 * Application Layout (app).page.ts
 *
 * This component represents the main application layout.
 * It includes navigation, sidebar, and user-specific menu configurations.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importing CommonModule for common Angular directives
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  RouterModule,
} from '@angular/router';

import { AuthenticatedUser } from '../../models';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
  ],
  selector: 'app-layout',
  templateUrl: './(app).page.html',
  styles: `
  `,
  providers: [UserService],
})
export default class AppPage implements OnInit, AfterViewInit, OnDestroy {
  sidebarOpen = false; // Flag to determine if the sidebar is open
  mainNavigation = [
    { label: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { label: 'Orders', link: '/orders', icon: 'attach_money' },
    {
      label: 'Accounting',
      link: '/accounting',
      icon: 'account_balance_wallet',
      current: false,
    },
    { label: 'Products', link: '/products', icon: 'storefront' },
    {
      label: 'Merchandising',
      link: '/merchandising',
      icon: 'local_shipping',
      current: false,
    },
    {
      label: 'Analytics',
      link: '/analytics',
      icon: 'bar_chart',
      current: false,
    },
    {
      label: 'AlcPay AI',
      link: '/ai',
      icon: 'lightbulb',
      current: false,
    },
  ]; // Navigation items

  setupNavigation = [
    {
      id: 1,
      label: 'Shopify',
      link: '/setup/shopify',
      initial: 'S',
      current: false,
    },
    {
      id: 2,
      label: 'Shipping',
      link: '/setup/shipping',
      initial: 'R',
      current: false,
    },
    {
      id: 3,
      label: 'Apps & Add-Ons',
      link: '/setup/apps',
      initial: 'A',
      current: false,
    },
    {
      id: 4,
      label: 'Marketing',
      link: '/setup/marketing',
      initial: 'M',
      current: false,
    },
    {
      id: 5,
      label: 'Digital Marketing',
      link: '/setup/digital-marketing',
      initial: 'D',
      current: false,
    },
    {
      id: 5,
      label: 'Brand  ',
      link: '/setup/settings',
      initial: 'S',
      current: false,
    },
  ]; // Setup navigation items

  firstName: string = 'Mac'; // User's first name
  lastName: string = 'Anderson'; // User's last name
  firstAndLast: string = this.firstName + ' ' + this.lastName; // User's full name
  fullName: string = this.firstName + ' ' + this.lastName; // User's full name

  userBrandName: string = ''; // User's brand name

  /**
   * Flag to determine if the user is a customer.
   */
  isCustomer: boolean = true;

  /**
   * Flag to determine if the user is a staff member.
   */
  isStaff: boolean = false;

  /**
   * Flag to determine if the user is a super admin.
   */
  isSuperAdmin: boolean = false;

  /**
   * Flag to determine if the user is a guest.
   */
  isGuest: boolean = false;

  /**
   * Flag to determine if the user is authenticated.
   */
  isAuthenticated: boolean = false;

  /**
   * The current user.
   */
  currentUser: AuthenticatedUser | null = null;

  /**
   * Flag to determine if the mobile sidebar is open.
   */
  isMobileSidebarOpen = false;

  /**
   * The menu configuration.
   */
  menuConfig: any = menuConfigData;

  /**
   * The menu configuration items.
   */
  menuConfigItems: any[] = [];

  /**
   * Flag to determine if the dropdown is open.
   */
  isDropdownOpen: boolean = false;

  menuRoot: string = '';

  /**
   * Constructor for the DefaultLayoutComponent.
   * @param authService - The authentication service.
   * @param router - The router service.
   * @param changeDetectorRef - The ChangeDetectorRef service.
   */
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(Router) public router: Router,
    private changeDetectorRef: ChangeDetectorRef, // private _location: Location
  ) {
    // Subscribe to router events to force update the view on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeDetectorRef.detectChanges(); // Force view update
      }
    });
  }

  /**
   * Navigates back to the previous page.
   */
  backClicked() {
    console.log('clicked back!');
    // this._location.back()
  }

  /**
   * Initializes the component and sets up the user
   * authentication status and menu configuration.
   */
  ngAfterViewInit(): void {
    this.isMobileSidebarOpen = false;
  }

  /**
   * Cleans up the component when it is destroyed.
   */
  ngOnDestroy(): void {
    this.isMobileSidebarOpen = false;
  }

  /**
   * Initializes the component and sets up the user
   * authentication status and menu configuration.
   */
  ngOnInit(): void {
    this.isMobileSidebarOpen = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event.url);
        this.changeDetectorRef.detectChanges();
      }
    });

    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isAuthenticated = !!this.currentUser;
      this.isCustomer = this.currentUser?.roleId === 3;
      this.isStaff = this.currentUser?.roleId === 2;
      this.isSuperAdmin = this.currentUser?.isSuperAdmin || false;
      this.isGuest = this.currentUser?.roleId === 1;
      this.userBrandName = `${this.currentUser?.user?.brand?.brandName}`;
      // Set the menu configuration items.
      console.log(
        '(app).page.ts => ngOnInit() => this.currentUser: ',
        this.currentUser,
      );
      this.setMenuConfig();
      this.changeDetectorRef.detectChanges();
    });
  }

  /**
   * Toggles the mobile sidebar.
   */
  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  /**
   * Logs out the current user and navigates to the login page.
   */
  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Navigates to the specified link.
   * @param link - The link to navigate to.
   */
  navigateTo(link: string): void {
    const menuArray = Array.isArray(menuConfigData) ? menuConfigData : [];
    const currentMenu = menuArray.find(
      (menu) => menu.role === (this.isStaff ? 2 : 3),
    );
    console.log(currentMenu);
    console.log(currentMenu?.root + link);
    this.router.navigate([currentMenu?.root + link]);
  }

  /**
   * Sets the menu configuration items based on the user's role.
   * Filters menuConfigData to only show menu items relevant to the user's role.
   * Staff (role 2) sees the staff menu, while Customers (role 3) see the customer menu.
   */
  private setMenuConfig(): void {
    const userRole = this.isStaff ? 2 : 3;
    const menuConfig = menuConfigData.find((menu) => menu.role === userRole);
    this.menuConfigItems = menuConfig ? menuConfig.items : [];
    this.menuRoot = menuConfig ? menuConfig.root : '';
  }

  /**
   * Toggles the dropdown visibility.
   * @param event - Optional click event to stop propagation
   */
  toggleDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
