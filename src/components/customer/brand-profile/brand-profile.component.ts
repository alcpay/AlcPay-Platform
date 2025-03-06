import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../../../services/user.service'

import { BrandProfileService } from '../../../services/brand-profile.service'

@Component({
  standalone: true,
  selector: 'customer-brand-profile',
  templateUrl: './brand-profile.component.html',
  styleUrls: ['./brand-profile.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class BrandProfileComponent implements OnInit {
  /** Brand name of the user's profile */
  brandName: string = ''

  /** Contact email for the brand */
  email: string = ''

  /** Contact phone number */
  contact: string = ''

  /** Contact phone number */
  phone: string = ''

  /** Brand's website URL */
  website: string = ''

  /** Unique identifier for the brand profile */
  id: number = 0

  /** Current user authentication details */
  currentUser: any = null

  /**
   * Filters out null, undefined, or empty string entries from an object.
   *
   * @typeParam T - The type of object being filtered
   * @param obj - The object to filter
   * @returns A partial object with only valid entries
   */
  public filterValidEntries<T extends object>(obj: T): Partial<T> {
    return Object.keys(obj).reduce((accumulator, key) => {
      const value = obj[key as keyof T]
      if (value !== null && value !== undefined && value !== '') {
        accumulator[key as keyof T] = value
      }
      return accumulator
    }, {} as Partial<T>)
  }

  /**
   * Constructs the BrandProfileComponent with required services.
   *
   * @param brandService - Service for brand profile operations
   * @param route - Angular route service for parameter access
   * @param toastr - Notification service for user feedback
   * @param userService - Service for user authentication
   * @param _location - Angular location service for navigation
   */
  constructor(
    private brandService: BrandProfileService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
  ) {}

  /**
   * Initializes component, fetches user and brand profile data.
   * Handles different logic for super admin and regular users.
   */
  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user
      if (this.currentUser.isSuperAdmin) {
        this.route.queryParams.subscribe((params) => {
          this.id = params['id']
        })
      } else {
        this.id = this.currentUser?.user?.id
      }
    })
    this.fetchData()
  }

  /**
   * Updates the brand profile with current form data.
   * Filters and sends only valid entries to the service.
   */
  updateBrand() {
    const data = this.filterValidEntries({
      brandName: this.brandName,
      email: this.email,
      contact: this.contact,
      website: this.website,
    })
    this.brandService.updateBrand(data).subscribe(
      (res) => {
        console.log(res)
        this.toastr.success(res?.message, 'Success')
      },
      (error) => {
        this.toastr.error(error ? error : error?.error?.message, 'Error')
      },
    )
  }

  /**
   * Fetches brand profile data for the current user.
   * Populates component properties with retrieved data.
   */
  fetchData() {
    this.brandService.fetchBrand(this.id).subscribe(
      (res) => {
        this.brandName = res?.data.brandName
        this.email = res?.data.email
        this.contact = res?.data.contact
        this.website = res?.data.website
        this.id = res?.data.id
      },
      (error) => {
        this.toastr.error(error ? error : error?.error?.message, 'Error')
      },
    )
  }
}
