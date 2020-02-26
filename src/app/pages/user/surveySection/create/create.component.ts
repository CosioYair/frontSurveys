import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { EditComponent } from '../components/edit/edit.component';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { SurveySection } from '../surveySection';
import { SurveySectionService } from '../surveySection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  public surveySection: SurveySection = {} as SurveySection;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public surveySectionCreated: boolean = false;
  public user: User = {} as User;
  private _subscriptions: Subscription[] = [];

  @ViewChild('editComponent', { static: false }) editComponent: EditComponent;

  constructor(private _surveySectionService: SurveySectionService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._subscriptions.push(
      this._userService.getUser.subscribe(user => {
        this.user = user;
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  surveySectionUpdated(event): void {
    this.surveySection = event.value;
    this.validForm = event.validForm;
  }

  create() {
    const newSurveySection: SurveySection = {
      ...this.surveySection,
      companyOid: this.user.companyOid
    };
    this._surveySectionService.create(newSurveySection).subscribe(newSurveySection => {
      this.updateQuestions(newSurveySection.Oid);
    }, (err) => {
      this.surveySectionCreated = true;
      this.backErrors = err.error;
    });
  }

  updateQuestions(oid: string) {
    this._surveySectionService.updateQuestions(oid, this.surveySection.Questions).subscribe(() => {
      this.editComponent.form.reset();
      this._router.navigate(['/user/survey-section/list']);
      this.backErrors = [];
    }, (err) => {
      this.surveySectionCreated = true;
      this.backErrors = err.error;
    });
  }

}
