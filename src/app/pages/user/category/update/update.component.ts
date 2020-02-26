import { Component, OnInit } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public category: Category;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public categoryUpdatedFlag: boolean = false;

  constructor(private _categoryService: CategoryService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getCategory(this._route.snapshot.paramMap.get('Oid'));
  }

  public getCategory(categoryOid: string) {
    this._categoryService.show(categoryOid).subscribe(category => {
      this.category = category;
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  categoryUpdated(event) {
    this.category = { ...this.category, ...event.value };
    this.validForm = event.validForm;
  }

  update() {
    this._categoryService.update(this.category.Oid, this.category).subscribe(() => {
      this.categoryUpdatedFlag = true;
      this.backErrors = [];
    }, (err) => {
      this.categoryUpdatedFlag = false;
      this.backErrors = err.error;
    });
  }

}
