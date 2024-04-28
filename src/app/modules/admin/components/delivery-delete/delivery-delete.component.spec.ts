import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDeleteComponent } from './delivery-delete.component';

describe('DeliveryDeleteComponent', () => {
  let component: DeliveryDeleteComponent;
  let fixture: ComponentFixture<DeliveryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
