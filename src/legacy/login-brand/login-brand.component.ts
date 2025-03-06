import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { ToastrModule } from 'ngx-toastr'
import { first } from 'rxjs/operators'

import { UserService } from '../../services/user.service'

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule],
  selector: 'app-login-brand',
  templateUrl: './login-brand.component.html',
  styleUrls: ['./login-brand.component.css'],
  host: {
    class: '',
  },
  providers: [ToastrService],
})
export class LoginBrandComponent implements OnInit, OnDestroy {
  // Reactive form for login
  loginForm: FormGroup = new FormGroup({})

  // Loading state for the login process
  loading: boolean = false

  // Submission state
  submitted: boolean = false

  // URL to return to after login
  returnUrl: string = '/customer/'

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
    private userService: UserService,
    private toastr: ToastrService,
    private renderer: Renderer2,
  ) {
    this.renderer.removeClass(document.body, 'bg-white')
    this.renderer.removeClass(document.documentElement, 'bg-white')
    this.renderer.addClass(document.documentElement, 'bg-gray-900')
  }

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
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/'
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-gray-900')
    this.renderer.removeClass(document.documentElement, 'bg-gray-900')
    this.renderer.addClass(document.documentElement, 'bg-white')
    this.renderer.addClass(document.body, 'bg-white')
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

    // Call the login service with form values
    this.userService
      .login(this.loginForm.value.email, this.loginForm.value.password, this.f.rememberMe.value)
      .pipe(first())
      .subscribe(
        (data) => {
          // Store email in local storage if remember me is checked
          if (this.f.rememberMe.value) {
            localStorage.setItem('rememberMe', this.loginForm.value.email)
          } else {
            localStorage.removeItem('rememberMe')
          }

          // Navigate to the return URL after successful login
          this.router.navigate([this.returnUrl])
        },
        (error) => {
          // Display error message using Toastr
          this.toastr.error(error?.error?.message || 'An error occurred', 'Error')
          this.error = error
          this.loading = false

          // Clear error message after 5 seconds
          setTimeout(() => {
            this.error = ''
          }, 5000)
        },
      )
  }

  // Update rememberMe value based on checkbox change
  updateRememberMe(event: Event) {
    const target = event.target as HTMLInputElement // Type assertion to HTMLInputElement
    this.f.rememberMe.setValue(target.checked) // Set the value based on checkbox state
  }
}
