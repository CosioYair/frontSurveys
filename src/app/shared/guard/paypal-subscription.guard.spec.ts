import { TestBed, async, inject } from '@angular/core/testing';

import { PaypalSubscriptionGuard } from './paypal-subscription.guard';

describe('PaypalSubscriptionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaypalSubscriptionGuard]
    });
  });

  it('should ...', inject([PaypalSubscriptionGuard], (guard: PaypalSubscriptionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
