import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { SurveyQuest } from 'src/app/shared/model/survey-quest';
import { ActivatedRoute } from '@angular/router';
import { SurveyQuestService } from 'src/app/shared/services/survey-quest.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  public form: FormGroup;
  public backErrors: BackError[] = [];
  public _itemOid: string;
  public itemUpdated: boolean = false;
 
  private surveyQuest: SurveyQuest = {} as SurveyQuest;

  constructor(private surveyQuestService: SurveyQuestService,
    private route: ActivatedRoute) {
      this.setDefaultForm();

  }


  ngOnInit() {
    this._itemOid = this.route.snapshot.paramMap.get('Oid');
    this.getSurveyQuest();
  }

  setDefaultForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
     
    });
  }

  
  public getSurveyQuest() {
    this.surveyQuestService.getSurveyQuest(this._itemOid).pipe(
      take(1)
    ).subscribe(employee => {
      this.form.patchValue(employee);
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  public update() {
    const surveyQuest = this.form.getRawValue();
    
    this.surveyQuestService.putSurveyQuest(this._itemOid, surveyQuest).pipe(
      take(1)
    ).subscribe(() => {
      this.itemUpdated = true;
      this.backErrors = [];
    }, (err) => {
      this.itemUpdated = false;
      this.backErrors = err.error;
    });
  }

 
  

}
