import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../question';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnswerTypeService } from 'src/app/shared/services/answer-type.service';
import { AnswerType } from 'src/app/shared/model/answer-type';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() question: Question = {} as Question;
  @Output() questionUpdated = new EventEmitter<any>();

  public form: FormGroup;
  public answerTypes: AnswerType[] = [];

  constructor(private _answerTypeService: AnswerTypeService) { }

  ngOnInit() {
    this.getAnswerTypes();
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      answerTypeId: new FormControl(null, [
        Validators.required,
      ]),
    });
    this.form.patchValue(this.question);
    this.form.valueChanges.subscribe(value => {
      this.questionUpdated.emit({
        value,
        validForm: this.form.valid
      });
    });
  }

  getAnswerTypes() {
    this._answerTypeService.index()
      .subscribe(answerTypes => {
        this.answerTypes = answerTypes;
      });
  }

}
