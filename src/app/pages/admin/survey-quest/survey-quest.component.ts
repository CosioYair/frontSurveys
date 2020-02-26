import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { SurveyQuestService } from 'src/app/shared/services/survey-quest.service';
import { SurveyQuest } from 'src/app/shared/model/survey-quest';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-survey-quest',
  templateUrl: './survey-quest.component.html',
  styleUrls: ['./survey-quest.component.scss']
})

export class SurveyQuestComponent implements OnInit {

  public form: FormGroup;
  public backErrors: BackError[] = [];
  public surveyQuestData: any;
  public surveyQuestList: SurveyQuest[] = [];
  public recordDeleted: boolean = false;

  constructor(private surveyQuestService: SurveyQuestService) {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.surveyQuestService.indexSurveyQuest().subscribe(surveyQuests => {
      this.surveyQuestList = surveyQuests;
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }
  
  public delete(Oid: string) {
    if (confirm('Estas seguro de borrar el registro?')) {
      this.recordDeleted = false;
      this.surveyQuestService.removeSurveyQuest(Oid).pipe(
        take(1)
      ).subscribe(() => {
        this.getData();
        this.recordDeleted = true;
        this.backErrors = [];
      }, (err) => {
        this.recordDeleted = false;
        this.backErrors = err.error;
      });
    }
  }
}
