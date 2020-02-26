import { Component, OnInit } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { SurveySection } from '../surveySection';
import { ActivatedRoute } from '@angular/router';
import { SurveySectionService } from '../surveySection.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public surveySection: SurveySection = {} as SurveySection;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public surveySectionUpdatedFlag: boolean = false;

  constructor(private _surveySectionService: SurveySectionService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getSurveySection(this._route.snapshot.paramMap.get('Oid'));
  }

  public getSurveySection(surveySectionOid: string) {
    this._surveySectionService.show(surveySectionOid).subscribe(surveySection => {
      this.surveySection = surveySection;
      this.getSurveySectionQuestions();
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  getSurveySectionQuestions() {
    this._surveySectionService.getQuestions(this.surveySection.Oid).subscribe(questions => {
      this.surveySection.Questions = questions.map(question => question.SurveySectionQuestion);
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  updateSurveySectionQuestions() {
    this._surveySectionService.updateQuestions(this.surveySection.Oid, this.surveySection.Questions).subscribe(questions => {
      this.surveySection.Questions = questions.map(question => question.SurveySectionQuestion);
      this.surveySectionUpdatedFlag = true;
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  surveySectionUpdated(event) {
    this.surveySection = { ...this.surveySection, ...event.value };
    this.validForm = event.validForm;
  }

  update() {
    this._surveySectionService.update(this.surveySection.Oid, this.surveySection).subscribe(() => {
      this.updateSurveySectionQuestions();
    }, (err) => {
      this.surveySectionUpdatedFlag = false;
      this.backErrors = err.error;
    });
  }

}
