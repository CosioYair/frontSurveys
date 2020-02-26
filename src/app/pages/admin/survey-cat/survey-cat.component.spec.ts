import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCatComponent } from './survey-cat.component';

describe('SurveyCatComponent', () => {
  let component: SurveyCatComponent;
  let fixture: ComponentFixture<SurveyCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
