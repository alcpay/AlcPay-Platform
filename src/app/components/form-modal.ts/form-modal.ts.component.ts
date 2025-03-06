import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-form-modal',
  standalone: true,
  templateUrl: './form-modal.ts.component.html',
  styleUrls: ['./form-modal.ts.component.css'],
  imports: [CommonModule],
})
export class FormModalComponent {

  /**
   * @property {boolean} open - Indicates whether the modal is open or closed.
   */
  open: boolean = true;

  /**
   * @property {object} product - Contains details about the product displayed in the modal.
   */
  product: {
    name: string; // The name of the product
    price: string; // The price of the product
    rating: number; // The average rating of the product
    reviewCount: number; // The number of reviews for the product
    href: string; // The URL for more product details
    imageSrc: string; // The source URL for the product image
    imageAlt: string; // The alt text for the product image
    colors: { name: string; bgColor: string }[]; // Available colors for the product
    sizes: { name: string; inStock: boolean }[]; // Available sizes and their stock status
  } = {
    name: "Women's Basic Tee",
    price: '$32',
    rating: 3.9,
    reviewCount: 512,
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
    imageAlt: "Back of women's Basic Tee in black.",
    colors: [
      { name: 'Black', bgColor: 'bg-gray-900' },
      { name: 'Heather Grey', bgColor: 'bg-gray-400' },
    ],
    sizes: [
      { name: 'XXS', inStock: true },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: 'XXL', inStock: false },
    ],
  };

  /**
   * @property {object} selectedColor - The currently selected color for the product.
   */
  selectedColor: { name: string; bgColor: string } = this.product.colors[0];

  /**
   * @property {object} selectedSize - The currently selected size for the product.
   */
  selectedSize: { name: string; inStock: boolean } = this.product.sizes[2];
}
