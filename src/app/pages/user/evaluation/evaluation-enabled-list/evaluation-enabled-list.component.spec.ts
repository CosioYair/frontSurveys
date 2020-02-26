import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationEnabledListComponent } from './evaluation-enabled-list.component';

describe('EvaluationEnabledListComponent', () => {
  let component: EvaluationEnabledListComponent;
  let fixture: ComponentFixture<EvaluationEnabledListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationEnabledListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationEnabledListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
