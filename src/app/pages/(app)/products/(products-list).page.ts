
import { Component, OnInit } from '@angular/core'; 
import { ProductService } from './../../../../services';
import { Product } from './../../../../models';

@Component({
  standalone: true,
  imports: [],
  template: `
     <h1 class="h1">Products</h1>
  `,
})
export default class ProductsListPage implements OnInit {

  /**
   * Array to hold the list of products.
   * @type {Array<Product>}
   */
  productList: Array<Product> = new Array<Product>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

  }
} 
