import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { take } from 'rxjs/operators';
import { Evaluation } from 'src/app/shared/model/evaluation';
import { BackError } from 'src/app/shared/model/backError';
import { SurveyCat } from 'src/app/shared/model/survey-cat';
import { SurveyCatService } from 'src/app/shared/services/survey-cat.service';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { EvaluationService } from 'src/app/shared/services/evaluation.service';

@Component({
  selector: 'app-evaluation-enabled-list',
  templateUrl: './evaluation-enabled-list.component.html',
  styleUrls: ['./evaluation-enabled-list.component.scss']
})
export class EvaluationEnabledListComponent implements OnInit {

  public evaluations: Evaluation[] = [];
  public backErrors: BackError[] = [];
  private _user: User = {} as User;

  constructor(private _companyService: CompanyService,
    private _surveyCatService: SurveyCatService,
    private _userService: UserService,
    private _evaluationService: EvaluationService
  ) { }

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    this._userService.getUser
      .pipe(
        take(1)
      )
      .subscribe(user => {
        this._user = user;
        this.getEvaluations(this._user.companyOid);
      });
  }

  getEvaluations(companyOid: string) {
    this._companyService.getEvaluations(companyOid)
      .pipe(
        take(1)
      ).subscribe(evaluations => {
        this.evaluations = evaluations;
        this.setPercentagesFinished();
        this.getSurveys();
      }, (err) => {
        this.backErrors = err.error;
      });
  }

  getSurveys() {
    this.evaluations.forEach(evaluation => {
      switch (evaluation.surveyTypeId) {
        case 1:
          this._surveyCatService.get(evaluation.surveyBaseOid)
          .pipe(
            take(1)
          )
          .subscribe(surveyCat => {
            evaluation.survey = surveyCat;
          });
          break;

        default:
          break;
      }
    });
  }

  setPercentagesFinished() {
    this.evaluations.forEach(evaluation => {
      this._evaluationService.getPercentageFinished(evaluation.Oid)
      .pipe(
        take(1)
      )
      .subscribe(percentageFinished => {
        evaluation.percentageFinished = percentageFinished;
      });
    });
  }

  public deleteEvaluation(oid: string) {
    if (confirm('Estas seguro de borrar el registro?')) {
      this._evaluationService.delete(oid).pipe(
        take(1)
      ).subscribe(() => {
        this.getEvaluations(this._user.companyOid);
        this.backErrors = [];
      }, (err) => {
        this.backErrors = err.error;
      });
    }
  }

}
