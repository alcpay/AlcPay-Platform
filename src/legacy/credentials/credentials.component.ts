import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

import { ShopifyService } from '../../services/shopify.service'

/**
 * Component for managing Shopify credentials and webhook configuration
 */
@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css'],
})
export class CredentialsComponent implements OnInit {
  /** Store access ID for Shopify API authentication */
  storeAccessId: string = ''

  /** Store password for Shopify API authentication */
  storePassword: string = ''

  /** Shopify store URL */
  storeUrl: string = ''

  /** Shopify API version */
  apiVersion: string = ''

  /** Webhook URL for order notifications */
  webhookUrl: string = ''

  constructor(
    private shopifyService: ShopifyService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.fetchWebhookUrl()
  }

  /**
   * Saves Shopify credentials to backend
   */
  saveData(): void {
    this.shopifyService
      .saveShopifyInfo(this.storeUrl, this.storePassword, this.storeAccessId, this.apiVersion)
      .subscribe({
        next: (response) => {
          this.toastr.success(response?.message, 'Success')
          this.clearCredentials()
        },
        error: (error) => {
          const errorMessage = error?.error?.message || error || 'An error occurred'
          this.toastr.error(errorMessage, 'Error')
        },
      })
  }

  /**
   * Fetches Shopify store data
   */
  fetchData(): void {
    this.shopifyService.fetchShopifyData().subscribe({
      next: (response) => {
        console.log('Fetched Shopify data:', response)
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error || 'An error occurred'
        this.toastr.error(errorMessage, 'Error')
      },
    })
  }

  /**
   * Copies webhook URL to clipboard
   */
  copyToClipboard(): void {
    if (!this.webhookUrl) {
      this.toastr.error('No URL available to copy', 'Error')
      return
    }

    navigator.clipboard
      .writeText(this.webhookUrl)
      .then(() => {
        this.toastr.success('URL copied to clipboard', 'Success')
      })
      .catch(() => {
        this.toastr.error('Failed to copy URL', 'Error')
      })
  }

  /**
   * Fetches webhook URL from backend
   */
  private fetchWebhookUrl(): void {
    this.shopifyService.fetchWebhookURL(1).subscribe({
      next: (response) => {
        this.webhookUrl = response?.data?.orderCreationUrl
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error || 'An error occurred'
        this.toastr.error(errorMessage, 'Error')
      },
    })
  }

  /**
   * Clears credential form fields
   */
  private clearCredentials(): void {
    this.storePassword = ''
    this.storeAccessId = ''
    this.storeUrl = ''
    this.apiVersion = ''
  }
}
