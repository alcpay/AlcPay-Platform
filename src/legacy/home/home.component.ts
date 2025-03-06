// home.component.ts
import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { UserService } from 'src/app/services/user.service'

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule],
})
export class HomeComponent implements OnInit {
  currentUser: any = null

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    console.log('HomeComponent ngOnInit')
    this.userService.getUserData().subscribe((user) => {
      this.currentUser = user
      this.redirectUserBasedOnRole()
    })
  }

  /**
   * Redirects the user based on their role.
   * Admin users are redirected to the KPIs across brands page,
   * while brand users and others are redirected to the orders page.
   */
  private redirectUserBasedOnRole() {
    if (!this.currentUser) {
      this.router.navigate(['/']) // Redirect to root which has PublicGuard
      return
    }

    switch (this.currentUser.roleId) {
      case 2:
        // Admin user
        this.router.navigate(['/staff']) // Redirect to staff home which has AdminGuard
        break
      case 3:
        // Brand user
        this.router.navigate(['/customer']) // Redirect to customer home which has CustomerGuard
        break
      default:
        this.router.navigate(['/']) // Redirect to root for invalid roles
        break
    }
  }
}
