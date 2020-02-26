import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { EditComponent } from '../components/edit/edit.component';
import { User } from 'src/app/shared/model/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  public question: Question = {} as Question;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public questionCreated: boolean = false;
  public user: User = {} as User;
  private _subscriptions: Subscription[] = [];

  @ViewChild('editComponent', { static: false }) editComponent: EditComponent;

  constructor(private _questionService: QuestionService, private _userService: UserService) { }

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

  questionUpdated(event): void {
    this.question = event.value;
    this.validForm = event.validForm;
  }

  create() {
    const newQuestion: Question = {
      ...this.question,
      companyOid: this.user.companyOid
    };
    this._questionService.create(newQuestion).subscribe(() => {
      this.editComponent.form.reset();
      this.questionCreated = true;
      this.backErrors = [];
    }, (err) => {
      this.questionCreated = true;
      this.backErrors = err.error;
    });
  }

}
