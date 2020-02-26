import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface surveySchema {
  Pregunta: string;
  Siempre: number;
  CasiSiempre: number;
  AlgunasVeces: number;
  CasiNunca: number;
  Nunca: number;
}

const ELEMENT_DATA: surveySchema[] = [
  {
    Pregunta: '1er cuestionario 2019',
    Siempre: 0,
    CasiSiempre: 1,
    AlgunasVeces: 2,
    CasiNunca: 3,
    Nunca: 4
  },
  {
    Pregunta: '2do cuestionario 2019',
    Siempre: 0,
    CasiSiempre: 1,
    AlgunasVeces: 2,
    CasiNunca: 3,
    Nunca: 4
  },
  {
    Pregunta: 'Cuestionario ambiente laboral',
    Siempre: 0,
    CasiSiempre: 1,
    AlgunasVeces: 2,
    CasiNunca: 3,
    Nunca: 4
  }
];

@Component({
  selector: 'app-survey-employee',
  templateUrl: './survey-employee.component.html',
  styleUrls: ['./survey-employee.component.scss']
})
export class SurveyEmployeeComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  headerSurvey: string[] = [
    'Pregunta',
    'Siempre',
    'CasiSiempre',
    'AlgunasVeces',
    'CasiNunca',
    'Nunca'
  ];
  dataSource = ELEMENT_DATA;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
