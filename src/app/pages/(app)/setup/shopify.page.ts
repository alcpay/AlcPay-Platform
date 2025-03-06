
import { Component, OnInit } from '@angular/core'; 
import { AuthService } from './../../../../services/auth.service';


@Component({
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1>Connect to Shopify</h1>

</div>
  `,
})
export default class SetupShopifyPage implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.login('email@email.com','Figure!t0ut', true);
    console.log(this.authService.getCurrentUser()?.user?.brand?.brandName);
    console.log('SetupPage');
  }
} 
