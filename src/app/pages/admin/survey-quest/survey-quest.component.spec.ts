import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestComponent } from './survey-quest.component';

describe('SurveyQuestComponent', () => {
  let component: SurveyQuestComponent;
  let fixture: ComponentFixture<SurveyQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
