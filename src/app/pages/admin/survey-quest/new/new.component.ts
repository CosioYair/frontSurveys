import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackError } from 'src/app/shared/model/backError';
import { SurveyQuestService } from 'src/app/shared/services/survey-quest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public form: FormGroup;
  public backErrors: BackError[] = [];
  public itemUpdated: boolean = false;
  
  constructor(private surveyQuestService: SurveyQuestService, private route: ActivatedRoute, private router: Router) {

    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
    });
  }

  ngOnInit() {

  }
  
  public post() {
    const surveyQuest = this.form.getRawValue();
    this.surveyQuestService.postSurveyQuest(surveyQuest).pipe(
      take(1)
    ).subscribe((resultado) => {
      this.itemUpdated = true;
      this.backErrors = [];
      //Redirigir al update
      this.router.navigate(['admin/surveyQuest/detail/'+ resultado["surveyQuest"]["Oid"]]);

    }, (err) => {
      this.itemUpdated = false;
      this.backErrors = err.error;
    });
  }

}
