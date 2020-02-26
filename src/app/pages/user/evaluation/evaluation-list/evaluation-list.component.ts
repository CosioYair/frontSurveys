import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  porcentaje: number;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: '1er cuestionario 2019',
    porcentaje: 0,
    date: obtenerFecha(new Date())
  },
  {
    position: 2,
    name: '2do cuestionario 2019',
    porcentaje: 80,
    date: obtenerFecha(new Date())
  },
  {
    position: 3,
    name: 'Cuestionario ambiente laboral',
    porcentaje: 30,
    date: obtenerFecha(new Date())
  }
];

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'porcentaje', 'date'];
  dataSource = ELEMENT_DATA;

  constructor(private _formBuilder: FormBuilder) {}
  usuario: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.usuario = 'alan'.toUpperCase();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}

function obtenerFecha(today: Date) {
  return (
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  );
}
