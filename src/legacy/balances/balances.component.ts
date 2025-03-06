import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrModule, ToastrService } from 'ngx-toastr'

import { HelperService } from '../../services/helper.service'

/**
 * BalancesComponent manages retailer balance information and pagination.
 *
 * This component handles fetching, displaying, and sorting of retailer balances
 * with support for paginated data retrieval.
 *
 * @remarks
 * Integrates with HelperService to fetch balance data and provides
 * sorting and pagination functionality.
 *
 */
@Component({
  standalone: true,
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule],
})
export class BalancesComponent implements OnInit {
  /** Total number of data records */
  dataLength = 0

  /** Number of items per page */
  pageSize = 10

  /** Current page number */
  pageNumber = 1

  /** Array of page numbers for pagination */
  pages: number[] = []

  /** Total number of records */
  total = 0

  /** Total number of pages */
  numPages = 0

  /** Balance data records */
  balanceData: any[] = []

  /** Filter status */
  status = ''

  /** Field to sort by */
  sortField = ''

  /** Toggle for sort direction */
  sortToggle = false

  /**
   * Constructs the BalancesComponent with required services.
   *
   * @param modalService - NgbModal service for modal interactions
   * @param router - Angular router for navigation
   * @param route - Current active route
   * @param helperService - Service for fetching balance data
   * @param toastr - Toastr service for notifications
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private toastr: ToastrService,
  ) {}

  /**
   * Initializes component and fetches initial balance data.
   */
  ngOnInit(): void {
    this.fetchData()
  }

  /**
   * Navigates to a specific page and fetches corresponding data.
   *
   * @param idx - Page number to navigate to
   */
  navigateToPage(idx: number): void {
    this.pageNumber = idx
    this.fetchData()
  }

  /**
   * Fetches balance data from the helper service.
   *
   * Retrieves paginated and sorted balance records, updates
   * component state with fetched data.
   */
  fetchData(): void {
    this.helperService.getBalances(this.pageSize, this.pageNumber, this.status, this.sortField).subscribe((res) => {
      this.balanceData = res['records']

      if (this.balanceData) {
        this.dataLength = this.balanceData.length
      }

      this.pageSize = res['pageSize']
      this.total = res['total']
      this.numPages = Math.ceil(res['total'] / res['pageSize'])
      this.pages = Array(this.numPages)
        .fill(1)
        .map((x, i) => i + 1)
    })
  }

  /**
   * Toggles sorting for a specific field.
   *
   * @param fieldName - Name of the field to sort by
   */
  toggleSort(fieldName: string): void {
    this.sortField = `${fieldName} ${this.sortToggle ? 'ASC' : 'DESC'}`
    this.fetchData()
    this.sortToggle = !this.sortToggle
  }
}
