import { Component, OnInit } from '@angular/core';
import { BackError } from 'src/app/shared/model/backError';
import { Domain } from '../domain';
import { ActivatedRoute } from '@angular/router';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public domain: Domain;
  public validForm: boolean;
  public backErrors: BackError[] = [];
  public domainUpdatedFlag: boolean = false;

  constructor(private _domainService: DomainService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getDomain(this._route.snapshot.paramMap.get('Oid'));
  }

  public getDomain(domainOid: string) {
    this._domainService.show(domainOid).subscribe(domain => {
      this.domain = domain;
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  domainUpdated(event) {
    this.domain = { ...this.domain, ...event.value };
    this.validForm = event.validForm;
  }

  update() {
    this._domainService.update(this.domain.Oid, this.domain).subscribe(() => {
      this.domainUpdatedFlag = true;
      this.backErrors = [];
    }, (err) => {
      this.domainUpdatedFlag = false;
      this.backErrors = err.error;
    });
  }

}
