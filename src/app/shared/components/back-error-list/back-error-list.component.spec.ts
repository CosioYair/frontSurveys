import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackErrorListComponent } from './back-error-list.component';

describe('BackErrorListComponent', () => {
  let component: BackErrorListComponent;
  let fixture: ComponentFixture<BackErrorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackErrorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackErrorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
