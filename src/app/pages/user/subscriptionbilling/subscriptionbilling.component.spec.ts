import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionbillingComponent } from './subscriptionbilling.component';

describe('SubscriptionbillingComponent', () => {
  let component: SubscriptionbillingComponent;
  let fixture: ComponentFixture<SubscriptionbillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionbillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
