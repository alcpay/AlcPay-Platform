import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { CountryISO, NgxIntlTelInputModule, SearchCountryField } from 'ngx-intl-tel-input'
import { ToastrService } from 'ngx-toastr'
import { StaffService } from 'src/app/services/staff.service'

/**
 * Interface representing a staff record.
 */
interface StaffRecord {
  id: number // Changed from string to number to resolve lint error
  name: string
  phoneNumber: string
  email: string
  isActive: boolean
  roleId: number
  password: string
}

/**
 * StaffComponent is a standalone Angular component that manages staff operations.
 */
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  standalone: true,
  // Import necessary Angular modules for the component template and functionality.
  imports: [CommonModule, ReactiveFormsModule, NgxIntlTelInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class StaffComponent implements OnInit {
  staffForm: FormGroup = new FormGroup({})
  editStaffForm: FormGroup = new FormGroup({})
  submitted = false
  staffList: StaffRecord[] = []
  resetPasswordForm: FormGroup = new FormGroup({})
  searchCountry = SearchCountryField
  countryISO = CountryISO

  /**
   * Constructor for StaffComponent.
   * @param staffService - Service used for staff data management.
   * @param toastr - Service used for displaying notifications.
   */
  constructor(
    private staffService: StaffService,
    private toastr: ToastrService,
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Initializes forms and loads the staff list.
   */
  ngOnInit(): void {
    this.list()
    this.staffForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', [Validators.required]),
      isActive: new FormControl(false),
      roleId: new FormControl(0, [Validators.required]),
    })
  }

  /**
   * Retrieves the list of staff records from the StaffService.
   */
  list(): void {
    const reqTablesParameters = {
      skip: 0,
      limit: 50,
    }
    this.staffService.list(reqTablesParameters).subscribe((data: any) => {
      this.staffList = data.data.staffList.map((staff: any) => ({
        id: staff.id,
        name: staff.name,
        phoneNumber: staff.contact,
        email: staff.email,
        isActive: staff.isActive,
        roleId: staff.roleId,
        password: staff.password,
      }))
    })
  }

  /**
   * Opens a modal or similar UI element.
   * @param content - The modal's content or template reference.
   */
  open(content: any): void {
    // Modal open functionality can be implemented here.
  }

  /**
   * Builds the form for editing a staff record.
   */
  private buildForm(): void {
    this.editStaffForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      isActive: new FormControl(false),
      roleId: new FormControl(0, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  /**
   * Prepares the edit modal with the provided staff record.
   * @param content - The modal's content or template reference.
   * @param staff - The staff record to be edited.
   */
  updateModal(content: any, staff: StaffRecord): void {
    this.buildForm()
    this.editStaffForm.patchValue(staff)
  }

  /**
   * Initializes the reset password form for a particular staff record.
   * @param content - The modal's content or template reference.
   * @param staff - The staff record whose password will be reset.
   */
  reset(content: any, staff: StaffRecord): void {
    this.resetPasswordForm = new FormGroup({
      id: new FormControl(staff.id, [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  /**
   * Saves a new staff record after validating the input form.
   * Displays success or error notifications based on the operation result.
   */
  save(): void {
    this.submitted = true
    if (this.staffForm.invalid) {
      return
    }
    const body = {
      name: this.staffForm.value.name,
      email: this.staffForm.value.email,
      phoneNumber: this.staffForm.value.phoneNumber,
      password: this.staffForm.value.password,
      isActive: this.staffForm.value.isActive,
      roleId: this.staffForm.value.roleId,
    }
    this.staffService.add(body).subscribe(
      (response) => {
        this.toastr.success(response.message, '', { timeOut: 2000 })
        this.list()
        this.staffForm.reset()
      },
      (error) => {
        this.toastr.error(error, '', { timeOut: 2000 })
      },
    )
  }

  /**
   * Deletes the specified staff record and refreshes the staff list.
   * @param staff - The staff record to be deleted.
   */
  delete(staff: StaffRecord): void {
    this.staffService.delete(staff.id).subscribe(
      (response) => {
        this.toastr.success(response.message, '', { timeOut: 2000 })
        this.list()
        this.ngOnInit()
      },
      (error) => {
        this.toastr.error(error, '', { timeOut: 2000 })
      },
    )
  }

  /**
   * Updates an existing staff record after validating the edit form.
   * Displays success or error notifications based on the operation result.
   */
  update(): void {
    this.submitted = true
    if (this.editStaffForm.invalid) {
      return
    }
    const body = {
      id: this.editStaffForm.value.id,
      name: this.editStaffForm.value.name,
      email: this.editStaffForm.value.email,
      phoneNumber: this.editStaffForm.value.phoneNumber,
      isActive: this.editStaffForm.value.isActive,
      roleId: this.editStaffForm.value.roleId,
      password: this.editStaffForm.value.password,
    }
    this.staffService.update(body).subscribe(
      (response) => {
        this.toastr.success(response.message, '', { timeOut: 2000 })
        this.list()
        this.editStaffForm.reset()
      },
      (error) => {
        this.toastr.error(error, '', { timeOut: 2000 })
      },
    )
  }

  /**
   * Resets the password for the specified staff record.
   * Validates the reset password form and displays notifications.
   */
  async resetPassword(): Promise<void> {
    if (this.resetPasswordForm.invalid) {
      return
    }
    const resetPassword: any = this.resetPasswordForm.value
    this.staffService.resetPassword(resetPassword.id, resetPassword.password).subscribe(
      (response) => {
        this.toastr.success(response.message, '', { timeOut: 2000 })
        this.list()
        this.resetPasswordForm.reset()
      },
      (error) => {
        this.toastr.error(error, '', { timeOut: 2000 })
      },
    )
  }
}
