import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SurveySection } from '../../surveySection';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Question } from '../../../question/question';
import { Category } from '../../../category/category';
import { Domain } from '../../../domain/domain';
import { Dimension } from '../../../dimension/dimension';
import { CompanyService } from 'src/app/shared/services/company.service';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { SurveySectionQuestion } from 'src/app/shared/model/survey-section-question';

@Component({
  selector: 'app-edit-surveySection',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() surveySection: SurveySection = {} as SurveySection;
  @Output() surveySectionUpdated = new EventEmitter<any>();

  public form: FormGroup;
  public questions: Question[] = [];
  public categories: Category[] = [];
  public domains: Domain[] = [];
  public dimensions: Dimension[] = [];
  private _user: User = {} as User;

  constructor(private _userService: UserService,
    private _companyService: CompanyService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      Questions: new FormArray([])
    });
    this.form.patchValue(this.surveySection);
    this.form.valueChanges.subscribe(value => {
      this.surveySectionUpdated.emit({
        value,
        validForm: this.form.valid
      });
    });
    this._userService.getUser.subscribe(async user => {
      this._user = user;
      await Promise.all([
        this.getQuestions(user.companyOid),
        this.getCategories(user.companyOid),
        this.getDomains(user.companyOid),
        this.getDimensions(user.companyOid)
      ]);
      this.setQuestions();
    });
  }

  setQuestions() {
    if (!this.surveySection.Questions) {
      this.addQuestion({} as SurveySectionQuestion);
    } else {
      this.surveySection.Questions.forEach(question => this.addQuestion(question));
    }
  }

  get Questions() {
    return this.form.get('Questions') as FormArray;
  }

  addQuestion(question: SurveySectionQuestion = { questionOid: '' }) {
    this.Questions.push(this.createSurveySectionQuestionItem(question));
  }

  removeQuestion(index: number) {
    this.Questions.removeAt(index);
  }

  createSurveySectionQuestionItem(question: SurveySectionQuestion) {
    const questionForm = new FormGroup({
      questionOid: new FormControl(null, [
        Validators.required,
      ]),
      categoryOid: new FormControl(null),
      domainOid: new FormControl(null),
      dimensionOid: new FormControl(null),
    });
    questionForm.patchValue(question);
    return questionForm;
  }

  getQuestions(companyOid: string) {
    return this._companyService.getQuestions(companyOid).toPromise().then(questions => {
      this.questions = questions;
      return questions;
    });
  }

  getCategories(companyOid: string) {
    return this._companyService.getCategories(companyOid).toPromise().then(categories => {
      this.categories = categories;
      return categories;
    });
  }

  getDimensions(companyOid: string) {
    return this._companyService.getDimensions(companyOid).toPromise().then(dimensions => {
      this.dimensions = dimensions;
      return dimensions;
    });
  }

  getDomains(companyOid: string) {
    return this._companyService.getDomains(companyOid).toPromise().then(domains => {
      this.domains = domains;
      return domains;
    });
  }

}
