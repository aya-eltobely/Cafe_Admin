import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRejectComponent } from './order-reject.component';

describe('OrderRejectComponent', () => {
  let component: OrderRejectComponent;
  let fixture: ComponentFixture<OrderRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderRejectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
