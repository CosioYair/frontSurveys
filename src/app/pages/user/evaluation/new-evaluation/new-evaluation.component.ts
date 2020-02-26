import { Component, OnInit, OnDestroy } from '@angular/core';
import { Evaluation } from 'src/app/shared/model/evaluation';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { SurveyType } from 'src/app/shared/model/survey-type';
import { SurveyCat } from 'src/app/shared/model/survey-cat';
import { SurveyTypeService } from 'src/app/shared/services/survey-type.service';
import { SurveyCatService } from 'src/app/shared/services/survey-cat.service';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/shared/services/company.service';
import { Employee } from 'src/app/shared/model/employee';
import { EvaluationService } from 'src/app/shared/services/evaluation.service';

@Component({
  selector: 'app-new-evaluation',
  templateUrl: './new-evaluation.component.html',
  styleUrls: ['./new-evaluation.component.scss']
})
export class NewEvaluationComponent implements OnInit, OnDestroy {

  public employees: Employee[] = [];
  public surveyTypes: SurveyType[] = [];
  public surveyCats: SurveyCat[] = [];
  public surveyQuests: any[] = [];
  public surveys: SurveyCat[] | any[] = [];
  public form: FormGroup;
  public backErrors: BackError[] = [];
  private _user: User = {} as User;
  private _subscriptions: Subscription[] = [];
  public evaluationEnabled: Boolean = false;

  constructor(private _surveyTypeService: SurveyTypeService,
    private _surveyCat: SurveyCatService,
    private _userService: UserService,
    private _companyService: CompanyService,
    private _evaluationService: EvaluationService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      surveyTypeId: new FormControl(null, [
        Validators.required,
      ]),
      surveyCatOid: new FormControl(null, [
        Validators.required,
      ]),
      employeesNumber: new FormControl(null, []),
    });
    this._subscriptions.push(
      this.form.controls['surveyTypeId'].valueChanges.subscribe(surveyTypeId => {
        this.surveys = surveyTypeId == 1 ? this.surveyCats : this.surveyQuests;
      })
    );
    this.fetchUser();
    this.getSurveyTypes();
    this.getSurveyCats();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  fetchUser() {
    this._userService.getUser
      .pipe(
        take(1)
      )
      .subscribe(user => {
        this._user = user;
        this.getEmployees(this._user.companyOid);
      });
  }

  public getEmployees(oid: string) {
    this._companyService.getEmployees(oid).pipe(
      take(1)
    ).subscribe(employees => {
      this.employees = employees;
      this.form.controls['employeesNumber'].setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(employees.length)
      ]);
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  getSurveyTypes() {
    this._surveyTypeService.index()
      .pipe(
        take(1)
      ).subscribe(surveyTypes => {
        this.surveyTypes = surveyTypes;
        this.form.controls['surveyTypeId'].setValue(surveyTypes[0].id);
      }, (err) => {
        this.backErrors = err.error;
      });
  }

  getSurveyCats() {
    this._surveyCat.index()
      .pipe(
        take(1)
      ).subscribe(surveyCats => {
        this.surveyCats = surveyCats;
        this.surveys = this.surveyCats;
        this.form.controls['surveyCatOid'].setValue(surveyCats[0].Oid);
      }, (err) => {
        this.backErrors = err.error;
      });
  }

  createEvaluation() {
    const formValue = this.form.value;
    const evaluation: Evaluation = {} as Evaluation;
    this.evaluationEnabled = false;
    evaluation.companyOid = this._user.companyOid;
    evaluation.surveyCatOid = formValue.surveyCatOid;
    evaluation.employeesNumber = formValue.employeesNumber;
    this._evaluationService.create(evaluation)
      .pipe(
        take(1)
      ).subscribe(() => {
        this.evaluationEnabled = true;
      }, (err) => {
        this.backErrors = err.error;
      });
  }
}
