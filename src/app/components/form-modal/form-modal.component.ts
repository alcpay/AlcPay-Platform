import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ExampleConfig
 *
 * Configuration object for the FormModalComponent.
 */
export const ExampleConfig = {
  product: {
    name: "Women's Basic Tee",
    price: '$32',
    rating: 3.9,
    reviewCount: 512,
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
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
  },
};

@Component({
  selector: 'ui-form-modal',
  standalone: true,
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css'],
  imports: [CommonModule],
})
export class FormModalComponent {
  /**
   * @property {boolean} open - Indicates whether the modal is open or closed.
   */
  @Input() open: boolean = true;

  /**
   * @property {object} product - Contains details about the product displayed in the modal.
   */
  @Input() product = ExampleConfig.product;

  /**
   * @property {object} selectedColor - The currently selected color for the product.
   */
  selectedColor: { name: string; bgColor: string } = this.product.colors[0];

  /**
   * @property {object} selectedSize - The currently selected size for the product.
   */
  selectedSize: { name: string; inStock: boolean } = this.product.sizes[2];

  /**
   * @property {string} modalBody - The content to be displayed in the modal body.
   */
  @Input() modalBody: string = '';

  /**
   * @property {Function} submitCallback - The function to be called when the submit button is clicked.
   */
  @Input() submitCallback: () => void = () => {};

  /**
   * @property {boolean} animationControls - Controls whether animations are enabled for the modal.
   */
  @Input() animationControls: boolean = true;

  /**
   * @property {string} submitButtonLabel - The label for the submit button.
   */
  @Input() submitButtonLabel: string = 'Submit';

  /**
   * @property {string} closeButtonLabel - The label for the close button.
   */
  @Input() closeButtonLabel: string = 'Close';
}
