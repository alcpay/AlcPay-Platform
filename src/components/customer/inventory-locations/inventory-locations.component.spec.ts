import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InventoryLocationsComponent } from './inventory-locations.component'

describe('InventoryLocationsComponent', () => {
  let component: InventoryLocationsComponent
  let fixture: ComponentFixture<InventoryLocationsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryLocationsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InventoryLocationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
