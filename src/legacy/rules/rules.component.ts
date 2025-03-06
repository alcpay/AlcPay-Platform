import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

import { HelperService } from '../../services/helper.service'
import { RuleService } from '../../services/rule.service'

interface Rule {
  id: string
  locationName: string
  productFilter?: string
  productName?: string
  products?: Array<{ title: string }>
}

@Component({
  standalone: false,
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  stateForm: FormGroup = new FormGroup({})
  zipForm: FormGroup = new FormGroup({})
  productForm: FormGroup = new FormGroup({})
  submitted = false
  locations: any[] = []
  states: any[] = []
  products: any[] = []
  variants: any[] = []
  code: any
  rulesList: Rule[] = []
  stateId: any
  productId: any
  locationName: any
  productName: any
  sortToggle = false
  AddStateRuleDropDownSetting = {}
  allStatesList = []
  allSelectedStates = []
  AddProductRuleDropDownSetting = {}
  allProductsList = []
  allSelectedProducts = []
  allProducts = []
  AddProductRuleDropDownSetting1 = {}
  allProducts1 = []
  allProductsList1 = []
  allSelectedProducts1 = []

  constructor(
    private ruleService: RuleService,
    private helperService: HelperService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.stateForm = new FormGroup({
      stateId: new FormControl([], [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      submitted: new FormControl(false),
    })

    this.zipForm = new FormGroup({
      minZip: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.maxLength(5),
      ]),
      maxZip: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.maxLength(5),
      ]),
      locationId: new FormControl('', [Validators.required]),
      submitted: new FormControl(false),
    })

    this.productForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      // variantId: new FormControl('', [Validators.required]),
      locationId: new FormControl([]),
      submitted: new FormControl(false),
    })

    this.helperService.getLocations().subscribe((resp: any) => {
      this.locations = resp
    })

    this.helperService.getState().subscribe((resp: any) => {
      this.states = resp
    })

    this.helperService.getProducts().subscribe((resp: any) => {
      this.products = resp.products
      this.allProducts = resp?.products?.map((item: any) => ({ id: item?.id, title: item?.title }))
      this.allProducts1 = resp.products
      this.allProductsList1 = resp.products
    })

    this.list()
    // this.ruleService.getRuleList().subscribe((data: any) => {
    //   console.log(data);
    //   this.rulesList = data;
    // });
    this.AddStateRuleDropDownSetting = {
      singleSelection: false,
      idField: 'id', // Correct field name for item ID
      textField: 'name', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    }

    this.AddProductRuleDropDownSetting = {
      singleSelection: false,
      idField: 'id', // Correct field name for item ID
      textField: 'title', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    }
    this.AddProductRuleDropDownSetting1 = {
      singleSelection: false,
      idField: 'id', // Correct field name for item ID
      textField: 'title', // Correct field name for item text
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    }
  }

  isProductHighlighted(filter: string, product: any): boolean {
    return filter && product.title.toLowerCase().includes(filter.toLowerCase())
  }

  starGenerator = (num: number, isShowMessage: Boolean = true) =>
    num === 0 && isShowMessage ? 'no rating' : Array.from({ length: num }).fill('⭐').join('')

  getProductsForSpecificLocation(locId: string) {
    this.allProductsList = []
    this.allSelectedProducts = []

    this.helperService.getProductsForSpecificLocation(locId).subscribe((resp: any) => {
      this.allProductsList = resp
    })
  }

  getStatesForSpecificProductAndLocation(locId: string, prodId: any) {
    this.allStatesList = []
    this.allSelectedStates = []
    let productIds = prodId.map((item: any) => item?.id)
    console.log('prodId=========================>', prodId)
    this.helperService.getStatesForSpecificProductAndLocation(productIds, locId).subscribe((resp: any) => {
      this.allStatesList = resp
    })
  }

  onSelectProduct(item: any) {}

  onAllSelectProduct(items: any) {}

  onStateSelect(item: any) {
    console.log(item)
  }

  onAllStatesSelect(items: any) {
    console.log(items)
  }

  list() {
    this.ruleService.getProductRules().subscribe((data: any) => {
      // console.log(data);
      this.rulesList = data.productRules
    })
  }

  selected(event: any) {
    for (let i = 0; i < this.locations.length; i++) {
      if (event.target.value == this.locations[i].id) {
        this.locationName = this.locations[i].name
      }
    }
  }

  selectProduct(event: any): void {
    for (let i = 0; i < this.products.length; i++) {
      if (event.target.value == this.products[i].id) {
        this.productName = this.products[i].title
      }
    }
  }

  selectcode(event: any): void {
    for (let i = 0; i < this.states.length; i++) {
      if (event.target.value == this.states[i].id) {
        this.code = this.states[i].code
      }
    }
  }

  state(content: any) {
    this.allSelectedStates = []
    this.allSelectedProducts1 = []
    // Modal functionality removed
  }

  zip(content: any) {
    // Modal functionality removed
  }

  product(content: any) {
    this.productForm.reset()
    this.allProductsList = []
    this.allSelectedProducts = []
    // Modal functionality removed
  }

  saveState() {
    this.submitted = true

    if (this.stateForm.invalid) {
      return
    }

    const body = {
      states: this.stateForm.value.stateId,
      // productId: this.stateForm.value.productId,
      products: this.stateForm.value.productId,

      locationId: this.stateForm.value.locationId,
      code: this.code,
      // productName: this.productName,
      locationName: this.locationName,
      submitted: true,
    }
    this.ruleService.addStateRule(body).subscribe(
      (response) => {
        this.toastr.success('State Rule Added sucessfully!', '', {
          timeOut: 2000,
        })
        this.list()
        // Modal functionality removed
        this.locationName = null
        this.productName = null
        this.allStatesList = []
        this.allSelectedStates = []
        this.stateForm.reset()
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        })
        this.submitted = false
      },
    )
  }

  saveZip() {
    // console.log(this.zipForm.value);
    this.submitted = true
    if (this.zipForm.invalid) {
      return
    }

    const body = {
      zipMin: this.zipForm.value.minZip,
      zipMax: this.zipForm.value.maxZip,
      locationId: this.zipForm.value.locationId,
      submitted: true,
    }

    this.ruleService.addZipRule(body).subscribe(
      (response) => {
        // Modal functionality removed
        this.zipForm.reset()
        this.submitted = false
      },
      (error) => {
        this.submitted = false
        body.submitted = false
      },
    )
  }

  saveProduct() {
    console.log(this.productForm.value)
    this.submitted = true
    if (this.productForm.invalid) {
      return
    }

    const body = {
      // productId: this.productForm.value.productId,
      // variantId: this.productForm.value.variantId,
      // productName:this.productName,
      locationName: this.locationName,
      locationId: this.productForm.value.locationId,
      products: this.productForm.value.productId,
      submitted: true,
    }

    this.ruleService.addProductRule(body).subscribe(
      (response) => {
        this.toastr.success('Product Rule Added sucessfully!', '', {
          timeOut: 2000,
        })
        this.list()
        // Modal functionality removed
        this.locationName = null
        this.productName = null
        this.allProductsList = []
        this.allSelectedProducts = []
        this.productForm.reset()
        this.submitted = false
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        })
        this.submitted = false
        body.submitted = false
      },
    )
  }

  stateRule(content: any, rule: any) {
    // console.log("rule", rule);

    this.stateForm.patchValue({
      stateId: rule.stateId,
      locationId: rule.locationId,
      productId: rule.productId,
      submitted: true,
    })
    this.locationName = rule.locationName
    this.productName = rule.productName
    this.code = rule.code
    this.stateId = rule.id
    // Modal functionality removed
    this.submitted = false
  }

  productRule(content: any, rule: any) {
    this.allSelectedProducts = rule?.products
    this.allSelectedProducts1 = rule.products
    // for (let i = 0; i < this.products.length; i++) {
    //   if (rule.productId == this.products[i].id) {
    //     this.variants = this.products[i].variants;
    //   }
    // }
    this.productForm.patchValue({
      productId: rule.productId,
      // variantId: this.productForm.value.variantId,
      locationId: rule.locationId,
      submitted: true,
    })
    this.locationName = rule.locationName
    this.productId = rule.id
    // Modal functionality removed
    this.submitted = false
  }

  deleteStateRule(rule: any) {
    this.ruleService.deleteStateRule(rule.id).subscribe(
      (response) => {
        this.toastr.success('State Rule Deleted sucessfully!', '', {
          timeOut: 2000,
        })
        this.list()
        this.ngOnInit()
      },
      (error) => {
        this.submitted = false
        this.toastr.error(error, '', {
          timeOut: 2000,
        })
      },
    )
  }

  updateStateRule() {
    this.submitted = true
    if (this.stateForm.invalid) {
      return
    }

    const body = {
      id: this.stateId,
      stateId: JSON.parse(this.stateForm.value.stateId),
      locationId: this.stateForm.value.locationId,
      productId: this.stateForm.value.productId,
      code: this.code,
      productName: this.productName,
      locationName: this.locationName,
      submitted: true,
    }
    this.ruleService.updateState(body).subscribe(
      (response) => {
        this.toastr.success('State Rule Updated sucessfully!', '', {
          timeOut: 2000,
        })
        this.list()
        // Modal functionality removed
        this.stateForm.reset()
        this.submitted = false
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        })
        this.submitted = false
        body.submitted = false
      },
    )
  }

  updateProductRule() {
    this.submitted = true
    if (this.productForm.invalid) {
      return
    }

    const body = {
      id: this.productId,
      products: this.productForm.value.productId,
      // variantId: this.productForm.value.variantId,
      locationId: this.productForm.value.locationId,
      locationName: this.locationName,
      submitted: true,
    }

    this.ruleService.updateProductRule(body).subscribe(
      (response) => {
        this.toastr.success('Product Rule Updated sucessfully!', '', {
          timeOut: 2000,
        })
        this.list()
        // Modal functionality removed
        this.productForm.reset()
        this.allProductsList = []
        this.allSelectedProducts = []
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        })
        this.submitted = false
        body.submitted = false
      },
    )
  }

  deleteProductRule(id: any) {
    this.ruleService.deleteProductRule(id).subscribe(
      (response) => {
        this.toastr.success('Product Rule deleted sucessfully!', '', {
          timeOut: 2000,
        })
        this.list()
        this.ngOnInit()
      },
      (error) => {
        this.toastr.error(error, '', {
          timeOut: 2000,
        })
      },
    )
  }

  toggleSort() {
    if (this.sortToggle) {
      this.rulesList.sort((a, b) => {
        const na = a.productName?.toLowerCase() ?? ''
        const nb = b.productName?.toLowerCase() ?? ''
        if (na < nb) {
          return -1
        }
        if (nb < na) {
          return 1
        }
        return 0
      })
      this.sortToggle = !this.sortToggle
    } else {
      this.rulesList.sort((a, b) => {
        const na = a.productName?.toLowerCase() ?? ''
        const nb = b.productName?.toLowerCase() ?? ''
        if (nb < na) {
          return -1
        }
        if (na < nb) {
          return 1
        }
        return 0
      })
      this.sortToggle = !this.sortToggle
    }
  }

  sortLocation() {
    if (this.sortToggle) {
      this.rulesList.sort((a, b) => {
        const na = a.locationName.toLowerCase()
        const nb = b.locationName.toLowerCase()
        if (na < nb) {
          return -1
        }
        if (nb < na) {
          return 1
        }
        return 0
      })
      this.sortToggle = !this.sortToggle
    } else {
      this.rulesList.sort((a, b) => {
        const na = a.locationName.toLowerCase()
        const nb = b.locationName.toLowerCase()
        if (nb < na) {
          return -1
        }
        if (na < nb) {
          return 1
        }
        return 0
      })
      this.sortToggle = !this.sortToggle
    }
  }
}
