import { Component, computed, Input, OnInit, signal, Signal, WritableSignal } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Workbook } from 'exceljs'
import { ToastrService } from 'ngx-toastr'
import { UserService } from 'src/app/services/user.service'
import { NgModel } from '@angular/forms'
import { HelperService } from '../../services/helper.service'

@Component({
  standalone: false,
  selector: 'app-fulfillments',
  templateUrl: './fulfillments.component.html',
  styleUrls: ['./fulfillments.component.css'],
})
export class FulfillmentsComponent implements OnInit {
  // Inputs
  @Input() payoutData: any[] = []
  @Input() loading: boolean = false
  @Input() displayExport: boolean = false

  // Filters
  status: WritableSignal<string> = signal('')
  daterange: WritableSignal<string> = signal('')
  shopifyTrackingStatus: WritableSignal<string> = signal('')

  // Pagination
  dataLength = 0
  pageSize = 10
  pageNumber = 1
  pages: number[] = []
  total = 0
  numPages = 0

  // Fulfillment Interval
  fulfillmentInterval: any

  // Sorting
  sortField = ''
  sortToggle = false

  // Brand and Retailer
  brandName: string = ''
  retailerName: string = ''
  unixTimestamp = ''
  currentUser: any = null
  ratingForm: FormGroup = new FormGroup({})
  communicationRating = 0
  speedRating = 0
  priceRating = 0
  stars: boolean[] = [true, true, true, true, true] // 5 stars
  retailerId: string = ''
  fulfillment_id: string = ''

  startDate: string = ''
  endDate: string = ''

  // Computed filtered results
  filteredData: Signal<any[]> = computed(() => {
    return this.payoutData.filter((data) => {
      return (
        (this.status() === '' || data.status.toString() === this.status()) &&
        (this.daterange() === '' || data.dateRange === this.daterange()) &&
        (this.shopifyTrackingStatus() === '' || data.shopifyTrackingStatus === this.shopifyTrackingStatus())
      )
    })
  })

  search() {
    console.log('Searching with filters:', this.status(), this.daterange(), this.shopifyTrackingStatus())
    this.fetchData(true)
  }

  constructor(
    private router: Router,
    private helperService: HelperService,
    private toastr: ToastrService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initializeRatingForm()
    this.fetchData(false)
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user
    })
  }

  starGenerator = (num: number): string => (num === 0 ? 'no rating' : Array.from({ length: num }).fill('⭐').join(''))

  initializeRatingForm(): void {
    this.ratingForm = this.fb.group({
      communication: [1, Validators.required],
      speed: [1, Validators.required],
      price: [1, Validators.required],
    })
  }

  // Open Rating Modal
  openRatingModal(content: any, retailer: any): void {
    console.log('retailer', retailer)
    this.retailerId = retailer?.accountId // retailer object with id and additional details
    this.fulfillment_id = retailer?.fulfillmentId
    // Modal functionality removed.
  }

  // Set rating on click (1-5 stars)
  setRating(type: string, rating: number): void {
    if (type === 'communication') {
      this.communicationRating = rating
    } else if (type === 'speed') {
      this.speedRating = rating
    } else if (type === 'price') {
      this.priceRating = rating
    }
  }

  submitRating(): void {
    if (this.ratingForm.invalid) {
      return
    }

    const ratingData = {
      retailer_id: this.retailerId,
      comm_rating: this.communicationRating,
      speed_rating: this.speedRating,
      price_rating: this.priceRating,
      fulfillment_id: this.fulfillment_id,
    }

    // Call the backend service to save ratings
    this.saveRatings(ratingData)
  }

  saveRatings(ratingData: any): void {
    console.log(ratingData)
    // API call to save the ratings
    this.helperService.saveRatings(ratingData).subscribe(
      (response) => {
        this.toastr.success(response?.message)
        // Modal functionality removed.
        this.communicationRating = 0
        this.speedRating = 0
        this.priceRating = 0
        this.fetchData(false)
      },
      (error) => {
        this.toastr.error('Failed to save ratings')
      },
    )
  }

  clearSearch() {
    this.status.set('')
    this.daterange.set('')
    this.shopifyTrackingStatus.set('')
  }

  searchOld(): void {
    this.fetchData(true)
  }

  navigateToPage(idx: number): void {
    this.pageNumber = idx
    this.fetchData(false)
  }

  fetchData(isSearch: boolean): void {
    this.displayExport = false
    this.loading = true
    this.payoutData = []

    // Reset pagination and pageSize for search or default view
    this.pageSize = 10
    if (isSearch) {
      this.pageNumber = 1
    }

    this.helperService
      .getFulfillments(
        this.pageSize,
        this.pageNumber,
        this.status,
        this.sortField,
        this.daterange,
        this.shopifyTrackingStatus,
        this.retailerName,
        this.brandName,
        this.unixTimestamp,
      )
      .subscribe((res) => {
        clearInterval(this.fulfillmentInterval)
        this.payoutData = res['records']

        if (this.payoutData) {
          this.dataLength = this.payoutData.length
        }

        this.pageSize = res['pageSize']
        console.log(this.pageSize)

        if (this.pageNumber === 1) {
          this.numPages = Math.ceil(res['total'] / res['pageSize'])
          this.total = res['total']
        }

        this.pages = Array.from({ length: this.numPages }, (_, i) => i + 1)
        this.loading = false

        // Update each record with proper tracking status and timestamps
        this.payoutData?.forEach((element, index) => {
          this.payoutData[index]['shopifyTrackingStatus'] = element.shopifyTrackingStatus
            ? element.shopifyTrackingStatus
            : '-'

          let trackingDate
          let daysOutstanding: string = '-'
          const shopifyOrderDate = new Date(element.createdAt)

          if (element.shopifyTrackingUpdateAt) {
            trackingDate = new Date(element.shopifyTrackingUpdateAt)
            const diffTime = Math.abs(trackingDate.getTime() - shopifyOrderDate.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            daysOutstanding = `${diffDays} days`
          }

          this.payoutData[index]['shopifyTrackingDate'] = trackingDate
          this.payoutData[index]['daysOutstanding'] = daysOutstanding
        })

        this.displayExport = true
      })
  }

  toggleSort(fieldName: string): void {
    const order = this.sortToggle ? 'ASC' : 'DESC'
    this.sortField = `${fieldName} ${order}`
    this.fetchData(false)
    this.sortToggle = !this.sortToggle
  }

  exportToExcel(): void {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Fulfillments')

    worksheet.columns = [
      { header: 'Order Number', key: 'orderNumber', width: 15 },
      { header: 'Order URL', key: 'shopifyOrderURL', width: 30 },
      { header: 'Amount', key: 'amount', width: 10 },
      { header: 'Retailer', key: 'retailerName', width: 30 },
      { header: 'Shopify Location', key: 'locationName', width: 30 },
      { header: 'Tracking Status', key: 'status', width: 15 },
      { header: 'Tracking Number', key: 'shopifyTrackingNumber', width: 15 },
      { header: 'Tracking Link', key: 'shopifyTrackingLink', width: 40 },
      { header: 'Shopify Tracking Status', key: 'shopifyTrackingStatus', width: 30 },
      { header: 'Shopify Order Timestamp', key: 'createdAt', width: 30 },
      { header: 'Tracking Timestamp', key: 'shopifyTrackingDate', width: 30 },
      { header: 'Days Outstanding', key: 'daysOutstanding', width: 30 },
    ]

    this.payoutData.forEach((e) => {
      const row = {
        orderNumber: e.orderNumber,
        shopifyOrderURL: e.shopifyOrderURL,
        amount: e.amount.toFixed(2),
        retailerName: e.retailerName,
        locationName: e.locationName,
        status: e.status ? 'SUCCESS' : 'PENDING',
        shopifyTrackingNumber: e.shopifyTrackingNumber ? e.shopifyTrackingNumber : '-',
        shopifyTrackingLink: e.shopifyTrackingLink ? e.shopifyTrackingLink : '-',
        shopifyTrackingStatus: e.shopifyTrackingStatus ? e.shopifyTrackingStatus : '-',
        createdAt: new Date(e.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        shopifyTrackingDate: e.shopifyTrackingDate ? new Date(e.shopifyTrackingDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : '-',
        daysOutstanding: e.daysOutstanding ? e.daysOutstanding : '-',
      }
      worksheet.addRow(row)
    })

    const filename = 'Fulfillment Export-' + new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '_') + '.xlsx'

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      window.URL.revokeObjectURL(url)
    })
  }
}
