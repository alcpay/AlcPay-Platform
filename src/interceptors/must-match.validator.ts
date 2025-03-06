import { FormGroup } from '@angular/forms'

/**
 * Custom form validator to ensure two form controls have matching values.
 *
 * This validator checks if two specified form controls in a form group have identical values.
 * It sets a 'mustMatch' error on the matching control if the values differ.
 *
 * @remarks
 * Useful for password confirmation fields, email verification, etc.
 *
 * @param controlName - The name of the primary form control to compare
 * @param matchingControlName - The name of the control that must match the primary control
 *
 * @returns A validation function for form group validation
 *
 * @example
 * ```typescript
 * // In form initialization
 * this.form = this.formBuilder.group({
 *   password: ['', Validators.required],
 *   confirmPassword: ['', Validators.required]
 * }, {
 *   validator: MustMatch('password', 'confirmPassword')
 * });
 * ```
 */
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName]
    const matchingControl = formGroup.controls[matchingControlName]

    // Skip if another validator has already found an error
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return
    }

    // Set or clear validation error based on value match
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true })
    } else {
      matchingControl.setErrors(null)
    }
  }
}
