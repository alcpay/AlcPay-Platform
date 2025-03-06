
import { Component, OnInit } from '@angular/core'; 
import { AuthService } from './../../../../services/auth.service';


@Component({
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1>Setup Brand</h1>
      <div class="card p-4 shadow-md bg-white rounded-md">
</div>
      <p class="text-xl">VIP Insights is coming soon! To inquire contact your account representative for more information.</p>
    </div>
  `,
})
export default class SetupBrandPage implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.login('email@email.com','Figure!t0ut', true);
    console.log(this.authService.getCurrentUser()?.user?.brand?.brandName);
    console.log('SetupPage');
  }
} 
