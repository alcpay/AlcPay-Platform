import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { NgxIntlTelInputModule, CountryISO, SearchCountryField } from 'ngx-intl-tel-input'
import { ToastrService } from 'ngx-toastr'
import { of } from 'rxjs'
import { UserService } from 'src/app/services/user.service'

import { HelperService } from '../../services/helper.service'

/**
 * RetailerComponent handles the management of retailers including
 * adding, updating, and deleting retailer information.
 *
 * This updated version is refactored to initialize properties properly,
 * exposes 'requestRetailerModal', 'updateModal', and 'assignLocationModal' as expected by the template,
 * and is converted to an Angular 19 friendly standalone component.
 */
@Component({
  standalone: true,
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxIntlTelInputModule, NgMultiSelectDropDownModule],
})
export class RetailerComponent implements OnInit {
  //////////////////////////////////////////////////////////////////////////////
  // Basic Flags and User
  //////////////////////////////////////////////////////////////////////////////
  submitted: boolean = false
  currentUser: any = null

  //////////////////////////////////////////////////////////////////////////////
  // Forms
  //////////////////////////////////////////////////////////////////////////////
  requestRetailerForm!: FormGroup
  updateForm!: FormGroup
  locationForm!: FormGroup
  inhouseForm!: FormGroup
  ratingForm!: FormGroup

  //////////////////////////////////////////////////////////////////////////////
  // Data Collections and Configurations
  //////////////////////////////////////////////////////////////////////////////
  retailerList: any[] = []
  locations: any[] = []
  allStates: any[] = []
  selectedStates: any[] = []
  stateConfig: any = {}

  //////////////////////////////////////////////////////////////////////////////
  // International Telephone Input & Validation
  //////////////////////////////////////////////////////////////////////////////
  SearchCountryField = SearchCountryField
  CountryISO = CountryISO
  URL_REGEX: RegExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,5}[.]{0,1}/

  //////////////////////////////////////////////////////////////////////////////
  // Sorting and Rating Variables
  //////////////////////////////////////////////////////////////////////////////
  sortToggle: boolean = false
  ratings = { communication: 0, speed: 0, price: 0 }
  stars: boolean[] = [true, true, true, true, true]

  //////////////////////////////////////////////////////////////////////////////
  // Identifiers and Miscellaneous
  //////////////////////////////////////////////////////////////////////////////
  retailerId!: string
  fulfillmentId!: string
  id: any
  locationName: string = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private toastr: ToastrService,
    private userService: UserService,
  ) {}

  //////////////////////////////
  // Initialization Methods
  //////////////////////////////

  ngOnInit(): void {
    this.initializeRatingForm()
    this.initializeForms()
    this.configureStateSettings()
    this.loadRetailers()
    this.loadLocations()
    this.loadCurrentUser()
  }

  // Initialize all the forms used in this component
  initializeForms(): void {
    this.submitted = false
    this.requestRetailerForm = this.fb.group({
      businessName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      contact: ['', Validators.required],
      website: ['', [Validators.required, Validators.pattern(this.URL_REGEX)]],
      stripe: ['false', Validators.required],
      inHouseBusiness: ['false', Validators.required],
      states: [[]],
    })

    this.updateForm = this.fb.group({
      businessName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      contact: ['', Validators.required],
      website: ['', [Validators.required, Validators.pattern(this.URL_REGEX)]],
      states: [[]],
    })

    this.locationForm = this.fb.group({
      locationId: ['', Validators.required],
    })

    this.inhouseForm = this.fb.group({
      id: ['', Validators.required],
    })
  }

  // Initialize the rating form with default values
  initializeRatingForm(): void {
    this.ratingForm = this.fb.group({
      communication: [1, Validators.required],
      speed: [1, Validators.required],
      price: [1, Validators.required],
    })
  }

  // Configure settings for state multi-select dropdown
  configureStateSettings(): void {
    this.stateConfig = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    }
  }

  //////////////////////////////
  // Data Loading Methods
  //////////////////////////////

  // Load retailer and state data
  loadRetailers(): void {
    ;(this.helperService.getRetailer() ?? of({ account: [] })).subscribe((data: any) => {
      this.retailerList = data.account
    })
    ;(this.helperService.getAllStates() ?? of({ states: [] })).subscribe((data: any) => {
      this.allStates = data.states.map((item: any) => ({ id: item.id, name: item.name }))
    })
  }

  // Load available locations
  loadLocations(): void {
    ;(this.helperService.getLocations() ?? of([])).subscribe((resp: any) => {
      this.locations = resp
    })
  }

  // Subscribe to the current user
  loadCurrentUser(): void {
    ;(this.userService.currentUser ?? of(null)).subscribe((user) => {
      this.currentUser = user
    })
  }

  //////////////////////////////
  // Modal Methods
  //////////////////////////////

  // Open a generic modal window
  open(content: any): void {
    this.submitted = false
  }

  // Open modal for new retailer request (alias for template)
  requestRetailerModal(content: any): void {
    this.submitted = false
  }

  // Open modal for updating retailer details and patch update form
  updateModal(content: any, retailer: any): void {
    if (Array.isArray(retailer.states)) {
      this.selectedStates = retailer.states.map((item: any) => ({ id: item.id, name: item?.name }))
    } else {
      this.selectedStates = []
    }
    this.id = retailer.id
    this.updateForm.patchValue({
      businessName: retailer.businessName,
      email: retailer.email,
      contact: retailer.contact,
      website: retailer.website,
    })
  }

  // Open modal for submitting a rating
  openRatingModal(content: any, retailer: any): void {
    this.submitted = false
    this.retailerId = retailer?.id
    this.fulfillmentId = retailer.accountId
  }

  // Open modal to toggle in-house business status
  showInHouseModal(content: any, list: any): void {
    this.id = list.id
  }

  // Open modal to assign a location to a retailer
  assignLocationModal(content: any, retailer: any): void {
    this.id = retailer.id
  }

  //////////////////////////////
  // Rating Methods
  //////////////////////////////

  // Set rating value for a specific rating type
  setRating(type: string, rating: number): void {
    this.ratings[type] = rating
  }

  // Validate and submit the rating form
  submitRating(): void {
    this.submitted = true
    if (this.ratingForm.invalid) {
      return
    }
    const ratingData = {
      retailer_id: this.retailerId,
      comm_rating: this.ratings.communication,
      speed_rating: this.ratings.speed,
      price_rating: this.ratings.price,
      fulfillment_id: this.fulfillmentId,
    }
    this.saveRatings(ratingData)
  }

  // Save rating data through the helper service
  saveRatings(ratingData: any): void {
    this.submitted = true
    ;(this.helperService.saveRatings(ratingData) ?? of({ message: 'No response' })).subscribe(
      (response) => {
        this.toastr.success(response?.message)
        this.submitted = false
        this.loadRetailers()
      },
      (error) => {
        this.toastr.error('Failed to save ratings')
        this.submitted = false
      },
    )
  }

  // Generate star icons based on the numeric rating provided
  starGenerator(num: number): string {
    return num === 0 ? 'no rating' : Array.from({ length: num }).fill('⭐').join('')
  }

  //////////////////////////////
  // Retailer CRUD Methods
  //////////////////////////////

  // Submit a new retailer request using the requestRetailerForm
  requestRetailer(): void {
    this.submitted = true
    if (this.requestRetailerForm.invalid) {
      return
    }
    const contactNumber = `${this.requestRetailerForm.value.contact.dialCode} ${this.requestRetailerForm.value.contact.number.replace(/ /g, '').replace(this.requestRetailerForm.value.contact.dialCode, '')}`
    const body = {
      businessName: this.requestRetailerForm.value.businessName,
      email: this.requestRetailerForm.value.email,
      contact: contactNumber,
      website: this.requestRetailerForm.value.website,
      stripe: this.requestRetailerForm.value.stripe,
      inHouseBusiness: this.requestRetailerForm.value.inHouseBusiness,
    }
    ;(this.helperService.requestRetailer(body) ?? of({})).subscribe(
      (response) => {
        this.toastr.success('Retailer submitted successfully!')
        this.loadRetailers()
        this.requestRetailerForm.reset()
      },
      (error) => {
        this.toastr.error(error, '', { timeOut: 2000 })
      },
    )
  }

  // Submit the creation of a new retailer using the same form data
  save(): void {
    this.submitted = true
    if (this.requestRetailerForm.invalid) {
      return
    }
    const contactNumber = `${this.requestRetailerForm.value.contact.dialCode} ${this.requestRetailerForm.value.contact.number.replace(/ /g, '').replace(this.requestRetailerForm.value.contact.dialCode, '')}`
    const body = {
      businessName: this.requestRetailerForm.value.businessName,
      email: this.requestRetailerForm.value.email,
      contact: contactNumber,
      website: this.requestRetailerForm.value.website,
      stripe: this.requestRetailerForm.value.stripe,
      inHouseBusiness: this.requestRetailerForm.value.inHouseBusiness,
    }
    ;(this.helperService.addBusiness(body) ?? of({})).subscribe(
      (response) => {
        this.toastr.success('Retailer added successfully!')
        this.loadRetailers()
        this.requestRetailerForm.reset()
      },
      (error) => {
        this.toastr.error(error, '', { timeOut: 2000 })
        this.submitted = false
      },
    )
  }

  // Update an existing retailer using the updateForm data
  updateRetailer(): void {
    this.submitted = true
    if (this.updateForm.invalid) {
      return
    }
    const statesIds = this.updateForm.value.states.map((item: any) => item.id)
    const contactNumber = `${this.updateForm.value.contact.dialCode} ${this.updateForm.value.contact.number.replace(/ /g, '').replace(this.updateForm.value.contact.dialCode, '')}`
    const body = {
      id: this.id,
      businessName: this.updateForm.value.businessName,
      email: this.updateForm.value.email,
      contact: contactNumber,
      website: this.updateForm.value.website,
      states: statesIds,
    }
    ;(this.helperService.updateBusiness(body) ?? of({})).subscribe(
      (response) => {
        this.toastr.success('Retailer updated successfully!')
        this.loadRetailers()
        this.updateForm.reset()
        this.submitted = false
      },
      (error) => {
        this.toastr.error(error, '', { timeOut: 2000 })
        this.submitted = false
      },
    )
  }

  // Delete a retailer account
  deleteRetailer(id: any): void {
    this.submitted = true
    ;(this.helperService.deleteBusiness(id) ?? of({})).subscribe(
      (res) => {
        this.toastr.info('Account deleted')
        this.loadRetailers()
        this.submitted = false
      },
      (error) => {
        this.toastr.error(error)
        this.submitted = false
      },
    )
  }

  //////////////////////////////
  // Location Assignment Methods
  //////////////////////////////

  // Update the location name based on dropdown selection event
  selected(event: any): void {
    const selectedLocation = this.locations.find((location) => location.id === event.target.value)
    if (selectedLocation) {
      this.locationName = selectedLocation.name
    }
  }

  // Assign a location to a retailer using the locationForm data
  assignLocation(): void {
    this.submitted = true
    if (this.locationForm.invalid) {
      return
    }
    const body = {
      id: this.id,
      locationId: this.locationForm.value.locationId,
      locationName: this.locationName,
    }
    ;(this.helperService.assignLocation(body) ?? of({})).subscribe(
      (response) => {
        this.toastr.success('Location updated successfully!', '', { timeOut: 2000 })
        this.loadRetailers()
        this.locationName = ''
        this.locationForm.reset()
        this.submitted = false
      },
      (error) => {
        this.toastr.error(error, '', { timeOut: 2000 })
        this.submitted = false
      },
    )
  }

  // Unlink a location from the retailer
  unlink(id: any): void {
    this.submitted = true
    ;(this.helperService.unassignLocation(id) ?? of({})).subscribe(() => {
      this.loadRetailers()
      this.submitted = false
    })
  }

  //////////////////////////////
  // Sorting and Placeholder Methods
  //////////////////////////////

  // Toggle the sort order of the retailer list by business name
  toggleSort(): void {
    this.retailerList.sort((a, b) => {
      const na = a.businessName.toLowerCase()
      const nb = b.businessName.toLowerCase()
      return this.sortToggle ? (na < nb ? -1 : na > nb ? 1 : 0) : nb < na ? -1 : nb > na ? 1 : 0
    })
    this.sortToggle = !this.sortToggle
  }

  // Placeholder for individual state selection event handling
  selectState(event: any): void {
    console.log(event)
  }

  // Placeholder for select-all states functionality
  selectAllStates(event: any): void {
    console.log(event)
  }

  //////////////////////////////
  // In-House Business and Account Link Methods
  //////////////////////////////

  // Change the in-house business flag for a retailer
  changeInHouseBusiness(): void {
    ;(this.helperService.changeInHouseBusiness(this.id) ?? of({})).subscribe(() => {
      this.loadRetailers()
      this.submitted = false
    })
  }

  // Create an account link by sending an email to the retailer
  createAccountLink(accountId: any): void {
    const body = { accountId: accountId }
    ;(this.helperService.createAccountLink(body) ?? of({})).subscribe(
      (response) => {
        this.toastr.success('Email sent successfully!')
        this.submitted = false
      },
      (error) => {
        this.toastr.error('Failed to send email')
        this.submitted = false
      },
    )
  }
}
