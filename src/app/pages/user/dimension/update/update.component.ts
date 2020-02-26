import { Component, OnInit } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { Dimension } from '../dimension';
import { ActivatedRoute } from '@angular/router';
import { DimensionService } from '../dimension.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public dimension: Dimension;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public dimensionUpdatedFlag: boolean = false;

  constructor(private _dimensionService: DimensionService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getDimension(this._route.snapshot.paramMap.get('Oid'));
  }

  public getDimension(dimensionOid: string) {
    this._dimensionService.show(dimensionOid).subscribe(dimension => {
      this.dimension = dimension;
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  dimensionUpdated(event) {
    this.dimension = { ...this.dimension, ...event.value };
    this.validForm = event.validForm;
  }

  update() {
    this._dimensionService.update(this.dimension.Oid, this.dimension).subscribe(() => {
      this.dimensionUpdatedFlag = true;
      this.backErrors = [];
    }, (err) => {
      this.dimensionUpdatedFlag = false;
      this.backErrors = err.error;
    });
  }

}
