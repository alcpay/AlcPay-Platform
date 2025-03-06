import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/services/user.service'

import { BrandProfileService } from '../../services/brand-profile.service'
import { OrdersService } from '../../services/orders.service'

interface NavInfo {
  nextInfo?: string
  prevInfo?: string
  next: boolean
  prev: boolean
}

@Component({
  standalone: false,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  // Current user
  currentUser: any = null
  // Loading state
  loading = false
  // Orders
  orders: any[] = []
  // Order details
  orderDetails: any
  // Date
  date: Date | null = null
  // Property added date
  propertyAddedDate: string = ''
  // Page info
  pageInfo = ''
  // Navigation info
  navInfo: NavInfo = { next: false, prev: false }
  // Email
  email: string = ''
  // Search order
  search_order: string = ''
  // Brand ID
  brandId: number = 0
  // Store name
  storeName: string = ''

  constructor(
    private orderService: OrdersService,
    private toastr: ToastrService,
    private userService: UserService,
    private brandService: BrandProfileService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.loading = true

    this.orderService.getOrders(this.pageInfo).subscribe((resp: any) => {
      this.orders = resp.orders
      this.navInfo = resp.nav
      this.loading = false
    })
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user
      this.brandId = this.currentUser?.user?.brand?.id
    })
    this.FetchData()
  }

  /**
   * Wraps logic to display details for a selected order.
   * Note: Modal dialog functionality has been removed as per requirement.
   *
   * @param content - The content template associated with the order details.
   * @param order - The order object whose details are to be retrieved and shown.
   *
   * @returns void
   */
  open(content: any, order: any): void {
    this.orderService.getDetail(order.id).subscribe((resp: any) => {
      this.orderDetails = resp.order
      this.date = new Date(this.orderDetails.created_at)
      let year: number = this.date.getFullYear()
      let month: number = this.date.getMonth() + 1
      let dt: number = this.date.getDate()

      if (dt < 10) {
        dt = 0 + dt
      }
      if (month < 10) {
        month = 0 + month
      }
      this.propertyAddedDate = dt + '-' + month + '-' + year
      // Modal functionality removed as per requirement.
      console.warn('Modal dialog functionality has been removed.')
    })
  }

  /**
   * Wraps logic to send mail for a selected order.
   * Note: Modal dialog functionality has been removed as per requirement.
   *
   * @param content - The content template associated with sending mail.
   * @param order - The order object whose details are to be retrieved.
   *
   * @returns void
   */
  openSendMail(content: any, order: any): void {
    this.orderService.getDetail(order.id).subscribe((resp: any) => {
      this.orderDetails = resp.order
      this.date = new Date(this.orderDetails.created_at)
      let year: number = this.date.getFullYear()
      let month: number = this.date.getMonth() + 1
      let dt: number = this.date.getDate()
      let monthString = month.toString()
      let dtString = dt.toString()
      if (dt < 10) {
        dtString = '0' + dtString
      }
      if (month < 10) {
        monthString = '0' + month
      }
      this.propertyAddedDate = dt + '-' + month + '-' + year
      // Modal functionality removed as per requirement.
      console.warn('Modal dialog functionality for send mail has been removed.')
    })
  }

  // Navigates to the next page of orders.
  nextPage(): void {
    this.pageInfo = this.navInfo.nextInfo || ''
    this.ngOnInit()
  }

  // Navigates to the previous page of orders.
  prevPage(): void {
    this.pageInfo = this.navInfo.prevInfo || ''
    this.ngOnInit()
  }

  // Searches for an order by its order number.
  searchOrder(value: any): any {
    if (value) {
      if (!this.search_order || this.search_order === '') {
        const invalidSearchEl = this.el.nativeElement.querySelector('.invalid-search-order')
        const inputSearchEl = this.el.nativeElement.querySelector('.input-search-order')

        if (invalidSearchEl) {
          this.renderer.setStyle(invalidSearchEl, 'display', 'block')
        }

        if (inputSearchEl) {
          this.renderer.setStyle(inputSearchEl, 'border', '1px solid #FF0000')
        }

        return false
      }

      const invalidSearchEl = this.el.nativeElement.querySelector('.invalid-search-order')
      const inputSearchEl = this.el.nativeElement.querySelector('.input-search-order')

      if (invalidSearchEl) {
        this.renderer.setStyle(invalidSearchEl, 'display', 'none')
      }

      if (inputSearchEl) {
        this.renderer.setStyle(inputSearchEl, 'border', '1px solid #ced4da')
      }

      this.loading = true
      this.orderService.getOrdersByOrderNumber(this.search_order).subscribe((resp: any) => {
        this.orders = resp.orders
        this.navInfo = resp.nav
        this.loading = false
      })
    } else {
      this.search_order = ''
      this.pageInfo = ''
      this.ngOnInit()
    }
  }

  // Resends an email to the customer for a given order.
  resendEmail(email: string, id: any): void {
    this.orderService.resendMail(email, id).subscribe(
      (res: any) => {
        this.toastr.success('Email has been resent')
        this.email = ''
      },
      (error: any) => {
        this.toastr.error(error)
      },
    )
  }

  // Fetches brand data for the current brand.
  FetchData(): void {
    this.brandService.fetchBrand(this.brandId).subscribe(
      (res: any) => {
        this.brandId = res?.data.id
        this.storeName = res?.data.storeName
      },
      (error: any) => {
        this.toastr.error(error ? error : error?.error?.message, 'Error')
      },
    )
  }

  // Fulfills an order for the current brand.
  fulfillOrder(order: any): void {
    this.orderService.fulfillOrder(order, this.storeName).subscribe((resp: any) => {
      this.ngOnInit()
    })
  }
}
