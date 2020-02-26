import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Domain } from '../../domain';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-domain',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() domain: Domain = {} as Domain;
  @Output() domainUpdated = new EventEmitter<any>();

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
    this.form.patchValue(this.domain);
    this.form.valueChanges.subscribe(value => {
      this.domainUpdated.emit({
        value,
        validForm: this.form.valid
      });
    });
  }

}
