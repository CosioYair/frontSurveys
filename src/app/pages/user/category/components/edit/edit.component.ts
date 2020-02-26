import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../category';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() category: Category = {} as Category;
  @Output() categoryUpdated = new EventEmitter<any>();

  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required,
      ]),
    });
    this.form.patchValue(this.category);
    this.form.valueChanges.subscribe(value => {
      this.categoryUpdated.emit({
        value,
        validForm: this.form.valid
      });
    });
  }

}
