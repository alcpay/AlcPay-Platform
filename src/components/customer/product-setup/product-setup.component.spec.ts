import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SetupProductRulesComponent } from './product-setup.component'

describe('SetupProductRulesComponent', () => {
  let component: SetupProductRulesComponent
  let fixture: ComponentFixture<SetupProductRulesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupProductRulesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SetupProductRulesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
