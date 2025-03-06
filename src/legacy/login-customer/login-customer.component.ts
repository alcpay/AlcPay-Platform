import { CommonModule } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { ToastrModule } from 'ngx-toastr'
import { first } from 'rxjs/operators'

import { UserService } from '../../services/user.service'

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule],
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css'],
  providers: [UserService],
})
export class LoginCustomerComponent implements OnInit {
  // Reactive form for login
  loginForm: FormGroup = new FormGroup({})

  // Loading state for the login process
  loading: boolean = false

  // Submission state
  submitted: boolean = false

  // URL to return to after login
  returnUrl: string

  // Error message to display
  error: string = ''

  // Form error messages
  formErrors: { [key: string]: string } = { email: '', password: '' }

  // Validation messages for form fields
  validationMessages: { [key: string]: { required: string } } = {
    email: { required: 'Email is required' },
    password: { required: 'Password is required' },
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(UserService) private userService: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    // Initialize the login form with validation
    this.loginForm = this.formBuilder.group({
      email: [
        localStorage.getItem('rememberMe') || '',
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), // Email format validation
        ],
      ],
      password: ['', Validators.required], // Password is required
      rememberMe: [localStorage.getItem('rememberMe') === 'true'], // Get value from local storage for remember me
    })

    // Set return URL from query params or default to root
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/customer '
  }

  // Getter for easy access to form controls
  get f() {
    return this.loginForm.controls
  }

  // Navigate to the customer registration page
  navToSignUpForm() {
    this.router.navigate(['/customer-register'], { queryParams: { returnUrl: '/' } })
  }

  // Handle form submission
  onSubmitLoginForm() {
    this.submitted = true

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      this.toastr.error('The form is invalid.', 'Error')
      return
    }

    this.loading = true
    /**
     * Handles the login form submission by calling the user service and managing the response.
     * Stores email in local storage if 'remember me' is checked, navigates to return URL on success,
     * and displays error messages on failure.
     */
    this.userService
      .login(this.loginForm.value.email, this.loginForm.value.password, this.f.rememberMe.value)
      .pipe(first())
      .subscribe({
        next: (response) => this.handleLoginSuccess(response),
        error: (error) => this.handleLoginError(error),
      })
  }

  /**
   * Handles successful login response
   * @param response - The successful login response
   */
  private handleLoginSuccess(response: any): void {
    const { email, rememberMe } = this.loginForm.value

    if (rememberMe) {
      localStorage.setItem('rememberMe', email)
    } else {
      localStorage.removeItem('rememberMe')
    }

    this.router.navigate([this.returnUrl])
  }

  /**
   * Handles login errors and displays appropriate messages
   * @param error - The error object from the login attempt
   */
  private handleLoginError(error: any): void {
    const errorMessage = error?.error?.message || 'An error occurred'
    this.toastr.error(errorMessage, 'Error')
    this.error = error
    this.loading = false

    // Clear error message after 5 seconds
    setTimeout(() => {
      this.error = ''
    }, 5000)
  }

  /**
   * Updates the rememberMe form control value based on checkbox state
   * @param event - The checkbox change event
   */
  updateRememberMe(event: Event): void {
    const target = event.target as HTMLInputElement
    this.f.rememberMe.setValue(target.checked)
  }
}
