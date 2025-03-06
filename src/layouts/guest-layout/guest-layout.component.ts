import { CommonModule } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

import { AuthenticatedUser } from '../../models'
import { AuthService } from '../../services/auth.service'
import { UserService } from '../../services/user.service'

import menuConfigData from './config.json'

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Added CommonModule and RouterOutlet to imports
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.css'],
  providers: [AuthService, UserService],
})
export class GuestLayoutComponent implements OnInit {
  isCustomer: boolean = true
  isStaff: boolean = false
  isSuperAdmin: boolean = false
  isGuest: boolean = false

  isAuthenticated: boolean = false
  currentUser: AuthenticatedUser | null = null // Specify type for currentUser
  isMobileSidebarOpen = false
  menuConfig: any = {}

  constructor(
    @Inject(AuthService) private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log('*** Template Component Loaded: GuestLayoutComponent ***')
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user
      this.isAuthenticated = !!this.currentUser
      this.isCustomer = this.currentUser?.roleId === 3
      this.isStaff = this.currentUser?.roleId === 2
      this.isSuperAdmin = this.currentUser?.isSuperAdmin || false
      this.isGuest = this.currentUser?.roleId === 1
      this.setMenuConfig()
    })
  }

  toggleMobileSidebar(): void {
    console.log('toggleMobileSidebar clicked!')
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen
  }

  logout(): void {
    console.log('logout clicked!')
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  private setMenuConfig(): void {
    const roleId = this.currentUser?.roleId || 0 // Default to 0 for guests
    this.menuConfig = menuConfigData // Set menu configuration based on user role
  }
}
