import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticatedUser } from '../../models';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  selector: 'app-auth',
  template: `<div class="auth-layout h-full w-full h-screen w-screen">
    <router-outlet></router-outlet>
  </div>`,
  providers: [UserService],
})
export default class AuthPage implements OnInit {
  isCustomer: boolean = true;
  isStaff: boolean = false;
  isSuperAdmin: boolean = false;
  isGuest: boolean = false;

  isAuthenticated: boolean = false;
  currentUser: AuthenticatedUser | null = null;
  isMobileSidebarOpen = false;
  menuConfig: any = {};

  constructor(
    @Inject(UserService) private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log('*** Template Component Loaded: GuestLayoutComponent ***');
    this.userService.currentUser.subscribe((user: AuthenticatedUser) => {
      this.currentUser = user;
      this.isAuthenticated = !!this.currentUser;
      this.isCustomer = this.currentUser?.roleId === 3;
      this.isStaff = this.currentUser?.roleId === 2;
      this.isSuperAdmin = this.currentUser?.isSuperAdmin || false;
      this.isGuest = this.currentUser?.roleId === 1;
    });
  }

  toggleMobileSidebar(): void {
    console.log('toggleMobileSidebar clicked!');
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  logout(): void {
    console.log('logout clicked!');
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
