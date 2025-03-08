import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { UserService } from './../../../services/user.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule],
  selector: 'app-login',
  template: `
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="rounded-lg bg-white p-8 shadow-lg">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              class="mx-auto h-16 w-auto"
              src="images/logo.png"
              alt="AlcPay Logo" />
            <h2
              class="mb-10 mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
              Sign in to your account
            </h2>
          </div>
          <form
            class="space-y-6"
            [formGroup]="loginForm"
            (ngSubmit)="onSubmitLoginForm()">
            <div>
              <label for="email" class="block  font-medium text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="inputEmail"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  aria-label="Email address"
                  formControlName="email"
                  [ngClass]="{
                    'border-red-500': submitted && f['email'].errors
                  }"
                  autofocus
                  aria-required="true"
                  [attr.aria-invalid]="
                    submitted && f['email'].errors ? 'true' : 'false'
                  "
                  placeholder="Email address"
                  class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 invalid:border-red-500 invalid:text-red-500 focus:ring-2 focus:ring-inset focus:ring-green-600 disabled:bg-gray-100 disabled:text-gray-400 sm:" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block  font-medium text-gray-900"
                  >Password</label
                >
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-green-600 hover:text-green-500"
                    >Forgot password?</a
                  >
                </div>
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  formControlName="password"
                  autocomplete="current-password"
                  required
                  [ngClass]="{
                    'border-red-500': submitted && f['password'].errors
                  }"
                  aria-required="true"
                  class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 invalid:border-red-500 invalid:text-red-500 focus:ring-2 focus:ring-inset focus:ring-green-600 disabled:bg-gray-100 disabled:text-gray-400 sm:" />
              </div>
            </div>

            <div class="flex items-center">
              <div class="flex gap-3">
                <div class="flex h-6 shrink-0 items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600 focus:ring-offset-0"
                    formControlName="rememberMe"
                    (change)="updateRememberMe($event)"
                    [checked]="f['rememberMe'].value"
                    role="switch" />
                </div>
                <label for="rememberMe" class="block text-sm text-gray-900"
                  >Remember me</label
                >
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="btn btn-primary flex w-full justify-center rounded-md !bg-emerald-600 hover:!bg-emerald-500 focus:!bg-emerald-500  focus-visible:outline !border-0 focus-visible:outline-2 focus-visible:outline-offset-2 !text-white hover:!text-white active:!text-white focus-visible:outline-emerald-600 px-3 py-2 font-semibold shadow-sm">
                Sign in
              </button>
            </div>
          </form>

          <!-- <p class="mt-10 text-center  text-gray-500">
        Not a customer?
        <a href="#" class="font-semibold text-green-600 hover:text-green-500" (click)="navToSignUpForm()">Sign up to
          get
          started</a>
      </p> -->
        </div>
      </div>
    </div>
  `,
  providers: [ToastrService],
})
export default class LoginPage implements OnInit, OnDestroy {
  // Reactive form for login
  loginForm: FormGroup = new FormGroup({});

  // Loading state for the login process
  loading = false;

  // Submission state
  submitted = false;

  // URL to return to after login
  returnUrl = 'dashboard';

  // Error message to display
  error = '';

  // Form error messages
  formErrors: { [key: string]: string } = { ['email']: '', password: '' };

  // Validation messages for form fields
  validationMessages: { [key: string]: { required: string } } = {
    ['email']: { required: 'Email is required' },
    password: { required: 'Password is required' },
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private renderer: Renderer2,
  ) {
    this.renderer.removeClass(document.body, 'bg-white');
    this.renderer.removeClass(document.documentElement, 'bg-white');
    this.renderer.addClass(document.documentElement, 'bg-gray-900');
  }

  ngOnInit() {
    // Initialize the login form with validation
    this.loginForm = this.formBuilder.group({
      ['email']: [
        localStorage.getItem('rememberMe') || '',
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), // Email format validation
        ],
      ],
      password: ['', Validators.required], // Password is required
      rememberMe: [localStorage.getItem('rememberMe') === 'true'], // Get value from local storage for remember me
    });

    // Set return URL from query params or default to root
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-gray-900');
    this.renderer.removeClass(document.documentElement, 'bg-gray-900');
    this.renderer.addClass(document.documentElement, 'bg-white');
    this.renderer.addClass(document.body, 'bg-white');
  }

  // Getter for easy access to form controls
  get f() {
    return this.loginForm.controls;
  }

  // Navigate to the customer registration page
  navToSignUpForm() {
    this.router.navigate(['/customer-register'], {
      queryParams: { returnUrl: '/' },
    });
  }

  // Handle form submission
  onSubmitLoginForm() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      this.toastr.error('The form is invalid.', 'Error');
      return;
    }

    this.loading = true;

    // Call the login service with form values
    this.userService
      .login(
        this.loginForm.value['email'],
        this.loginForm.value.password,
        this.f['rememberMe'].value,
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (this.f['rememberMe'].value) {
            localStorage.setItem('rememberMe', this.loginForm.value['email']);
          } else {
            localStorage.removeItem('rememberMe');
          }

          // Navigate to the return URL after successful login
          this.router.navigate([this.returnUrl]);
        },
        (error: any) => {
          // Display error message using Toastr
          this.toastr.error(
            error?.error?.message || 'An error occurred',
            'Error',
          );
          this.error = error;
          this.loading = false;

          // Clear error message after 5 seconds
          setTimeout(() => {
            this.error = '';
          }, 5000);
        },
      );
  }

  // Update rememberMe value based on checkbox change
  updateRememberMe(event: Event) {
    const target = event.target as HTMLInputElement; // Type assertion to HTMLInputElement
    this.f['rememberMe'].setValue(target.checked); // Set the value based on checkbox state
  }
}
