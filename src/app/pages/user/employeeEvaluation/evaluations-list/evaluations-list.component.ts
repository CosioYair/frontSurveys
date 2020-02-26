import { Component, OnInit, OnDestroy } from '@angular/core';
import { Evaluation } from 'src/app/shared/model/evaluation';
import { BackError } from 'src/app/shared/model/backError';
import { User } from 'src/app/shared/model/user';
import { SurveyCatService } from 'src/app/shared/services/survey-cat.service';
import { UserService } from 'src/app/shared/services/user.service';
import { take } from 'rxjs/operators';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-evaluations-list',
  templateUrl: './evaluations-list.component.html',
  styleUrls: ['./evaluations-list.component.scss']
})
export class EvaluationsListComponent implements OnInit, OnDestroy {

  public evaluations: Evaluation[] = [];
  public backErrors: BackError[] = [];
  private _user: User = {} as User;
  private _subscriptions: Subscription[] = [];

  constructor(private _surveyCatService: SurveyCatService,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this._subscriptions.push(
      this._userService.getUser
        .subscribe(user => {
          this._user = user;
          if (user.Oid) {
            this.getEmployeeEvaluations(this._user.Oid);
          }
        })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getEmployeeEvaluations(oid: string) {
    this._userService.getEvaluations(oid)
      .pipe(
        take(1)
      )
      .subscribe(evaluations => {
        this.evaluations = evaluations;
        this.getSurveys();
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
}
