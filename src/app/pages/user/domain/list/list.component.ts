import { Component, OnInit, OnDestroy } from '@angular/core';
import { Domain } from '../domain';
import { BackError } from 'src/app/shared/model/backError';
import { Observable, Subscription, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { TableColumn } from 'src/app/shared/model/table-column';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from 'src/app/shared/services/user.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { TableService } from 'src/app/shared/services/table.service';
import { take, startWith, map } from 'rxjs/operators';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public backErrors: BackError[] = [];
  public domains$: Observable<Domain[]>;
  public filter = new FormControl('');
  private _user: User = {} as User;
  private _subscriptions: Subscription[] = [];
  public recordDeleted: boolean = false;
  public displayedColumns: TableColumn[] = [{
    key: 'name',
    title: 'Nombre'
  }, {
    key: 'description',
    title: 'Descripcion'
  }];
  public records: any[] = [];
  public page: number = 1;
  public pageSize: number = 30;
  public total: number = 0;
  public dataSource: MatTableDataSource<Domain> = new MatTableDataSource<Domain>([]);
  public selection = new SelectionModel<Domain>(true, []);

  constructor(private _userService: UserService,
    private _companyService: CompanyService,
    private _domainService: DomainService,
    private _tableService: TableService
  ) {
  }

  ngOnInit() {
    this._subscriptions.push(
      this._userService.getUser.subscribe(user => {
        this._user = user;
        this.getDomains(user.companyOid);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getDomains(oid: string) {
    this._companyService.getDomains(oid).subscribe(domains => {
      domains = domains.filter(domain => !!domain.companyOid);
      this.dataSource = new MatTableDataSource<Domain>(domains);
      this.domains$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => {
          this.records = this._tableService.search(domains, text, this.displayedColumns);
          this.total = this.records.length;
          return this.records.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        })
      );
      this.backErrors = [];
    }, (err) => {
      this.backErrors = err.error;
    });
  }

  public delete(oid: string) {
    if (confirm('Estas seguro de borrar el registro?')) {
      this.recordDeleted = false;
      this._domainService.delete(oid).pipe(
        take(1)
      ).subscribe(() => {
        this.getDomains(this._user.companyOid);
        this.recordDeleted = true;
        this.backErrors = [];
      }, (err) => {
        this.recordDeleted = false;
        this.backErrors = err.error;
      });
    }
  }

  public pagination(event) {
    this.domains$ = of(this._tableService.pagination(this.records, this.page, this.pageSize));
  }

}
