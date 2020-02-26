import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from 'src/app/shared/model/employee';
import { User } from 'src/app/shared/model/user';
import { Subscription, Observable, of } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { take, startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { FormControl } from '@angular/forms';
import { TableService } from 'src/app/shared/services/table.service';
import { TableColumn } from 'src/app/shared/model/table-column';
import { BackError } from 'src/app/shared/model/backError';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  public backErrors: BackError[] = [];
  public employees$: Observable<Employee[]>;
  public filter = new FormControl('');
  private _user: User = {} as User;
  private _subscriptions: Subscription[] = [];
  public recordDeleted: boolean = false;
  public displayedColumns: TableColumn[] = [{
    key: 'fullName',
    title: 'Nombre'
  }, {
    key: 'position',
    title: 'Puesto'
  }];
  public records: any[] = [];
  public page: number = 1;
  public pageSize: number = 30;
  public total: number = 0;
  public dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);
  public selection = new SelectionModel<Employee>(true, []);

  constructor(public userService: UserService,
    public companyService: CompanyService,
    public employeeService: EmployeeService,
    public tableService: TableService
  ) {
  }

  ngOnInit() {
    this._subscriptions.push(
      this.userService.getUser.subscribe(user => {
        this._user = user;
        this.getEmployees(user.companyOid);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getEmployees(oid: string) {
    this.companyService.getEmployees(oid).pipe(
      take(1)
    ).subscribe(employees => {
      this.dataSource = new MatTableDataSource<Employee>(employees);
      this.employees$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => {
          this.records = this.tableService.search(employees, text, this.displayedColumns);
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
      this.employeeService.delete(oid).pipe(
        take(1)
      ).subscribe(() => {
        this.getEmployees(this._user.companyOid);
        this.recordDeleted = true;
        this.backErrors = [];
      }, (err) => {
        this.recordDeleted = false;
        this.backErrors = err.error;
      });
    }
  }

  public pagination(event) {
    this.employees$ = of(this.tableService.pagination(this.records, this.page, this.pageSize));
  }

}
