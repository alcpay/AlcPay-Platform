import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

import { HelperService } from '../../services/helper.service'

@Component({
  standalone: false,
  selector: 'app-add-tracking',
  templateUrl: './add-tracking.component.html',
  styleUrls: ['./add-tracking.component.scss'],
})
export class AddTrackingComponent implements OnInit {
  fulfillmentId: number | null = null // Use number type for fulfillmentId
  trackingForm: FormGroup
  submitted: boolean = false
  success: boolean = false
  url: string | null = null // Use string type for url
  visible: boolean = false
  shippingServiceName: string = ''
  body: any = null // Consider defining a more specific type for body
  trackingInfo: any | null = null // Use the defined interface for trackingInfo

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private toastr: ToastrService,
  ) {
    this.trackingForm = new FormGroup({
      trackingNo: new FormControl('', [Validators.required]),
      trackingUrl: new FormControl(''),
      shippingService: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params && params['id']) {
        this.fulfillmentId = parseInt(params['id'], 10)
      }
    })
    this.helperService.fetchTrackingInfo(this.fulfillmentId).subscribe((res: any) => {
      this.trackingInfo = res
    })
  }

  selectService(event: Event): void {
    const target = event.target as HTMLSelectElement // Type assertion for event target
    if (target.value === 'UPS') {
      this.url = `https://www.ups.com/track?loc=null&tracknum=${this.trackingForm.value.trackingNo}&requester=WT/trackdetails`
      this.visible = false
      this.shippingServiceName = ''
      this.trackingForm.patchValue({
        trackingUrl: this.url,
      })
    }

    if (target.value === 'FedEx') {
      this.url = `https://www.fedex.com/apps/fedextrack/?tracknumbers=${this.trackingForm.value.trackingNo}`
      this.visible = false
      this.shippingServiceName = ''
      this.trackingForm.patchValue({
        trackingUrl: this.url,
      })
    }
    if (target.value === 'Other') {
      this.visible = true
      this.trackingForm.patchValue({
        trackingUrl: '',
      })
    }
  }

  save(): void {
    this.submitted = true
    if (this.trackingForm.invalid) {
      return
    }

    // Construct the body for the tracking information submission
    this.body = {
      fulfillmentId: this.fulfillmentId,
      trackingNo: this.trackingForm.value.trackingNo,
      trackingUrl: this.trackingForm.value.trackingUrl,
      shippingService:
        this.trackingForm.value.shippingService === 'Other'
          ? this.shippingServiceName
          : this.trackingForm.value.shippingService,
    }

    // Call the service to add tracking information
    this.helperService.addTracking(this.body).subscribe(
      (response) => {
        this.toastr.success('Tracking information added successfully.', '', {
          timeOut: 2000,
        })
        this.trackingForm.reset() // Reset the form after successful submission
        this.success = true // Indicate success
      },
      (error) => {
        // Handle error response
        this.toastr.error('Failed to add tracking information. Please try again.', '', {
          timeOut: 2000,
        })
      },
    )
  }
}
