import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../category';
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
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public backErrors: BackError[] = [];
  public categories$: Observable<Category[]>;
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
  public dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>([]);
  public selection = new SelectionModel<Category>(true, []);

  constructor(private _userService: UserService,
    private _companyService: CompanyService,
    private _categoryService: CategoryService,
    private _tableService: TableService
  ) {
  }

  ngOnInit() {
    this._subscriptions.push(
      this._userService.getUser.subscribe(user => {
        this._user = user;
        this.getCategories(user.companyOid);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getCategories(oid: string) {
    this._companyService.getCategories(oid).subscribe(categories => {
      categories = categories.filter(category => !!category.companyOid);
      this.dataSource = new MatTableDataSource<Category>(categories);
      this.categories$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => {
          this.records = this._tableService.search(categories, text, this.displayedColumns);
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
      this._categoryService.delete(oid).pipe(
        take(1)
      ).subscribe(() => {
        this.getCategories(this._user.companyOid);
        this.recordDeleted = true;
        this.backErrors = [];
      }, (err) => {
        this.recordDeleted = false;
        this.backErrors = err.error;
      });
    }
  }

  public pagination(event) {
    this.categories$ = of(this._tableService.pagination(this.records, this.page, this.pageSize));
  }

}
