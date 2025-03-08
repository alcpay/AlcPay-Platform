/**
 * FormComponent
 *
 * This component renders a form with dynamic fields and validation.
 * It uses FlyonUI and TailwindCSS for styling.
 *
 * import: @alcpay/tailwind
 * path: themes/switcher.component.ts
 */

import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface IFormConfig {
  title: string;
  subtitle: string;
  description: string;
  helpUrl: string;
  fields: Array<{
    name: string;
    type: string;
    label: string;
    placeholder: string;
    tooltip: string;
    validators: any[];
  }>;
  buttons: {
    submitLabel: string;
    cancelLabel: string;
  };
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <section class="mt-6 p-6 flex flex-col gap-4 bg-white rounded-lg shadow-lg">
      <div>
        <div class="px-4 sm:px-0">
          <h3 class="text-2xl font-semibold text-base-content">
            {{ formConfig?.title || 'No Title' }}
          </h3>
          <p class="mt-1 max-w-full text-base-content/80">
            {{ formConfig?.subtitle || 'No Subtitle' }}
          </p>
          <p class="mt-1 max-w-full text-base-content/80">
            {{ formConfig?.description || 'No Description' }}
          </p>
          <a [href]="formConfig?.helpUrl || '#'" class="text-blue-500 underline"
            >Help</a
          >
        </div>
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
          <div *ngFor="let field of formConfig?.fields || []" class="mt-6">
            <label
              [for]="field.name"
              class="block text-sm font-medium text-gray-700">
              {{ field.label }}
              <span class="text-gray-500" [title]="field.tooltip">?</span>
            </label>
            <input
              [type]="field.type"
              [formControlName]="field.name"
              [placeholder]="field.placeholder"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            <div
              *ngIf="
                formGroup.get(field.name)?.invalid &&
                formGroup.get(field.name)?.touched
              "
              class="text-red-500">
              Invalid {{ field.label }}
            </div>
          </div>
          <div class="mt-6 flex justify-end">
            <button
              type="submit"
              [disabled]="formGroup.invalid || isSubmitting"
              class="btn btn-primary">
              {{ formConfig?.buttons?.submitLabel || 'Submit' }}
            </button>
            <button
              type="button"
              (click)="onCancel()"
              class="btn btn-secondary ml-2">
              {{ formConfig?.buttons?.cancelLabel || 'Cancel' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [],
})
export default class FormComponent implements OnInit {
  /**
   * @param {IFormConfig} formConfig - Configuration object for the form
   */
  @Input() formConfig: IFormConfig | null = null; // Input property for form configuration, default is null
  formGroup: FormGroup; // FormGroup instance for managing form controls
  isSubmitting = false; // Boolean flag to indicate form submission status

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.formGroup = this.fb.group({}); // Initialize formGroup with an empty group
  }

  ngOnInit(): void {
    // Use exampleFormConfig if formConfig is not provided
    const config = this.formConfig || exampleFormConfig;

    // Iterate over fields in the configuration to add controls to the formGroup
    config.fields.forEach((field) => {
      this.formGroup.addControl(
        field.name, // Control name
        this.fb.control('', field.validators), // Control with validators
      );
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isSubmitting = true;
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.toastr.success('Form submitted successfully!');
      }, 1000);
    } else {
      this.toastr.error('Please correct the errors in the form.');
    }
  }

  onCancel(): void {
    this.formGroup.reset();
  }
}

/**
 * Sample form configuration for a user profile page.
 * This configuration includes typical fields you would see in a user profile form.
 */

/*
 * Sample form configuration for a user profile page.
 * This configuration includes typical fields you would see in a user profile form.
 */
export const exampleFormConfig = {
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      tooltip: 'Your given name',
      validators: [Validators.required],
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      tooltip: 'Your family name',
      validators: [Validators.required],
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email address',
      tooltip: 'Your email address',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'phoneNumber',
      type: 'tel',
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      tooltip: 'Your contact number',
      validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Enter your address',
      tooltip: 'Your residential address',
      validators: [Validators.required],
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      placeholder: 'Enter your city',
      tooltip: 'Your city of residence',
      validators: [Validators.required],
    },
    {
      name: 'state',
      type: 'text',
      label: 'State',
      placeholder: 'Enter your state',
      tooltip: 'Your state of residence',
      validators: [Validators.required],
    },
    {
      name: 'zipCode',
      type: 'text',
      label: 'Zip Code',
      placeholder: 'Enter your zip code',
      tooltip: 'Your area postal code',
      validators: [Validators.required, Validators.pattern(/^[0-9]{5}$/)],
    },
  ],
  buttons: {
    submitLabel: 'Update Profile',
    cancelLabel: 'Cancel',
  },
};
