import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { first } from 'rxjs/operators'

import { UserService } from '../../services/user.service'

@Component({
  standalone: false,
  selector: 'app-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.scss'],
})
export class RegisterBrandComponent implements OnInit {
  usernameFocus
  passwordFocus
  loginForm: FormGroup
  loading = false
  submitted = false
  returnUrl: string
  error = ''
  selectedRememberMeOption: string
  formValueChanges: any
  formErrors: any = { username: '', password: '' }
  validationMessages: any = {
    username: { required: 'Username is required' },
    password: { required: 'Password is required' },
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: ['', Validators.required],
      // website: ['', [Validators.pattern('https?://[a-zA-Z0-9.-]+(?:\.[a-zA-Z]{2,})+')]],  // URL pattern
      contact: ['', [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      // website: '', // URL pattern
      website: [
        '',
        [
          Validators.pattern(
            '^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$',
          ),
        ],
      ], // URL pattern

      // contact: '',
      brandName: '',
      rememberMe: [false],
    })

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/'
  }

  get f() {
    return this.loginForm.controls
  }
  handleNavigate() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/' } })
  }

  onSubmit() {
    this.submitted = true

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.userService
      .registerBrand(
        this.loginForm.value.email,
        this.loginForm.value.password,
        this.f.rememberMe.value,
        this.loginForm.value.brandName,
        this.loginForm.value.contact,
        this.loginForm.value.website,
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.returnUrl = this.returnUrl === '/' ? '/' : this.returnUrl
          this.router.navigate([this.returnUrl])
        },
        (error) => {
          this.toastr.error(error ? error : error?.error?.message, 'Error')
          const that = this
          this.error = error
          this.loading = false
          setTimeout(() => {
            that.error = ''
          }, 5000)
        },
      )
  }
}
