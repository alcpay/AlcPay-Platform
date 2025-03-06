
/**
 * ProductEditPage
 *
 * This component allows users to edit a product. It retrieves the product ID from the query parameters.
 * Other users cannot access this component.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { Component, OnInit } from '@angular/core'; 
import { AuthService } from './../../../../services/auth.service';
import { ProductService } from './../../../../services/product.service';
import { ActivatedRoute } from '@angular/router'; // Import for accessing route parameters
import { Product } from './../../../../models';

@Component({
  standalone: true,
  imports: [],
  template: `
     <h1 class="h1">Edit Product</h1>
     <p class="text-xl">Configure shipping rules on products synced from your shopify integration!</p>
  `,
})
export default class ProductDetailPage implements OnInit {

  // Product object to hold the product details
  product: Product | null = null;

  // Product ID retrieved from the route parameters
  productId: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    console.log('inside product edit page constructor');
  }

  ngOnInit(): void {
    // Retrieve the product ID from the query parameters
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      if (this.productId) {
        this.productService.getProduct(this.productId).subscribe(
          (productData: Product) => {
            this.product = productData; // Assign the retrieved product data
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      } else {
        console.error('Product ID not found');
      }
    });
  }
} 
