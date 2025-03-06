import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalTsComponent } from './form-modal.ts.component';

describe('FormModalTsComponent', () => {
  let component: FormModalTsComponent;
  let fixture: ComponentFixture<FormModalTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModalTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModalTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
