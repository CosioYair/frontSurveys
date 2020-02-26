import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  constructor() {}
  evaluation = {
    name: 'Ambiente laboral 360',
    user: 'Alan Pérez',
    description:
      'Esta evaluación es para evaluar el ambiente laboral de la empresa, recuerda que las evaluaciones ' +
      'son completamente anónimas, queremos mejorar el ambiente laboral para ti y tus colaboradores.',
    progress: 0
  };
  ngOnInit() {}
}
