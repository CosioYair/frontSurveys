import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dimension } from '../../dimension';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dimension',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() dimension: Dimension = {} as Dimension;
  @Output() dimensionUpdated = new EventEmitter<any>();

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
    this.form.patchValue(this.dimension);
    this.form.valueChanges.subscribe(value => {
      this.dimensionUpdated.emit({
        value,
        validForm: this.form.valid
      });
    });
  }

}
