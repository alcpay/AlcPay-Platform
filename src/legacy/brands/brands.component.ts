import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
// import * as fs from 'file-saver';
// import * as moment from 'moment';
// import * as $ from 'jquery';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Workbook } from 'exceljs'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { AuthenticatedUser } from 'src/app/models/user.model'
import { UserService } from 'src/app/services/user.service'

import { BrandsService } from '../../services/brands.service'

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ToastrModule, CommonModule, ToastrModule],
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  /** Data length */
  dataLength: number = 0

  /** Page size */
  pageSize: number = 10

  /** Page number */
  pageNumber: number = 1

  /** Pages */
  pages: number[] = []

  /** Total */
  total: number = 0

  /** Number of pages */
  numPages: number = 0

  /** Payout data */
  payoutData: any[] = []

  /** Loading state */
  loading: boolean = true

  /** Commission form */
  commissionForm: FormGroup = new FormGroup({})

  /** Edit form */
  editForm: FormGroup = new FormGroup({})

  /** Current brand ID */
  currentBrandId: string = ''

  /** Brand name */
  brandName: string = ''

  /** Retailer name */
  retailerName: string = ''

  /** Model date structure */
  model: any | null = null

  /** Date object (year, month, day) */
  date: { year: number; month: number; day: number } = { year: 0, month: 0, day: 0 }

  /** Unix timestamp string */
  unixTimestamp: string = ''

  /** Current user */
  currentUser: AuthenticatedUser | null = null

  /**
   * Constructor.
   *
   * @param router Angular router for navigation.
   * @param route ActivatedRoute for accessing route parameters.
   * @param helperService Service for brand-related API calls.
   * @param toastr Toastr service for displaying notifications.
   * @param fb Angular FormBuilder for reactive forms.
   * @param userService Service to manage current user information.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helperService: BrandsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  /**
   * Angular OnInit lifecycle hook.
   * Initializes data fetching and commission form setup.
   */
  ngOnInit(): void {
    this.fetchData(false)
    this.initializeCommissionForm()
    // Retrieve current user details via subscription.
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user
    })
  }

  /**
   * Clears search parameters and resets filters.
   */
  clearSearch(): void {
    this.brandName = ''
    this.retailerName = ''
    this.unixTimestamp = ''
    this.model = null

    this.fetchData(true)
  }

  /**
   * Executes search by computing Unix timestamp if a valid date is provided.
   */
  search_fn(): void {
    // if (this.model && this.model.year && this.model.month && this.model.day) {
    //   const utcTimestamp = Math.floor(
    //     Date.UTC(
    //       this.model.year,
    //       this.model.month - 1, // Adjust month index as JavaScript uses 0-based months.
    //       this.model.day
    //     ) / 1000
    //   );
    //   this.unixTimestamp = utcTimestamp.toString();
    //   console.log('Unix Timestamp (UTC, seconds):', this.unixTimestamp);
    // } else {
    //   console.error('Invalid date model:', this.model);
    // }
    // this.fetchData(true);
  }

  /**
   * Navigates to the brand profile page.
   *
   * @param id The identifier of the brand to navigate to.
   */
  handleNavigate(id: string): void {
    this.router.navigate(['/brand-profile'], { queryParams: { id } })
  }

  /**
   * Initializes the commission and edit forms with validation rules.
   *
   * The commission form validates commission percentage between 0 and 100.
   * The edit form requires brand name, email, contact, website, and activation status.
   */
  initializeCommissionForm(): void {
    this.commissionForm = this.fb.group({
      commission: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(100|[1-9]?[0-9])$/), // Ensures percentage between 0 and 100
        ],
      ],
    })
    this.editForm = this.fb.group({
      brandName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      contact: ['', [Validators.required]],
      website: ['', [Validators.required]],
      isActivated: [true, [Validators.required]],
    })
  }

  /**
   * Opens the edit commission modal for a specific brand.
   *
   * NOTE: Modal functionality removed per refactoring. This method now only patches form data.
   *
   * @param brand The brand object containing details.
   * @param modal The modal reference parameter (unused).
   */
  openEditCommissionModal(brand: any, modal: any): void {
    this.currentBrandId = brand?.id // Retrieve brand ID.
    this.commissionForm.patchValue({
      commission: brand.commission || '', // Pre-fill the commission input.
    })
    // Modal open logic removed as NgbModal references have been removed.
  }

  /**
   * Submits the commission form after validation.
   * Calls the API to update the commission.
   */
  submitCommission(): void {
    if (this.commissionForm.invalid) {
      return
    }

    const updatedCommission = this.commissionForm.value.commission
    const updatedData = {
      brand_id: this.currentBrandId?.toString(),
      commission: updatedCommission,
    }

    // Call the API to update the commission.
    this.saveCommission(updatedData)
  }

  /**
   * Simulated API call to save the commission.
   *
   * @param data The payload containing brand_id and commission.
   */
  saveCommission(data: any): void {
    this.helperService.updateCommision(data).subscribe(
      (response) => {
        // Modal dismiss logic removed as NgbModal references have been removed.
        this.commissionForm.reset()
        this.fetchData(false)
        console.log('response', response)
      },
      (error) => {
        console.log(error.errro)
        this.toastr.error(error, '', {
          timeOut: 2000,
        })
      },
    )
  }

  /**
   * Opens the edit brand modal for modifying brand details.
   *
   * NOTE: Modal functionality removed per refactoring. This method now only patches form data.
   *
   * @param brand The brand object with existing details.
   * @param modal The modal reference parameter (unused).
   */
  openEditBrandModal(brand: any, modal: any): void {
    this.editForm.patchValue({
      brandName: brand?.brandName,
      email: brand?.email,
      contact: brand?.contact,
      website: brand?.website,
      isActivated: brand?.isActivated,
    })
    // Modal open logic removed as NgbModal references have been removed.
  }

  /**
   * Handles the submission of the edit brand form.
   */
  handleSubmitEditBrand(): void {
    const payload = {
      brandName: this.editForm.value?.brandName,
      email: this.editForm.value?.email,
      contact: this.editForm.value?.contact,
      website: this.editForm.value?.website,
      isActivated: this.editForm.value.isActivated,
    }
    this.saveEditFormData(payload)
  }

  /**
   * Simulated API call to save the edited brand data.
   *
   * @param data The payload containing updated brand details.
   */
  saveEditFormData(data: any): void {
    this.helperService.updateBrand(data).subscribe(
      (response) => {
        // Modal dismiss logic removed as NgbModal references have been removed.
        this.editForm.reset()
        this.fetchData(false)
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        })
      },
    )
  }

  /**
   * Navigates to a specified pagination page.
   *
   * @param idx The page index to navigate to.
   */
  navigateToPage(idx: number): void {
    this.pageNumber = idx
    console.log(idx)
    this.fetchData(false)
  }

  /**
   * Fetches brand fulfillment data.
   *
   * @param isSearch Indicates whether the fetch is triggered by a search action.
   */
  fetchData(isSearch: Boolean): void {
    this.loading = true
    this.payoutData = []
    if (isSearch) {
      this.pageNumber = 1
    }

    this.helperService
      .getFulfillments(this.pageSize, this.pageNumber, this.retailerName, this.brandName, this.unixTimestamp)
      .subscribe((res) => {
        this.payoutData = res['data']
        if (this.payoutData) {
          this.dataLength = this.payoutData.length
        }
        this.pageSize = res['pageSize']

        if (this.pageNumber === 1) {
          this.numPages = Math.ceil(res['total'] / res['pageSize'])
          this.total = res['total']
        }

        this.pages = Array(this.numPages)
          .fill(1)
          .map((x, i) => i + 1)
        this.loading = false

        // Additional processing can be added here if needed.
      })
  }
}
