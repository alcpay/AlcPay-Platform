import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterModule } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { ToastrModule } from 'ngx-toastr'
import { first } from 'rxjs/operators'

import { UserService } from '../../services/user.service'

/**
 * LoginStaffComponent handles the staff login functionality
 * @Component decorator defines the metadata for the component
 */
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ToastrModule],
  selector: 'app-login-staff',
  templateUrl: './login-staff.component.html',
  styleUrls: ['./login-staff.component.css'],
})
export class LoginStaffComponent implements OnInit {
  // UI state variables
  isEmailFieldFocused: boolean = false
  isPasswordFieldFocused: boolean = false

  // Form state variables
  loginForm: FormGroup = new FormGroup({})
  isFormLoading: boolean = false
  isFormSubmitted: boolean = false

  // Navigation and error handling
  postLoginRedirectUrl: string
  loginErrorMessage: string = ''

  // Form validation
  formValidationMessages: { [key: string]: { [key: string]: string } } = {
    email: {
      required: 'Email is required',
      pattern: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
    },
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userAuthService: UserService,
    private notificationService: ToastrService,
  ) {}

  /**
   * Initializes the component and sets up the login form
   */
  ngOnInit(): void {
    // Initialize the login form with validation rules
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: ['', Validators.required],
      rememberMe: [false],
    })

    // Get the return URL from route parameters or default to '/'
    this.postLoginRedirectUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/'
  }

  /**
   * Getter for easy access to form controls
   * @returns {AbstractControl} The form controls
   */
  get formControls() {
    return this.loginForm.controls
  }

  /**
   * Handles navigation to the customer login page
   */
  navigateToCustomerLogin(): void {
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/' } })
  }

  /**
   * Handles form submission
   * @returns {void}
   */
  onSubmit(): void {
    this.isFormSubmitted = true

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return
    }

    this.isFormLoading = true
    this.userAuthService
      .login(this.loginForm.value.email, this.loginForm.value.password, this.formControls.rememberMe.value)
      .pipe(first())
      .subscribe({
        next: (response) => {
          // Navigate to the return URL or root if none specified
          const redirectPath = this.postLoginRedirectUrl === '/' ? '/' : this.postLoginRedirectUrl
          this.router.navigate([redirectPath])
        },
        error: (error) => {
          console.error('Login error:', error)
          const errorMessage = error?.error?.message || error || 'An unknown error occurred'
          this.notificationService.error(errorMessage, 'Login Error')
          this.loginErrorMessage = errorMessage
          this.isFormLoading = false

          // Clear error message after 5 seconds
          setTimeout(() => {
            this.loginErrorMessage = ''
          }, 5000)
        },
      })
  }
}
