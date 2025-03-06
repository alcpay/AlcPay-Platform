import { CommonModule } from '@angular/common'
import { Component, computed, Input, OnInit, signal, WritableSignal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { ToastrModule } from 'ngx-toastr'
import { UserService } from 'src/app/services/user.service'

import { HelperService } from '../../services/helper.service'

/**
 * Component for handling payment operations including listing, sorting, and searching.
 */
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  @Input() payoutData: any[] = []
  @Input() loading: boolean = false
  @Input() pageNumber: number = 1
  @Input() numPages: number = 10

  status: WritableSignal<string> = signal('')
  searchOrder: WritableSignal<string> = signal('')
  retailerName: WritableSignal<string> = signal('')

  filteredData = computed(() => {
    return this.payoutData.filter((data) => {
      return (
        (this.status() === '' || data.status.toString() === this.status()) &&
        (this.searchOrder() === '' || data.orderNumber.includes(this.searchOrder())) &&
        (this.retailerName() === '' || data.retailerName.includes(this.retailerName()))
      )
    })
  })

  navigateToPage(page: number) {
    this.pageNumber = page
  }

  navigatePrev() {
    if (this.pageNumber > 1) this.pageNumber--
  }

  navigateNext() {
    if (this.pageNumber < this.numPages) this.pageNumber++
  }

  dataLength = 0
  pageSize = 10
  pages: number[] = []
  total = 0
  sortField = ''
  sortToggle = false
  search_order: string = ''
  brandName: string = ''
  model: any
  date: { year: number; month: number; day: number } = { year: 0, month: 0, day: 0 }
  unixTimestamp: string = ''
  currentUser: any = null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private toastr: ToastrService,
    private userService: UserService,
  ) {}

  /**
   * Initializes the component by fetching initial data.
   */
  ngOnInit(): void {
    this.fetchData(false)
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user
    })
  }

  /**
   * Clears all search filters and fetches data again.
   */
  clearSearch() {
    this.search_order = ''
    this.brandName = ''
    this.retailerName.set('')
    this.unixTimestamp = ''
    this.status.set('')
    this.model = null

    this.fetchData(true)
  }

  /**
   * Handles the search operation based on the form inputs.
   */
  search() {
    if (this.model && this.model.year && this.model.month && this.model.day) {
      const utcTimestamp = Math.floor(
        Date.UTC(
          this.model.year,
          this.model.month - 1, // Adjust month index
          this.model.day,
        ) / 1000,
      )

      this.unixTimestamp = utcTimestamp.toString()
      console.log('Unix Timestamp (UTC, seconds):', this.unixTimestamp)
    } else {
      console.error('Invalid date model:', this.model)
    }
    this.fetchData(true)
  }

  /**
   * Fetches data based on the current state of filters and pagination.
   * @param {Boolean} isSearch - Indicates if the fetch is triggered by a search.
   */
  fetchData(isSearch: Boolean) {
    if (isSearch) {
      this.pageNumber = 1
    }
    this.helperService
      .getPayouts(
        this.pageSize,
        this.pageNumber,
        this.status(),
        this.sortField,
        this.search_order,
        this.retailerName(),
        this.brandName,
        this.unixTimestamp,
      )
      .subscribe((res) => {
        this.payoutData = res['records']
        console.log(this.payoutData)
        if (this.payoutData) {
          this.dataLength = this.payoutData.length
        }
        this.pageSize = res['pageSize']
        this.total = res['total']
        this.numPages = Math.ceil(res['total'] / res['pageSize'])
        this.pages = Array.from({ length: this.numPages }, (_, i) => i + 1)
      })
  }

  /**
   * Toggles the sorting order of the current sort field.
   * @param {string} fieldName - The field name to sort by.
   */
  toggleSort(fieldName: string) {
    this.sortField = `${fieldName} ${this.sortToggle ? 'ASC' : 'DESC'}`
    this.fetchData(false)
    this.sortToggle = !this.sortToggle
  }
}
