/**
 * Legacy Module
 *
 * This module contains all the legacy components that are no longer used in the new application.
 * These components are still used in the legacy application and are imported here for convenience.
 *
 * @author: @mac-anderson
 */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'
import { ToastrModule } from 'ngx-toastr'

import { AddTrackingComponent } from './add-tracking/add-tracking.component'
import { FulfillmentsComponent } from './fulfillments/fulfillments.component'
import { OrdersComponent } from './orders/orders.component'
import { RegisterBrandComponent } from './register-brand/register-brand.component'
import { RulesComponent } from './rules/rules.component'
import { StripeSuccessComponent } from './stripe-success/stripe-success.component'

@NgModule({
  declarations: [
    AddTrackingComponent,
    FulfillmentsComponent,
    OrdersComponent,
    RegisterBrandComponent,
    RulesComponent,
    StripeSuccessComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxIntlTelInputModule,
  ],
  exports: [
    AddTrackingComponent,
    FulfillmentsComponent,
    OrdersComponent,
    RegisterBrandComponent,
    RulesComponent,
    StripeSuccessComponent,
  ],
})
export class LegacyModule {}
