import { Component, OnInit } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { Question } from '../question';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public question: Question;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public questionUpdatedFlag: boolean = false;

  constructor(private _questionService: QuestionService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getQuestion(this._route.snapshot.paramMap.get('Oid'));
  }

  public getQuestion(questionOid: string) {
    this._questionService.show(questionOid).subscribe(question => {
      this.question = question;
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  questionUpdated(event) {
    this.question = { ...this.question, ...event.value };
    this.validForm = event.validForm;
  }

  update() {
    this._questionService.update(this.question.Oid, this.question).subscribe(() => {
      this.questionUpdatedFlag = true;
      this.backErrors = [];
    }, (err) => {
      this.questionUpdatedFlag = false;
      this.backErrors = err.error;
    });
  }

}
