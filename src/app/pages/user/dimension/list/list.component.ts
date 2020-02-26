import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dimension } from '../dimension';
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
import { DimensionService } from '../dimension.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public backErrors: BackError[] = [];
  public dimensions$: Observable<Dimension[]>;
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
  public dataSource: MatTableDataSource<Dimension> = new MatTableDataSource<Dimension>([]);
  public selection = new SelectionModel<Dimension>(true, []);

  constructor(private _userService: UserService,
    private _companyService: CompanyService,
    private _dimensionService: DimensionService,
    private _tableService: TableService
  ) {
  }

  ngOnInit() {
    this._subscriptions.push(
      this._userService.getUser.subscribe(user => {
        this._user = user;
        this.getDimensions(user.companyOid);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getDimensions(oid: string) {
    this._companyService.getDimensions(oid).subscribe(dimensions => {
      dimensions = dimensions.filter(dimension => !!dimension.companyOid);
      this.dataSource = new MatTableDataSource<Dimension>(dimensions);
      this.dimensions$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => {
          this.records = this._tableService.search(dimensions, text, this.displayedColumns);
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
      this._dimensionService.delete(oid).pipe(
        take(1)
      ).subscribe(() => {
        this.getDimensions(this._user.companyOid);
        this.recordDeleted = true;
        this.backErrors = [];
      }, (err) => {
        this.recordDeleted = false;
        this.backErrors = err.error;
      });
    }
  }

  public pagination(event) {
    this.dimensions$ = of(this._tableService.pagination(this.records, this.page, this.pageSize));
  }

}
