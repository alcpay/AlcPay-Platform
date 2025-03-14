import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

import { BrandProfileService } from '../../../services/brand-profile.service';

@Component({
  standalone: true,
  selector: 'customer-brand-profile',
  template: `<!--
    Brand Profile Component Template

    This template provides a user interface for managing brand profile information.
    It allows non-super admin users to update their brand details including name,
    email, contact, and website.

    @component BrandProfileComponent
    @description Renders a form for brand profile management
    @requires Angular, Two-way data binding

    @example
    <app-brand-profile></app-brand-profile>

    @remarks
    - Conditionally renders based on user admin status
    - Provides input fields for brand details
    - Includes a back navigation option
-->
    <div class="rounded-lg bg-white p-6 shadow-lg">
      <ng-container *ngIf="!currentUser?.isSuperAdmin">
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >Brand Name</label
          >
          <input
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
            [(ngModel)]="brandName"
            placeholder="Example Brand" />
        </div>
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
            [(ngModel)]="email"
            placeholder="example@gmail.com" />
        </div>
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >Contact</label
          >
          <input
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
            [(ngModel)]="contact"
            placeholder="+12345678901" />
        </div>
        <div class="mb-6">
          <label class="mb-1 block text-sm font-medium text-gray-700"
            >Website</label
          >
          <input
            class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
            [(ngModel)]="website"
            placeholder="https://example.com" />
        </div>
        <div class="flex justify-center">
          <button class="btn btn-primary" (click)="updateBrand()">
            Update Profile
          </button>
        </div>
      </ng-container>
    </div> `,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ToastrService],
})
export default class ProfilePage implements OnInit {
  /** Brand name of the user's profile */
  brandName: string = '';

  /** Contact email for the brand */
  email: string = '';

  /** Contact phone number */
  contact: string = '';

  /** Contact phone number */
  phone: string = '';

  /** Brand's website URL */
  website: string = '';

  /** Unique identifier for the brand profile */
  id: number = 0;

  /** Current user authentication details */
  currentUser: any = null;

  /**
   * Filters out null, undefined, or empty string entries from an object.
   *
   * @typeParam T - The type of object being filtered
   * @param obj - The object to filter
   * @returns A partial object with only valid entries
   */
  public filterValidEntries<T extends object>(obj: T): Partial<T> {
    return Object.keys(obj).reduce((accumulator, key) => {
      const value = obj[key as keyof T];
      if (value !== null && value !== undefined && value !== '') {
        accumulator[key as keyof T] = value;
      }
      return accumulator;
    }, {} as Partial<T>);
  }

  /**
   * Constructs the BrandProfileComponent with required services.
   *
   * @param brandService - Service for brand profile operations
   * @param route - Angular route service for parameter access
   * @param toastr - Notification service for user feedback
   * @param userService - Service for user authentication
   * @param _location - Angular location service for navigation
   */
  constructor(
    private brandService: BrandProfileService,
    private route: ActivatedRoute,
    @Inject(ToastrService) private toastr: ToastrService,
    private userService: UserService,
  ) {}

  /**
   * Initializes component, fetches user and brand profile data.
   * Handles different logic for super admin and regular users.
   */
  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser.isSuperAdmin) {
        this.route.queryParams.subscribe((params) => {
          this.id = params['id'];
        });
      } else {
        this.id = this.currentUser?.user?.id;
      }
    });
    this.fetchData();
  }

  /**
   * Updates the brand profile with current form data.
   * Filters and sends only valid entries to the service.
   */
  updateBrand() {
    const data = this.filterValidEntries({
      brandName: this.brandName,
      email: this.email,
      contact: this.contact,
      website: this.website,
    });
    this.brandService.updateBrand(data).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(res?.message, 'Success');
      },
      (error) => {
        this.toastr.error(error ? error : error?.error?.message, 'Error');
      },
    );
  }

  /**
   * Fetches brand profile data for the current user.
   * Populates component properties with retrieved data.
   */
  fetchData() {
    this.brandService.fetchBrand(this.id).subscribe(
      (res) => {
        this.brandName = res?.data.brandName;
        this.email = res?.data.email;
        this.contact = res?.data.contact;
        this.website = res?.data.website;
        this.id = res?.data.id;
      },
      (error) => {
        this.toastr.error(error ? error : error?.error?.message, 'Error');
      },
    );
  }
}
