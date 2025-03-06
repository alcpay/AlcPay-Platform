
/**
 * TestProduct
 *
 * This type represents a test product using the Product model.
 * It includes a record of test data for the product.
 *
 * @property {Product} testProduct - Contains details about the test product.
 */

export class Product {

  // Product Model Properties
  id: string | number  | null = null // UUID for the product
  name: string | null = null // Name of the product
  type: 'alcohol' | 'other' | null = null // Type of the product - either alcohol or other
  price: number | string | null = null // Price of the product
  imageSrc?: string | null = null // Image of the product
  rating: number | null = null // Rating of the product
  reviewCount: number | null = null // Review count of the product
  href: string | null = null // Link to the product
  imageAlt: string | null = null // Alternative text for the image
  colors: { name: string; bgColor: string }[] | null = null // Colors of the product
  sizes: { name: string; inStock: boolean }[] | null = null // Sizes of the product
  isActive: boolean | null = null // Indicates if the product is active
  createdAt?: string | null = null // Created at date of the product
  updatedAt?: string | null = null // Updated at date of the product
  commissionRate: number | null = 0.050 // Default commission rate for the product

  /**
   * @method getTestProducts
   * @description Returns a collection of test products.
   * @returns {Product[]} A record of test products.
   */
  static getTestProducts(): Product[] {
    return [
      {
        id: "1",
        name: "Test Product 1",
        type: "other",
        price: 10.99,
        imageSrc: "https://example.com/test-product-1.jpg",
        rating: 4.5,
        reviewCount: 100,
        href: "https://example.com/test-product-1",
        imageAlt: "Image of Test Product 1",
        colors: [
          { name: 'Red', bgColor: 'bg-red-500' },
          { name: 'Blue', bgColor: 'bg-blue-500' },
        ],
        sizes: [
          { name: 'S', inStock: true },
          { name: 'M', inStock: true },
          { name: 'L', inStock: false },
        ],
        isActive: true,
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-02T00:00:00Z",
        commissionRate: 0.05,
      },
      {
        id: "2",
        name: "Test Product 2",
        type: "alcohol",
        price: 15.99,
        imageSrc: "https://example.com/test-product-2.jpg",
        rating: 4.0,
        reviewCount: 150,
        href: "https://example.com/test-product-2",
        imageAlt: "Image of Test Product 2",
        colors: [
          { name: 'Green', bgColor: 'bg-green-500' },
          { name: 'Yellow', bgColor: 'bg-yellow-500' },
        ],
        sizes: [
          { name: 'M', inStock: true },
          { name: 'L', inStock: true },
          { name: 'XL', inStock: false },
        ],
        isActive: true,
        createdAt: "2023-02-01T00:00:00Z",
        updatedAt: "2023-02-02T00:00:00Z",
        commissionRate: 0.05,
      },
      {
        id: "3",
        name: "Test Product 3",
        type: "other",
        price: 20.99,
        imageSrc: "https://example.com/test-product-3.jpg",
        rating: 3.5,
        reviewCount: 200,
        href: "https://example.com/test-product-3",
        imageAlt: "Image of Test Product 3",
        colors: [
          { name: 'Black', bgColor: 'bg-black' },
          { name: 'White', bgColor: 'bg-white' },
        ],
        sizes: [
          { name: 'S', inStock: true },
          { name: 'M', inStock: false },
          { name: 'L', inStock: true },
        ],
        isActive: true,
        createdAt: "2023-03-01T00:00:00Z",
        updatedAt: "2023-03-02T00:00:00Z",
        commissionRate: 0.05,
      },
      {
        id: "4",
        name: "Test Product 4",
        type: "alcohol",
        price: 25.99,
        imageSrc: "https://example.com/test-product-4.jpg",
        rating: 4.8,
        reviewCount: 250,
        href: "https://example.com/test-product-4",
        imageAlt: "Image of Test Product 4",
        colors: [
          { name: 'Purple', bgColor: 'bg-purple-500' },
          { name: 'Orange', bgColor: 'bg-orange-500' },
        ],
        sizes: [
          { name: 'M', inStock: true },
          { name: 'L', inStock: true },
          { name: 'XL', inStock: true },
        ],
        isActive: true,
        createdAt: "2023-04-01T00:00:00Z",
        updatedAt: "2023-04-02T00:00:00Z",
        commissionRate: 0.05,
      },
      {
        id: "5",
        name: "Test Product 5",
        type: "other",
        price: 30.99,
        imageSrc: "https://example.com/test-product-5.jpg",
        rating: 4.2,
        reviewCount: 300,
        href: "https://example.com/test-product-5",
        imageAlt: "Image of Test Product 5",
        colors: [
          { name: 'Pink', bgColor: 'bg-pink-500' },
          { name: 'Brown', bgColor: 'bg-brown-500' },
        ],
        sizes: [
          { name: 'S', inStock: false },
          { name: 'M', inStock: true },
          { name: 'L', inStock: true },
        ],
        isActive: true,
        createdAt: "2023-05-01T00:00:00Z",
        updatedAt: "2023-05-02T00:00:00Z",
        commissionRate: 0.05,
      },
      {
        id: "6",
        name: "Test Product 6",
        type: "alcohol",
        price: 35.99,
        imageSrc: "https://example.com/test-product-6.jpg",
        rating: 3.9,
        reviewCount: 350,
        href: "https://example.com/test-product-6",
        imageAlt: "Image of Test Product 6",
        colors: [
          { name: 'Cyan', bgColor: 'bg-cyan-500' },
          { name: 'Magenta', bgColor: 'bg-magenta-500' },
        ],
        sizes: [
          { name: 'M', inStock: true },
          { name: 'L', inStock: false },
          { name: 'XL', inStock: true },
        ],
        isActive: true,
        createdAt: "2023-06-01T00:00:00Z",
        updatedAt: "2023-06-02T00:00:00Z",
        commissionRate: 0.05,
      },
      {
        id: "7",
        name: "Test Product 7",
        type: "other",
        price: 40.99,
        imageSrc: "https://example.com/test-product-7.jpg",
        rating: 4.7,
        reviewCount: 400,
        href: "https://example.com/test-product-7",
        imageAlt: "Image of Test Product 7",
        colors: [
          { name: 'Teal', bgColor: 'bg-teal-500' },
          { name: 'Lime', bgColor: 'bg-lime-500' },
        ],
        sizes: [
          { name: 'S', inStock: true },
          { name: 'M', inStock: true },
          { name: 'L', inStock: false },
        ],
        isActive: true,
        createdAt: "2023-07-01T00:00:00Z",
        updatedAt: "2023-07-02T00:00:00Z",
        commissionRate: 0.05,
      },
      {
        id: "8",
        name: "Test Product 8",
        type: "alcohol",
        price: 45.99,
        imageSrc: "https://example.com/test-product-8.jpg",
        rating: 4.3,
        reviewCount: 450,
        href: "https://example.com/test-product-8",
        imageAlt: "Image of Test Product 8",
        colors: [
          { name: 'Navy', bgColor: 'bg-navy-500' },
          { name: 'Olive', bgColor: 'bg-olive-500' },
        ],
        sizes: [
          { name: 'M', inStock: true },
          { name: 'L', inStock: true },
          { name: 'XL', inStock: false },
        ],
        isActive: true, 
        createdAt: "2023-08-01T00:00:00Z",
        updatedAt: "2023-08-02T00:00:00Z",
        commissionRate: 0.05,
      }
    ]
  }
}