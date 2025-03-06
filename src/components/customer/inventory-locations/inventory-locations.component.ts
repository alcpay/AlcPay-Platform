import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

import { PageHeadingComponent } from './../../../lib/page-heading/page-heading.component'
import { ModalDialogComponent } from './../../../lib/modal-dialog.component'
import { InventoryLocationsService } from './../../../services'
import { InventoryLocation } from './../../../models'

/**
 * Component for managing inventory locations
 * Allows adding, editing and deleting locations
 */
@Component({
  selector: 'customer-inventory-locations',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PageHeadingComponent,
    ModalDialogComponent
  ],
  templateUrl: './inventory-locations.component.html',
  styleUrl: './inventory-locations.component.css',
})
export class InventoryLocationsComponent {
  // Array to store all locations
  locations: Location[] = []
  inventoryLocations: InventoryLocation[] = []
  editingInventoryLocation: InventoryLocation | null = null

  // Form for location data
  locationForm: FormGroup

  // Modal visibility control
  showEditModal: boolean = false

  // Currently edited location
  editingLocation: InventoryLocation | null = null

  constructor(
    private inventoryLocationsService: InventoryLocationsService,
    private toastr: ToastrService
  ) {
    // Initialize form with validation
    this.locationForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      website: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      notes: new FormControl('', [Validators.required]),
      isActive: new FormControl(true),
      image: new FormControl('', [Validators.required]),
      createdAt: new FormControl(null),
      updatedAt: new FormControl(null)
    })
  }

  ngOnInit() {
    this.loadLocations()
  }

  /**
   * Load all locations from service
   */
  loadLocations() {
    this.inventoryLocations = [
      {
        id: 1,
        name: 'Inventory Location 1',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA',
        phone: '123-456-7890',
        email: 'inventory@example.com',
        website: 'https://www.example.com',
        notes: 'Notes for Inventory Location 1',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
        isActive: true,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: 'Inventory Location 2',
        address: '456 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA',
        phone: '123-456-7890',
        email: 'inventory@example.com',
        website: 'https://www.example.com',
        notes: 'Notes for Inventory Location 2',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
        isActive: true,
        image: 'https://via.placeholder.com/150'
      },
    ]
    this.inventoryLocationsService.list().subscribe({
      next: (inventoryLocations) => {
        this.inventoryLocations = inventoryLocations
      },
      error: (error) => {
        this.toastr.error('Failed to load locations', 'Error')
      }
    })
  }

  /**
   * Open modal for adding new location
   */
  openAddLocationModal() {
    this.editingLocation = null
    this.locationForm.reset()
    this.showEditModal = true
  }

  /**
   * Open modal for editing existing location
   * @param location Location to edit
   */
  openEditLocationModal(location: InventoryLocation) {
    this.editingInventoryLocation =  location
    this.locationForm.patchValue({
      name: location.name,
      address: location.address
    })
    this.showEditModal = true
  }

  /**
   * Close the modal dialog
   */
  closeModal() {
    this.showEditModal = false
    this.editingLocation = null
    this.locationForm.reset()
  }

  /**
   * Save new or updated location
   */
  saveLocation() {
    if (this.locationForm.valid) {
      const locationData = this.locationForm.value

      if (this.editingLocation) {
        // Update existing location
        this.inventoryLocationsService.update({
          ...locationData,
          id: this.editingLocation.id
        }).subscribe({
          next: () => {
            this.toastr.success('Location updated successfully')
            this.loadLocations()
            this.closeModal()
          },
          error: () => {
            this.toastr.error('Failed to update location', 'Error')
          }
        })
      } else {
        // Create new location
        this.inventoryLocationsService.create(locationData).subscribe({
          next: () => {
            this.toastr.success('Location created successfully')
            this.loadLocations()
            this.closeModal()
          },
          error: () => {
            this.toastr.error('Failed to create location', 'Error')
          }
        })
      }
    }
  }

  /**
   * Delete a location
   * @param id ID of location to delete
   */
  deleteLocation(id: string) {
    if (confirm('Are you sure you want to delete this location?')) {
      this.inventoryLocationsService.delete(id).subscribe({
        next: () => {
          this.toastr.success('Location deleted successfully')
          this.loadLocations()
        },
        error: () => {
          this.toastr.error('Failed to delete location', 'Error')
        }
      })
    }
  }
}
